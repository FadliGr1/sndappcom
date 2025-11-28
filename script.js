/**
 * KONFIGURASI GLOBAL & DATA TOOLS
 */
const appConfig = {
  appName: "SND",
  appSuffix: "App",
  version: "3.0", // Major Update
  status: "Online",
};

// === DATA TOOLS ===
const toolsList = [
  {
    id: "abd-maker",
    name: "ABD Maker LN",
    desc: "Auto Design FTTH & Metadata",
    url: "abd-maker-ln.html",
    icon: `<path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m2 12 10-4 10 4"/>`,
  },
  {
    id: "meta-extractor",
    name: "Metadata Extractor",
    desc: "KMZ to CSV/Excel Cleaner",
    url: "estocsv.html",
    icon: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
  },
  {
    id: "univ-converter",
    name: "Universal Converter",
    desc: "KML/KMZ to GeoJSON/Excel",
    url: "converter.html",
    icon: `<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M21 12H3"/><path d="M12 3v18"/>`,
  },
  {
    id: "img-extractor",
    name: "Image Extractor",
    desc: "Get Photos from KMZ + Geotag",
    url: "extract-img.html",
    icon: `<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>`,
  },
  {
    id: "blog",
    name: "Engineering Blog",
    desc: "Updates, Tutorials & News",
    url: "blog.html",
    icon: `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`,
  },
  {
    id: "about",
    name: "About & Contact",
    desc: "Developer Info",
    url: "about.html",
    icon: `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>`,
  },
];

/**
 * UTILS: Get Active Page Name
 */
function getActivePageName() {
  const path = window.location.pathname;
  if (path.includes("abd-maker")) return "ABD Maker";
  if (path.includes("extract-img")) return "Image Extractor";
  if (path.includes("estocsv")) return "Metadata Extractor";
  if (path.includes("converter")) return "Universal Converter";
  if (path.includes("contact")) return "Contact";
  if (path.includes("about")) return "About";
  if (path.includes("blog")) return "Blog";
  return "Dashboard";
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
                    <!-- Animated Circuit Path -->
                    <path class="logo-circuit" d="M10 11C10 9.89543 10.8954 9 12 9H16C18.7614 9 21 11.2386 21 14V15.5C21 16.3284 20.3284 17 19.5 17H14.5C13.6716 17 13 17.6716 13 18.5V20C13 22.7614 15.2386 25 18 25H22C23.1046 25 24 24.1046 24 23" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
                    <!-- Pulsing Dots -->
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

        <!-- CENTER: DYNAMIC ISLAND -->
        <div class="header-center">
            <div class="dynamic-island" onclick="toggleSearchModal(true)" title="Klik untuk cari (⌘K)">
                <div class="fun-eyes">
                    <div class="eye"></div>
                    <div class="eye"></div>
                </div>
                <div class="search-trigger">
                    <span>Search...</span>
                    <kbd>⌘K</kbd>
                </div>
            </div>
        </div>

        <!-- RIGHT ACTIONS -->
        <div class="header-actions">
            <div class="status-pill">
                <span class="status-dot"></span>
                <span>v${appConfig.version}</span>
            </div>

            <button class="icon-btn" id="themeToggle" title="Switch Theme">
                <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>
            
            <!-- MORPHING MENU BUTTON -->
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

    <!-- POPUP MENU -->
    <div class="tools-popup" id="toolsPopup">
        <div class="popup-header">
            <span>Quick Access Tools</span>
            <span style="cursor:pointer" id="closePopup">&times;</span>
        </div>
        <div class="tools-grid-menu" id="toolsGridContainer"></div>
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

  // Render Tools Menu
  const gridContainer = document.getElementById("toolsGridContainer");
  const currentPath = window.location.pathname.split("/").pop();

  toolsList.forEach((tool) => {
    const isActive = window.location.pathname.includes(tool.url) ? 'style="background-color:var(--accent-bg);"' : "";
    const itemHTML = `
        <a href="${tool.url}" class="tool-item-link" ${isActive}>
            <div class="tool-icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${tool.icon}</svg>
            </div>
            <div class="tool-info">
                <div>${tool.name}</div>
                <div>${tool.desc}</div>
            </div>
        </a>
        `;
    gridContainer.insertAdjacentHTML("beforeend", itemHTML);
  });

  setupEvents();
  setupSearchLogic();
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
    body.innerHTML = `<div class="search-loading-state"><div class="spinner-search"></div><p>Sedang mencari database NASA...</p></div>`;
    timeout = setTimeout(() => {
      const funMessages = [
        "Maaf fitur ini masih di develop! 😜",
        "Hasil pencarian: ZONK 😂",
        "Coba cari 'Jodoh' 🙈",
        "Sistem lelah 😴",
        "Error 404: Logic Not Found 👻",
        "Ketik lagi dong, masih gabut nih",
        "Fiturnya lagi OTW 🚀",
        "Sabar, servernya lagi ngopi ☕",
        "Mau cari apa? Diskon? Gak ada. 💸",
        "Udah nyerah aja, mending istirahat 🛌",
      ];
      const randomMsg = funMessages[Math.floor(Math.random() * funMessages.length)];
      body.innerHTML = `<div class="search-result-empty"><div style="font-size: 3rem; margin-bottom: 10px;">👾</div><h3>Ups!</h3><p>${randomMsg}</p><button class="btn-fun" onclick="document.getElementById('searchInput').value=''; document.getElementById('searchInput').focus();">Coba Lagi</button></div>`;
    }, 1500);
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
  });
}

document.addEventListener("DOMContentLoaded", initGlobalUI);
