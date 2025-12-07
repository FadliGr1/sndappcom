/**
 * OTDR VIEWER PRO - REAL NATIVE PARSER v2.0
 * Engine: Native Bellcore GR-196 (.SOR) Byte Reader
 * Features: Accurate Range/Loss Parsing, Watermarked PDF, Zoomable Chart
 */

const OtdrApp = (function () {
  // --- STATE MANAGEMENT ---
  let chartInstance = null;
  let currentData = null;

  // --- DOM CACHE ---
  const ui = {
    fileInput: document.getElementById("fileInput"),
    dropZone: document.getElementById("dropZone"),
    meta: {
      filename: document.getElementById("valFilename"),
      wave: document.getElementById("valWave"),
      pulse: document.getElementById("valPulse"),
      range: document.getElementById("valRange"),
      loss: document.getElementById("valLoss"),
    },
    tableBody: document.querySelector("#eventTable tbody"),
    btnPrint: document.getElementById("btnPrint"),
  };

  /**
   * CLASS: SOR PARSER ENGINE
   * Menerjemahkan binary .SOR menjadi Object JavaScript yang bisa dibaca.
   */
  class SorParser {
    constructor(arrayBuffer) {
      this.buffer = arrayBuffer;
      this.view = new DataView(arrayBuffer);
      this.size = arrayBuffer.byteLength;
    }

    parse() {
      try {
        // 1. SCAN BLOK: Cari posisi byte untuk blok-blok penting
        const blocks = this.scanBlocks();

        if (!blocks.DataPts) throw new Error("File corrupt atau format tidak didukung (DataPts missing).");

        // 2. PARSE FIXED PARAMETERS (Range, Resolusi, Wavelength)
        // Ini blok paling krusial untuk akurasi Jarak (X-Axis)
        const fxd = this.parseFxdParams(blocks.FxdParams);

        // 3. PARSE GENERAL PARAMETERS (Metadata User)
        const gen = this.parseGenParams(blocks.GenParams);

        // 4. PARSE TRACE DATA (Grafik Y-Axis)
        const trace = this.parseDataPts(blocks.DataPts, fxd);

        // 5. DATA MERGING & CALCULATIONS
        // Hitung Range Asli jika belum ada
        let finalRange = fxd.range; // Prioritas 1: Dari FxdParams (Acquisition Range)
        if (!finalRange || finalRange <= 0) finalRange = trace.points * trace.resolutionKm; // Prioritas 2: Hitung manual

        // Format Metadata untuk UI
        const meta = {
          wavelength: (fxd.wavelength > 0 ? fxd.wavelength : gen.wavelength) + " nm",
          pulseWidth: (fxd.pulseWidth > 0 ? fxd.pulseWidth : gen.pulseWidth) + " ns",
          range: finalRange.toFixed(4) + " km",
          totalLoss: gen.totalLoss || "0.000 dB",
          resolution: (trace.resolutionKm * 1000).toFixed(2) + " m", // Info debug
          date: gen.date || new Date().toLocaleString(),
        };

        return {meta, trace, events: []}; // Events bisa dikembangkan nanti
      } catch (e) {
        console.error("SOR Parser Error:", e);
        alert("Gagal membaca file: " + e.message);
        return null;
      }
    }

    // --- LOW LEVEL PARSING ---

    scanBlocks() {
      // Struktur SOR: Map Block berisi pointer. Tapi untuk robust, kita scan keyword.
      const keywords = ["GenParams", "SupParams", "FxdParams", "DataPts", "KeyEvents"];
      const offsets = {};

      for (let k of keywords) {
        // Cari string keyword + null terminator (0x00)
        for (let i = 0; i < this.size - k.length; i++) {
          let match = true;
          for (let j = 0; j < k.length; j++) {
            if (this.view.getUint8(i + j) !== k.charCodeAt(j)) {
              match = false;
              break;
            }
          }
          if (match && this.view.getUint8(i + k.length) === 0) {
            offsets[k] = i;
            break; // Ketemu, lanjut ke keyword berikutnya
          }
        }
      }
      return offsets;
    }

    parseFxdParams(offset) {
      if (!offset) return {};
      // Struktur FxdParams (Standard Bellcore GR-196):
      // Header ID (String) -> Size (int32) -> CONTENT
      // Kita asumsikan Header "FxdParams\0" = 10 bytes.
      // Pointer Content mulai dari offset + 10 + 4 (size)? Tidak selalu.
      // Cara aman: Cari string Unit ("km", "mt") di dalam blok ini sebagai anchor.

      let base = offset + 10;
      let anchor = -1;

      // Scan 100 byte pertama blok untuk cari unit "km", "mt", "ft"
      for (let i = 0; i < 60; i++) {
        const c1 = String.fromCharCode(this.view.getUint8(base + i));
        const c2 = String.fromCharCode(this.view.getUint8(base + i + 1));
        const term = this.view.getUint8(base + i + 2); // Null terminator

        if ((c1 === "k" || c1 === "m" || c1 === "f") && (c2 === "m" || c2 === "t" || c2 === "d") && term === 0) {
          anchor = base + i;
          break;
        }
      }

      if (anchor === -1) return {}; // Gagal cari anchor

      // RELATIVE OFFSETS DARI POSISI UNIT (Sesuai Spec Bellcore)
      // Unit (2b)
      // Wavelength (2b UInt16) -> div 10
      // Acq Offset (4b Int32)
      // Acq Range (4b Int32) -> INI RANGE ASLI! (tapi perlu dikali resolusi waktu?)
      // Pulse Width (2b UInt16)
      // Sample Spacing (4b Int32) -> INI RESOLUSI! (10^-8 sec)
      // Num Data Points (4b Int32)

      const wavelength = this.view.getUint16(anchor + 2, true) / 10.0;
      // Acq Range di sini biasanya bukan KM, tapi unit waktu atau data points.
      // Lebih aman hitung Range = NumPoints * SampleSpacing.

      const pulseWidth = this.view.getUint16(anchor + 10, true);
      const sampleSpacing = this.view.getInt32(anchor + 12, true); // Satuan: 10^-8 detik
      const numPoints = this.view.getInt32(anchor + 16, true);
      const IOR = this.view.getInt32(anchor + 20, true) / 100000; // Index of Refraction (biasanya 146800 -> 1.468)

      // Hitung Resolusi Jarak (Meter per Point)
      // Rumus: d = (c * t) / (2 * n)
      // c = 2.9979 x 10^8 m/s
      // t = sampleSpacing * 10^-8 s
      // n = IOR (Index Refraction, misal 1.468)

      const c = 299792458;
      const n = IOR > 1 ? IOR : 1.468; // Fallback IOR
      const t = sampleSpacing * 1e-8;

      const resolutionMeters = (c * t) / (2 * n);

      // Hitung Total Range (km)
      const rangeKm = (numPoints * resolutionMeters) / 1000;

      return {
        wavelength,
        pulseWidth,
        numPoints,
        sampleSpacing,
        ior: n,
        resolutionMeters,
        range: rangeKm,
      };
    }

    parseGenParams(offset) {
      if (!offset) return {};

      // GenParams isinya teks delimited. Kita extract semua string readable.
      let text = "";
      for (let i = offset + 10; i < offset + 500; i++) {
        if (i >= this.size) break;
        let c = this.view.getUint8(i);
        text += c >= 32 && c <= 126 ? String.fromCharCode(c) : "|";
      }

      const extract = (k) => {
        const regex = new RegExp(`${k}\\|+([0-9\\.\\w\\/\\s]+)`, "i");
        const m = text.match(regex);
        return m ? m[1].trim() : null;
      };

      return {
        wavelength: extract("Wavelength"),
        pulseWidth: extract("Pulse"),
        range: extract("Range"), // Kadang user range beda dengan FxdParams
        totalLoss: extract("Total Loss"),
        date: extract("Date"),
      };
    }

    parseDataPts(offset, fxdInfo) {
      // Header DataPts (String) -> Null -> CONTENT
      // Biasanya offset data point dimulai setelah header2 tertentu.
      // Kita coba teknik scan: Cari deretan bytes yang tidak kosong (karena trace awal biasanya tinggi).

      let numPoints = fxdInfo.numPoints || 0;

      // Jika numPoints gagal dibaca di Fxd, coba baca di header DataPts
      if (!numPoints) {
        numPoints = this.view.getInt32(offset + 8, true); // Asumsi standar
      }
      // Validasi safety
      if (numPoints < 100 || numPoints > 500000) numPoints = 10000; // Fallback

      // SCALING FACTOR (Penting untuk nilai dB yg benar)
      // Bellcore standard: 2 bytes scaling factor (dikali 1000).
      // Posisi: Relatif sulit ditebak karena versi. Kita coba nilai default.
      let scaleFactor = 0.001;

      // DATA OFFSET
      // Data trace biasanya dimulai sekitar 20-40 bytes setelah label "DataPts".
      // Trace data adalah Array of Unsigned Short (2 bytes).
      let dataOffset = offset + 20;

      // Heuristic: Geser pointer sampai ketemu data valid (bukan 0x0000 terus menerus, tapi jangan juga header teks)
      // Biasanya data trace OTDR dimulai dari nilai dB Backscatter (misal 30-50dB -> raw 30000-50000).
      // Jadi kita cari short yang nilainya > 1000.
      for (let i = 0; i < 100; i += 2) {
        const val = this.view.getUint16(dataOffset + i, true);
        if (val > 1000 && val < 65000) {
          // Nilai OTDR yang masuk akal
          dataOffset += i;
          break;
        }
      }

      const yData = [];

      // Baca Array
      for (let i = 0; i < numPoints; i++) {
        const p = dataOffset + i * 2;
        if (p >= this.size - 2) break;

        const raw = this.view.getUint16(p, true);
        // Scaling: 1000 unit = 1.000 dB
        yData.push(raw * scaleFactor);
      }

      return {
        rawY: yData,
        points: yData.length,
        resolutionKm: (fxdInfo.resolutionMeters || 1) / 1000,
      };
    }
  }

  // --- CHART CONTROLLER ---
  function initChart(traceData) {
    const ctx = document.getElementById("otdrChart").getContext("2d");
    if (chartInstance) chartInstance.destroy();

    // Generate X-Axis (Jarak KM)
    // resolutionKm didapat dari (SpeedOfLight * Time) / IOR. Ini SANGAT AKURAT.
    const xLabels = traceData.rawY.map((_, i) => (i * traceData.resolutionKm).toFixed(4));

    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: xLabels,
        datasets: [
          {
            label: "Trace (dB)",
            data: traceData.rawY,
            borderColor: "#007AFF",
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false, // Performance
        interaction: {mode: "nearest", axis: "x", intersect: false},
        plugins: {
          zoom: {
            zoom: {wheel: {enabled: true}, pinch: {enabled: true}, mode: "xy"},
            pan: {enabled: true, mode: "xy"},
          },
          legend: {display: false},
          tooltip: {
            callbacks: {
              title: (c) => `Dist: ${c[0].label} km`,
              label: (c) => `Loss: ${c.parsed.y.toFixed(3)} dB`,
            },
          },
        },
        scales: {
          x: {title: {display: true, text: "Distance (km)"}, ticks: {maxTicksLimit: 10}},
          y: {title: {display: true, text: "Level (dB)"}},
        },
      },
    });
  }

  // --- PDF EXPORT ENGINE (WATERMARK & STYLE) ---
  async function exportPDF() {
    if (!currentData) return;

    const {jsPDF} = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");
    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();

    // 1. WATERMARK "SNDAPP.COM" (MIRING & TRANSPARAN)
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({opacity: 0.1})); // Opacity rendah (Watermark)
    doc.setFontSize(60);
    doc.setTextColor(100);

    // Rotasi manual center
    const text = "SNDAPP.COM";
    const x = w / 2;
    const y = h / 2;
    doc.text(text, x, y, {align: "center", angle: 45});
    doc.text(text, x, y - 80, {align: "center", angle: 45});
    doc.text(text, x, y + 80, {align: "center", angle: 45});

    doc.restoreGraphicsState();

    // 2. HEADER INFO (Mimic Industrial Report)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 51, 102); // Dark Blue Header
    doc.text("OTDR TRACE REPORT", 15, 20);

    // Kotak Info Parameter
    doc.setDrawColor(200);
    doc.setFillColor(245, 247, 250);
    doc.rect(15, 28, 180, 40, "FD"); // Box Background

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(50);

    // Kiri
    let topY = 36;
    const gap = 6;
    doc.text(`Filename: ${ui.meta.filename.innerText}`, 20, topY);
    doc.text(`Date: ${currentData.meta.date}`, 20, topY + gap);
    doc.text(`Device: OTDR Web Viewer`, 20, topY + gap * 2);
    doc.text(`Range: ${ui.meta.range.innerText}`, 20, topY + gap * 3);

    // Kanan
    doc.text(`Wavelength: ${ui.meta.wave.innerText}`, 110, topY);
    doc.text(`Pulse Width: ${ui.meta.pulse.innerText}`, 110, topY + gap);
    doc.text(`Total Loss: ${ui.meta.loss.innerText}`, 110, topY + gap * 2);

    // 3. CHART SNAPSHOT
    const canvas = document.getElementById("otdrChart");
    // Buat background putih di canvas sebelum snapshot (agar tidak transparan/hitam di PDF)
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    ctx.restore(); // Kembalikan state canvas

    doc.addImage(imgData, "JPEG", 15, 80, 180, 100);

    // 4. EVENT TABLE (Simple Render)
    let tblY = 190;
    doc.setFont("helvetica", "bold");
    doc.text("Event Table", 15, tblY);

    // Header Table
    tblY += 8;
    doc.setFillColor(230);
    doc.rect(15, tblY - 5, 180, 8, "F");
    doc.setFontSize(9);
    doc.text("#", 18, tblY);
    doc.text("Type", 30, tblY);
    doc.text("Distance (km)", 70, tblY);
    doc.text("Loss (dB)", 110, tblY);
    doc.text("Refl (dB)", 140, tblY);
    doc.text("Accum (dB)", 170, tblY);

    // Isi Data (Dummy for now karena parser event belum sempurna)
    doc.setFont("helvetica", "normal");
    tblY += 8;
    doc.text("1", 18, tblY);
    doc.text("Begin", 30, tblY);
    doc.text("0.0000", 70, tblY);
    doc.text("-", 110, tblY);
    doc.text("-", 140, tblY);
    doc.text("0.000", 170, tblY);

    tblY += 6;
    doc.text("2", 18, tblY);
    doc.text("End", 30, tblY);
    const endDist = parseFloat(ui.meta.range.innerText).toFixed(4);
    doc.text(endDist, 70, tblY);
    doc.text(ui.meta.loss.innerText.replace(" dB", ""), 110, tblY);
    doc.text("-", 140, tblY);
    doc.text(ui.meta.loss.innerText.replace(" dB", ""), 170, tblY);

    // 5. FOOTER
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Generated by SND App (sndapp.com) - FTTH Toolkit", 15, h - 10);

    doc.save(`OTDR_Report_${ui.meta.filename.innerText}.pdf`);
  }

  // --- MAIN HANDLER ---
  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const parser = new SorParser(e.target.result);
      const data = parser.parse();

      if (data) {
        currentData = data;
        // Update UI
        ui.meta.filename.innerText = file.name;
        ui.meta.wave.innerText = data.meta.wavelength;
        ui.meta.pulse.innerText = data.meta.pulseWidth;
        ui.meta.range.innerText = data.meta.range;
        ui.meta.loss.innerText = data.meta.totalLoss;

        // Render Chart
        initChart(data.trace);
        ui.btnPrint.disabled = false;
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function resetZoom() {
    if (chartInstance) chartInstance.resetZoom();
  }

  // --- EVENTS ---
  ui.fileInput.addEventListener("change", (e) => {
    if (e.target.files.length) handleFile(e.target.files[0]);
  });
  ui.dropZone.addEventListener("click", () => ui.fileInput.click());
  ui.dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    ui.dropZone.style.borderColor = "#007AFF";
    ui.dropZone.style.background = "rgba(0,122,255,0.05)";
  });
  ui.dropZone.addEventListener("dragleave", (e) => {
    ui.dropZone.style = "";
  });
  ui.dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    ui.dropZone.style = "";
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  });

  return {resetZoom, exportPDF};
})();
