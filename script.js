/**
 * KONFIGURASI GLOBAL & DATA TOOLS
 */
const appConfig = {
  appName: "SND",
  appSuffix: "App",
  version: "3.4", // Versi terbaru dengan KMZ Renamer
  status: "Online",
};

// === DATA TOOLS ===
// Urutan: Tools Utama (Berwarna) -> Lainnya (Netral)
const toolsList = [
  {
    id: "otdr-maker",
    name: "OTDR Report Maker",
    desc: "Generate PDF Report Manual",
    url: "otdr-maker.html",
    icon: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>`,
    bg: "#007aff", // Blue
    enabled: true,
  },
  {
    id: "kmz-renamer",
    name: "KMZ Renamer Pro",
    desc: "Rename Placemark & Cleaning",
    url: "kmz-renamer.html",
    icon: `<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>`,
    bg: "#FF3B30", // Red - New Tool
    enabled: true,
  },
  {
    id: "abd-maker",
    name: "ABD Maker LN",
    desc: "Auto Design FTTH & Metadata",
    url: "abd-maker-ln.html",
    icon: `<path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m2 12 10-4 10 4"/>`,
    bg: "#34c759", // Green
    enabled: true,
  },
  {
    id: "meta-extractor",
    name: "Metadata Extractor",
    desc: "KMZ to CSV/Excel Cleaner",
    url: "estocsv.html",
    icon: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
    bg: "#ff9500", // Orange
    enabled: true,
  },
  {
    id: "univ-converter",
    name: "Universal Converter",
    desc: "KML/KMZ to GeoJSON/Excel",
    url: "converter.html",
    icon: `<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M21 12H3"/><path d="M12 3v18"/>`,
    bg: "#af52de", // Purple
    enabled: true,
  },
  {
    id: "img-extractor",
    name: "Image Extractor",
    desc: "Get Photos from KMZ + Geotag",
    url: "extract-img.html",
    icon: `<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>`,
    bg: "#ff2d55", // Pink
    enabled: true,
  },
  {
    id: "globe",
    name: "3D Globe Pro",
    desc: "Earth Viewer (Coming Soon)",
    url: "#", // Disable link
    icon: `<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
    bg: "#5856d6", // Indigo
    enabled: false, // Disabled flag
  },
  // --- Kategori Info (Netral) ---
  {
    id: "blog",
    name: "Engineering Blog",
    desc: "Updates, Tutorials & News",
    url: "blog.html",
    icon: `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`,
    enabled: true,
    // No bg
  },
  {
    id: "about",
    name: "About & Contact",
    desc: "Developer Info",
    url: "about.html",
    icon: `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>`,
    enabled: true,
    // No bg
  },
];

// === DOKUMENTASI DATA (Contextual Help) ===
const docsData = {
  default: {
    title: "Pusat Bantuan SND App",
    content: `
            <p>Selamat datang di <strong>SND App</strong>, toolkit all-in-one untuk engineer FTTH.</p>
            <p>Pilih tools dari menu untuk melihat panduan spesifik.</p>
        `,
  },
  "otdr-maker": {
    title: "Panduan OTDR Report Maker",
    content: `
            <p>Tools ini digunakan untuk membuat laporan PDF OTDR secara manual tanpa software vendor.</p>
            <ol>
                <li>Masukkan <strong>Master Key</strong> (sndapp.com) untuk mendapatkan akses harian.</li>
                <li>Isi parameter kabel dan informasi perangkat.</li>
                <li>Klik <strong>Generate PDF</strong> untuk mengunduh laporan resmi.</li>
            </ol>
        `,
  },
  "kmz-renamer": {
    title: "Panduan KMZ Renamer Pro",
    content: `
            <p>Tool untuk mengubah nama Placemark secara massal dan membersihkan deskripsi.</p>
            <ul>
                <li><strong>Pola Nama:</strong> Format nama baru. Gunakan kata kunci seperti "Tiang" atau "FAT". Sistem akan menambahkan nomor urut otomatis (Tiang-1, Tiang-2).</li>
                <li><strong>Start Number:</strong> Angka awal untuk penomoran.</li>
                <li><strong>Output Clean:</strong> Mode ini akan <strong>menghapus total</strong> isi deskripsi (termasuk foto) sehingga file menjadi sangat ringan dan bersih.</li>
            </ul>
        `,
  },
  "abd-maker": {
    title: "Panduan ABD Maker LN",
    content: `
            <ol>
                <li>Siapkan file <strong>.KMZ</strong> yang berisi folder POLE, FDT, FAT, dan HOME.</li>
                <li>Isi form parameter desain (Cluster, District, dll).</li>
                <li>Upload file KMZ.</li>
                <li>Klik <strong>Mulai Proses</strong>. Sistem akan otomatis melakukan snapping dan metadata injection.</li>
            </ol>
        `,
  },
  "extract-img": {
    title: "Panduan Image Extractor",
    content: `
            <p>Mengambil foto dari dalam file KMZ dan menyimpannya sebagai JPG dengan Geotag.</p>
            <ol>
                <li>Upload file KMZ hasil survey.</li>
                <li>Tunggu proses ekstraksi foto.</li>
                <li>Download file ZIP hasilnya.</li>
            </ol>
        `,
  },
  estocsv: {
    title: "Panduan Metadata Extractor",
    content: `
            <p>Mengekstrak data ExtendedData KML menjadi tabel Excel/CSV.</p>
            <ol>
                <li>Upload file KMZ/KML.</li>
                <li>(Opsional) Upload template Excel.</li>
                <li>Klik <strong>Ekstrak Data</strong>.</li>
            </ol>
        `,
  },
  converter: {
    title: "Panduan Universal Converter",
    content: `
            <p>Konversi antar format geospasial.</p>
            <ul>
                <li><strong>Input:</strong> KML, KMZ.</li>
                <li><strong>Output:</strong> Excel (XLSX), CSV, GeoJSON.</li>
            </ul>
        `,
  },
};

/**
 * UTILS: Get Active Page Name & Key
 */
function getActivePageKey() {
  const path = window.location.pathname;
  if (path.includes("otdr")) return "otdr-maker";
  if (path.includes("kmz-renamer")) return "kmz-renamer"; // Added
  if (path.includes("abd-maker")) return "abd-maker";
  if (path.includes("extract-img")) return "extract-img";
  if (path.includes("estocsv")) return "estocsv";
  if (path.includes("converter")) return "converter";
  if (path.includes("globe")) return "globe";
  return "default";
}

function getActivePageName() {
  const key = getActivePageKey();
  const tool = toolsList.find((t) => t.id === key);
  return tool ? tool.name : "Dashboard";
}

/**
 * FUNGSI RENDER HEADER GLOBAL
 */
function initGlobalUI() {
  // 1. Init Theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.dataset.theme = savedTheme;

  const activePage = getActivePageName();

  // 2. Inject Header HTML
  const headerHTML = `
    <header class="app-header">
        <div class="header-left">
            <a href="index.html" class="logo">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="34" rx="10" fill="url(#logoGradient)"/>
                    <path class="logo-circuit" d="M10 11C10 9.89543 10.8954 9 12 9H16C18.7614 9 21 11.2386 21 14V15.5C21 16.3284 20.3284 17 19.5 17H14.5C13.6716 17 13 17.6716 13 18.5V20C13 22.7614 15.2386 25 18 25H22C23.1046 25 24 24.1046 24 23" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
                    <circle class="logo-dot" cx="10" cy="11" r="2" fill="white"/>
                    <circle class="logo-dot" cx="24" cy="23" r="2" fill="white"/>
                    <defs>
                        <linearGradient id="logoGradient" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#007AFF"/>
                            <stop offset="1" stop-color="#5856D6"/>
                        </linearGradient>
                    </defs>
                </svg>
                <div class="logo-text">
                    ${appConfig.appName}<span>${appConfig.appSuffix}</span>
                </div>
            </a>
        </div>

        <div class="header-center">
            <div class="dynamic-island" onclick="toggleSearchModal(true)" title="Klik untuk cari (⌘K)">
                <div class="fun-eyes">
                    <div class="eye"></div>
                    <div class="eye"></div>
                </div>
                <div class="search-trigger">
                    <span>${activePage}</span>
                    <kbd>⌘K</kbd>
                </div>
            </div>
        </div>

        <div class="header-actions">
            <!-- DOCS BUTTON -->
            <button class="icon-btn" id="docsBtn" title="Bantuan & Dokumentasi" onclick="openDocsModal()">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            </button>

            <button class="icon-btn" id="themeToggle" title="Switch Theme">
                <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>
            
            <button class="icon-btn tool-menu-btn" id="toolsMenuBtn" title="All Tools">
                <div class="icon-state icon-grid">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                </div>
                <div class="icon-state icon-close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
            </button>
        </div>
    </header>

    <!-- MEGA MENU POPUP -->
    <div class="tools-popup mega-menu" id="toolsPopup">
        <div class="popup-header">
            <span>Quick Access</span>
            <span style="cursor:pointer" id="closePopup">&times;</span>
        </div>
        
        <!-- Tools Grid -->
        <div class="mega-section-label">Tools Utama</div>
        <div class="tools-grid-menu" id="toolsGridContainer"></div>
        
        <!-- Info Grid -->
        <div class="mega-section-label" style="margin-top:1rem;">Informasi</div>
        <div class="tools-grid-menu" id="infoGridContainer"></div>
    </div>

    <!-- DOCUMENTATION MODAL -->
    <div class="docs-modal-overlay" id="docsOverlay">
        <div class="docs-modal">
            <div class="docs-header">
                <h3 id="docsTitle">Bantuan</h3>
                <button class="close-docs" onclick="closeDocsModal()">&times;</button>
            </div>
            <div class="docs-body" id="docsContent"></div>
        </div>
    </div>

    <!-- SPOTLIGHT SEARCH -->
    <div class="search-modal-overlay" id="searchOverlay">
        <div class="search-modal">
            <div class="search-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted)"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" id="searchInput" placeholder="Mau cari fitur apa hari ini?" autocomplete="off">
                <button class="esc-badge" onclick="toggleSearchModal(false)">ESC</button>
            </div>
            <div class="search-body" id="searchBody">
                <div class="search-placeholder"><p>Ketik sesuatu untuk mulai mencari...</p></div>
            </div>
        </div>
    </div>
    
    <div class="watermark">by FadliGr</div>
    `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  // Render Tools Menu (Mega Menu Grid)
  const toolsContainer = document.getElementById("toolsGridContainer");
  const infoContainer = document.getElementById("infoGridContainer");

  // Apply Grid Styles
  const gridStyle = "display:grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap:10px;";
  toolsContainer.style.cssText = gridStyle;
  infoContainer.style.cssText = gridStyle;

  toolsList.forEach((tool, index) => {
    const isActive = window.location.pathname.includes(tool.url) ? "active" : "";

    // Logic: 7 Item pertama (termasuk KMZ Renamer) masuk Tools Grid (Ada BG), sisanya Info Grid (Netral)
    // Ingat index dimulai dari 0
    const isMainTool = index <= 6; // Sampai 'globe'

    const bgStyle = isMainTool && tool.enabled ? `background-color: ${tool.bg}; color: white;` : `background-color: var(--accent-bg); color: var(--text-color);`;
    const iconStyle = isMainTool && tool.enabled ? `color: white;` : `color: var(--text-color);`;

    const href = tool.enabled ? `href="${tool.url}"` : `style="opacity:0.6; cursor:not-allowed;" title="Coming Soon"`;
    const toolName = tool.enabled ? tool.name : `${tool.name}`;

    const itemHTML = `
        <a ${href} class="mega-tool-item ${isActive}">
            <div class="mega-tool-icon" style="${bgStyle}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="${iconStyle}">${tool.icon}</svg>
            </div>
            <div class="mega-tool-text">
                <span class="mega-tool-name">${toolName}</span>
                <span class="mega-tool-desc">${tool.desc.substring(0, 18)}...</span>
            </div>
        </a>
    `;

    if (isMainTool) {
      toolsContainer.insertAdjacentHTML("beforeend", itemHTML);
    } else {
      infoContainer.insertAdjacentHTML("beforeend", itemHTML);
    }
  });

  // Inject CSS Styles for Mega Menu
  const style = document.createElement("style");
  style.innerHTML = `
    .tools-popup.mega-menu {
        width: 600px;
        max-width: 90vw;
        left: 50%;
        transform: translateX(-50%) translateY(-10px) scale(0.95);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        max-height: 80vh;
        overflow-y: auto;
        border-radius: 24px;
    }
    
    .tools-popup.mega-menu.show {
        transform: translateX(-50%) translateY(0) scale(1);
    }

    .mega-section-label {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--text-muted);
        margin-bottom: 12px;
        letter-spacing: 0.5px;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 4px;
    }

    .mega-tool-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        text-decoration: none;
        padding: 12px;
        border-radius: 16px;
        transition: transform 0.2s, background-color 0.2s;
        border: 1px solid transparent;
    }
    
    .mega-tool-item:hover {
        background-color: rgba(0,0,0,0.03);
        transform: translateY(-3px);
        border-color: var(--border-color);
    }
    
    .mega-tool-item.active {
        background-color: rgba(0, 122, 255, 0.08);
        border: 1px solid rgba(0, 122, 255, 0.2);
    }

    .mega-tool-icon {
        width: 52px;
        height: 52px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.08);
        transition: transform 0.2s;
    }
    
    .mega-tool-item:hover .mega-tool-icon {
        transform: scale(1.1);
    }

    .mega-tool-name {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text-color);
        line-height: 1.2;
        margin-bottom: 2px;
    }
    
    .mega-tool-desc {
        font-size: 0.7rem;
        color: var(--text-muted);
    }
    
    @media (max-width: 650px) {
        .tools-popup.mega-menu {
            width: 95vw;
            top: 80px;
        }
        #toolsGridContainer, #infoGridContainer {
            grid-template-columns: repeat(2, 1fr) !important;
        }
    }
  `;
  document.head.appendChild(style);

  setupEvents();
  setupSearchLogic();
}

// DOCS LOGIC
function openDocsModal() {
  const key = getActivePageKey();
  const data = docsData[key] || docsData["default"];

  document.getElementById("docsTitle").innerText = data.title;
  document.getElementById("docsContent").innerHTML = data.content;

  const modal = document.getElementById("docsOverlay");
  modal.classList.add("show");
}

function closeDocsModal() {
  const modal = document.getElementById("docsOverlay");
  modal.classList.remove("show");
}

// SEARCH LOGIC
function setupSearchLogic() {
  const input = document.getElementById("searchInput");
  const body = document.getElementById("searchBody");
  let timeout = null;

  input.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    clearTimeout(timeout);
    if (val.length === 0) {
      body.innerHTML = `<div class="search-placeholder"><p>Ketik sesuatu untuk mulai mencari...</p></div>`;
      return;
    }
    body.innerHTML = `<div class="search-loading-state"><div class="spinner-search"></div><p>Sedang mencari...</p></div>`;
    timeout = setTimeout(() => {
      body.innerHTML = `<div class="search-result-empty"><div style="font-size: 2rem; margin-bottom:10px;">🔍</div><p>Hasil pencarian belum tersedia di versi demo.</p></div>`;
    }, 1000);
  });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      toggleSearchModal(true);
    }
    if (e.key === "Escape") {
      toggleSearchModal(false);
    }
  });
}

function toggleSearchModal(show) {
  const modal = document.getElementById("searchOverlay");
  const input = document.getElementById("searchInput");
  if (show) {
    modal.classList.add("show");
    setTimeout(() => input.focus(), 100);
  } else {
    modal.classList.remove("show");
    input.value = "";
  }
}

function setupEvents() {
  const themeBtn = document.getElementById("themeToggle");
  const toolsBtn = document.getElementById("toolsMenuBtn");
  const popup = document.getElementById("toolsPopup");
  const closePopup = document.getElementById("closePopup");

  // Toggle Theme
  themeBtn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  });

  // Toggle Menu
  const toggleMenu = (e) => {
    e.stopPropagation();
    popup.classList.toggle("show");
    toolsBtn.classList.toggle("active");
  };

  toolsBtn.addEventListener("click", toggleMenu);
  closePopup.addEventListener("click", () => {
    popup.classList.remove("show");
    toolsBtn.classList.remove("active");
  });

  // Click Outside
  document.addEventListener("click", (e) => {
    if (!popup.contains(e.target) && !toolsBtn.contains(e.target)) {
      popup.classList.remove("show");
      toolsBtn.classList.remove("active");
    }
    if (e.target === document.getElementById("searchOverlay")) toggleSearchModal(false);
    if (e.target === document.getElementById("docsOverlay")) closeDocsModal();
  });
}

document.addEventListener("DOMContentLoaded", initGlobalUI);
