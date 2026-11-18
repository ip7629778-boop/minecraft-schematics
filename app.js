/**
 * MineVault - Minecraft Schematics & Multi-Screenshot Showcase Application Logic
 * Featuring interactive screenshot gallery carousel, 3D tactile button feedback,
 * one-click command copier, dynamic rolling stats, like system, and audio FX.
 */

// Fallback embedded dataset for local file:// execution
const DEFAULT_SCHEMATICS = [
  {
    "id": "cozy-survival-starter-house",
    "title": "Cozy Survival Starter House",
    "subtitle": "Tier 1 Starter Cottage with 4 Living Alcoves & 2-Wide L-Shaped Corner Stairs",
    "author": "MineVault Studio",
    "category": "Survival Bases",
    "version": "1.20 - 1.21+",
    "image": "assets/images/builds/build1/exterior_front.png",
    "screenshots": [
      {
        "url": "assets/images/builds/build1/exterior_front.png",
        "caption": "Exterior Gable Front with Porch, Timber Framing & Deepslate Tile Trim"
      },
      {
        "url": "assets/images/builds/build1/interior_ground.png",
        "caption": "Ground Floor Living Room with Chandelier, Hearth Fireplace & 2-Wide L-Stairs"
      },
      {
        "url": "assets/images/builds/build1/interior_loft.png",
        "caption": "Upper Loft Bedroom & Study Desk under High Exposed Timber Rafters"
      }
    ],
    "downloadsCount": 142,
    "likesCount": 89,
    "dateAdded": "2026-11-17",
    "dimensions": {
      "width": 15,
      "height": 14,
      "length": 13
    },
    "blockCount": 865,
    "tags": [
      "Survival",
      "Starter",
      "Cottage",
      "Collision-Safe",
      "Furnished",
      "Loft",
      "L-Staircase"
    ],
    "formats": [
      {
        "type": ".schem (WorldEdit / Sponge)",
        "file": "downloads/cozy_survival_starter_house.schem",
        "size": "1.8 KB"
      },
      {
        "type": ".litematic (Litematica / Fabric)",
        "file": "downloads/cozy_survival_starter_house.litematic",
        "size": "2.3 KB"
      }
    ],
    "description": "An authentic, in-game verified Tier 1 survival starter cottage. Built with 100% collision-safe clearances: flush threshold entry across the porch, double-door clearance, and an authentic community-style 2-wide L-shaped corner staircase with a 2x2 flat landing and reverse-stair undersides climbing toward the high center roof ridge for continuous 5-6 blocks of headroom. Fully equipped with 4 dedicated functional zones: Hearth & Cooking Alcove, Central Living Room, Workshop & Smithing Alcove, and a cozy Loft Bedroom with Study Desk.",
    "features": [
      "In-game verified zero-collision player headroom along all walking paths and doorways",
      "Flush foundation: Seamless entry across exterior porch, door threshold, and interior floor",
      "2-Wide L-shaped corner staircase with 2x2 turning landing, reverse-stair finished underside, and under-stair storage",
      "4 Functional Interior Zones: Cooking hearth, living room with chandelier, crafting workshop, and loft bedroom",
      "Full Survival Utility: Working double chest, campfire fireplace, water cauldron sink, smoker, bed, and bookshelf storage",
      "Authentic community aesthetic: 3-layer stone foundation gradient, stripped dark oak timber framing, and contrasting deepslate tile roof trim"
    ],
    "materials": [
      { "name": "Dark Oak Stairs", "count": 194 },
      { "name": "Spruce Planks", "count": 134 },
      { "name": "White Terracotta", "count": 87 },
      { "name": "Stripped Spruce Log", "count": 57 },
      { "name": "Stripped Dark Oak Wood", "count": 56 },
      { "name": "Stone Bricks", "count": 43 },
      { "name": "Cobblestone", "count": 38 },
      { "name": "Deepslate Tile Stairs", "count": 36 },
      { "name": "Diorite", "count": 30 },
      { "name": "Calcite", "count": 29 },
      { "name": "Polished Andesite", "count": 22 },
      { "name": "Spruce Stairs", "count": 21 },
      { "name": "Glass Pane", "count": 18 },
      { "name": "Mossy Cobblestone", "count": 14 },
      { "name": "Cracked Stone Bricks", "count": 13 }
    ]
  }
];

// App State
let schematics = [];
let currentCategory = 'all';
let currentFormat = 'all';
let currentVersion = 'all';
let currentSort = 'popular';
let searchQuery = '';
let activeSchematic = null;
let activeScreenshotIdx = 0;
let activeModalVersion = '1.21';
let activeModalLoader = 'fabric';
let soundEnabled = true;
let userLikedIds = new Set();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', async () => {
  loadLikedStatus();
  initAmbientCanvas();
  await loadSchematics();
  setupEventListeners();
  renderSchematics();
  animateHeroStats();
  initScrollReveal();
  initVaultCubeInteractive();
  initCursorGlow();
  initBrandLetterFX();
  initHeroTextFX();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/**
 * Load User Liked Status from localStorage with validation
 */
function loadLikedStatus() {
  try {
    const saved = localStorage.getItem('minevault_likes');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        userLikedIds = new Set(parsed.filter(id => typeof id === 'string'));
      }
    }
  } catch (e) {
    console.warn('Could not read localStorage', e);
  }
}

function saveLikedStatus() {
  try {
    localStorage.setItem('minevault_likes', JSON.stringify([...userLikedIds]));
  } catch (e) {}
}

/**
 * Load schematics from JSON or fallback & attach real user metrics with validation
 */
async function loadSchematics() {
  try {
    const res = await fetch('data/schematics.json');
    if (!res.ok) throw new Error('Network error loading schematics.json');
    schematics = await res.json();
  } catch (err) {
    console.warn('Could not load data/schematics.json via fetch, using embedded fallback data.', err);
    schematics = [...DEFAULT_SCHEMATICS];
  }
  loadRealMetrics();
}

function loadRealMetrics() {
  try {
    const savedDl = localStorage.getItem('minevault_downloads_count');
    if (savedDl) {
      const dlMap = JSON.parse(savedDl);
      if (dlMap && typeof dlMap === 'object' && !Array.isArray(dlMap)) {
        schematics.forEach(s => {
          if (typeof dlMap[s.id] === 'number' && !isNaN(dlMap[s.id])) s.downloadsCount = dlMap[s.id];
        });
      }
    }
    const savedLikes = localStorage.getItem('minevault_likes_count');
    if (savedLikes) {
      const likeMap = JSON.parse(savedLikes);
      if (likeMap && typeof likeMap === 'object' && !Array.isArray(likeMap)) {
        schematics.forEach(s => {
          if (typeof likeMap[s.id] === 'number' && !isNaN(likeMap[s.id])) s.likesCount = likeMap[s.id];
        });
      }
    }
  } catch (e) {}
}

function saveRealMetrics() {
  try {
    const dlMap = {};
    const likeMap = {};
    schematics.forEach(s => {
      dlMap[s.id] = s.downloadsCount || 0;
      likeMap[s.id] = s.likesCount || 0;
    });
    localStorage.setItem('minevault_downloads_count', JSON.stringify(dlMap));
    localStorage.setItem('minevault_likes_count', JSON.stringify(likeMap));
  } catch (e) {}
}

/**
 * Setup All Event Listeners
 */
function setupEventListeners() {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      playSound('click');
      mobileDrawer.classList.toggle('open');
    });
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileDrawer.classList.remove('open'));
    });
  }

  // Search input with instant filtering
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';
      }
      renderSchematics();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      playSound('click');
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      renderSchematics();
      searchInput.focus();
    });
  }

  // Category Pill Filters
  const pillsContainer = document.getElementById('category-pills');
  if (pillsContainer) {
    pillsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill-btn');
      if (!btn) return;
      playSound('click');
      pillsContainer.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderSchematics();
    });
  }

  // Version Filter
  const versionSelect = document.getElementById('version-filter');
  if (versionSelect) {
    versionSelect.addEventListener('change', (e) => {
      playSound('click');
      currentVersion = e.target.value;
      renderSchematics();
    });
  }

  // Format Filter
  const formatSelect = document.getElementById('format-filter');
  if (formatSelect) {
    formatSelect.addEventListener('change', (e) => {
      playSound('click');
      currentFormat = e.target.value;
      renderSchematics();
    });
  }

  // Sort Filter
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      playSound('click');
      currentSort = e.target.value;
      renderSchematics();
    });
  }

  // Reset Filters Button
  const resetBtn = document.getElementById('reset-filters-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      playSound('click');
      currentCategory = 'all';
      currentFormat = 'all';
      currentVersion = 'all';
      currentSort = 'popular';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      if (versionSelect) versionSelect.value = 'all';
      if (formatSelect) formatSelect.value = 'all';
      if (sortSelect) sortSelect.value = 'popular';

      if (pillsContainer) {
        pillsContainer.querySelectorAll('.pill-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.category === 'all');
        });
      }
      renderSchematics();
    });
  }

  // Modals management
  const detailModal = document.getElementById('detail-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  if (modalCloseBtn && detailModal) {
    modalCloseBtn.addEventListener('click', closeModal);
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) closeModal();
    });
  }

  // Global key bindings (Escape to close, Left/Right arrow to navigate screenshots)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      if (detailModal && detailModal.classList.contains('open')) {
        navigateGallery(-1);
      }
    } else if (e.key === 'ArrowRight') {
      if (detailModal && detailModal.classList.contains('open')) {
        navigateGallery(1);
      }
    }
  });
}

/**
 * Animate numbers counting up on page load with exact values
 */
function animateHeroStats() {
  const totalBuilds = schematics.length;
  const totalDownloads = schematics.reduce((acc, curr) => acc + (curr.downloadsCount || 0), 0);
  const totalBlocks = schematics.reduce((acc, curr) => acc + (curr.blockCount || 0), 0);
  const totalLikes = schematics.reduce((acc, curr) => acc + (curr.likesCount || 0), 0);

  const buildsElem = document.getElementById('total-builds-count');
  const dlsElem = document.getElementById('total-downloads-count');
  const blksElem = document.getElementById('total-blocks-count');
  const likesElem = document.getElementById('total-likes-count');

  if (buildsElem) countUp(buildsElem, 0, totalBuilds, 1000, '');
  if (dlsElem) countUp(dlsElem, 0, totalDownloads, 1000, '');
  if (blksElem) countUp(blksElem, 0, totalBlocks, 1400, '');
  if (likesElem) countUp(likesElem, 0, totalLikes, 1000, '');
}

/**
 * Re-usable smooth count-up helper
 */
function countUp(element, start, end, duration, suffix = '') {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * ease);
    element.innerText = current.toLocaleString() + (progress === 1 ? suffix : '');
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

/**
 * Filter, Sort, and Render Schematics Grid
 */
function renderSchematics() {
  const grid = document.getElementById('schematics-grid');
  const emptyState = document.getElementById('empty-state');
  if (!grid) return;

  // Filter
  let filtered = schematics.filter(item => {
    if (currentCategory !== 'all' && item.category !== currentCategory) return false;
    if (currentFormat !== 'all') {
      const hasFormat = item.formats.some(f => f.file.endsWith('.' + currentFormat));
      if (!hasFormat) return false;
    }
    if (currentVersion !== 'all') {
      const itemVerStr = item.version || '1.18';
      const numMatch = itemVerStr.match(/1\.\d+/);
      const itemNum = numMatch ? parseFloat(numMatch[0]) : 1.18;
      const targetNum = parseFloat(currentVersion);
      // Older builds can run on newer game versions, but newer builds (e.g. 1.21) require at least that version
      if (itemNum > targetNum) return false;
    }
    if (searchQuery) {
      const haystack = `${item.title} ${item.subtitle} ${item.description} ${item.author} ${item.tags.join(' ')} ${item.category}`.toLowerCase();
      if (!haystack.includes(searchQuery)) return false;
    }
    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    if (currentSort === 'popular') return b.downloadsCount - a.downloadsCount;
    if (currentSort === 'likes') return b.likesCount - a.likesCount;
    if (currentSort === 'newest') return new Date(b.dateAdded) - new Date(a.dateAdded);
    if (currentSort === 'blocks-desc') return b.blockCount - a.blockCount;
    if (currentSort === 'blocks-asc') return a.blockCount - b.blockCount;
    return 0;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) {
      emptyState.style.display = 'block';
      const emptyTitle = emptyState.querySelector('h3');
      const emptyDesc = emptyState.querySelector('p');
      const resetBtn = document.getElementById('reset-filters-btn');
      if (schematics.length === 0) {
        if (emptyTitle) emptyTitle.innerText = 'Vault Ready for Verified Build #1';
        if (emptyDesc) emptyDesc.innerText = 'Earlier placeholder builds have been cleared. In-game verified builds with full floor-by-floor interiors and real screenshots are being added one by one!';
        if (resetBtn) resetBtn.style.display = 'none';
      } else {
        if (emptyTitle) emptyTitle.innerText = 'No Schematics Found';
        if (emptyDesc) emptyDesc.innerText = 'Try clearing your search terms or selecting a different category filter.';
        if (resetBtn) resetBtn.style.display = 'inline-flex';
      }
    }
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  // Render cards with screenshot counter badge
  grid.innerHTML = filtered.map((item) => {
    const safeId = sanitizeId(item.id);
    const isLiked = userLikedIds.has(safeId);
    const screenshotCount = item.screenshots ? item.screenshots.length : 1;
    const safeTitle = escapeHtml(item.title);
    const safeSubtitle = escapeHtml(item.subtitle);
    const safeAuthor = escapeHtml(item.author);
    const safeCategory = escapeHtml(item.category);
    const safeVersion = escapeHtml(item.version);
    const safeImage = sanitizeSafeUrl(item.image);
    const dlCount = Number(item.downloadsCount || 0);
    const likeCount = Number(item.likesCount || 0);
    const width = Number(item.dimensions?.width || 0);
    const height = Number(item.dimensions?.height || 0);
    const length = Number(item.dimensions?.length || 0);
    const blockCount = Number(item.blockCount || 0);

    return `
      <article class="schem-card" data-id="${safeId}">
        <div class="card-media" onclick="openBuildModal('${safeId}')">
          <img src="${safeImage}" alt="${safeTitle}" loading="lazy">
          
          <div class="card-overlay-badge">
            <span class="badge badge-emerald">${safeCategory}</span>
            <span class="badge badge-diamond">${safeVersion}</span>
          </div>

          <div class="screenshot-count-badge">
            <i data-lucide="image"></i> ${screenshotCount} Angles
          </div>

          <div class="card-view-pill">
            <i data-lucide="maximize-2"></i> View Gallery
          </div>
        </div>

        <div class="card-content">
          <div class="card-header-line">
            <span class="card-author">By <strong>${safeAuthor}</strong></span>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <button class="like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${safeId}', this)" title="Like this build">
                <i data-lucide="heart"></i>
                <span class="like-count">${likeCount.toLocaleString()}</span>
              </button>
              <span class="badge badge-gold" title="${dlCount} total downloads">
                <i data-lucide="download" style="width:12px;height:12px;"></i> ${dlCount.toLocaleString()}
              </span>
            </div>
          </div>

          <h3 class="card-title">${safeTitle}</h3>
          <p class="card-subtitle">${safeSubtitle}</p>

          <div class="card-specs-strip">
            <div class="card-spec">
              <i data-lucide="gamepad-2"></i>
              <span>MC <strong>${safeVersion}</strong></span>
            </div>
            <div class="card-spec">
              <i data-lucide="box"></i>
              <span><strong>${width}×${height}×${length}</strong></span>
            </div>
            <div class="card-spec">
              <i data-lucide="layers"></i>
              <span><strong>${blockCount.toLocaleString()}</strong> blks</span>
            </div>
          </div>

          <div class="card-formats">
            ${(item.formats || []).map(fmt => `
              <span class="format-chip">${escapeHtml(fmt.type.includes('.schem') ? '.SCHEM' : (fmt.type.includes('.zip') ? '.ZIP WORLD' : '.LITEMATIC'))}</span>
            `).join('')}
          </div>

          <div class="card-loader-strip">
            <span class="card-loader-pill fabric" title="Supports Fabric with Litematica"><i data-lucide="feather"></i> Fabric</span>
            <span class="card-loader-pill paper" title="Supports Paper/Spigot with WorldEdit"><i data-lucide="server"></i> Paper</span>
            <span class="card-loader-pill forge" title="Supports Forge &amp; NeoForge"><i data-lucide="box"></i> Forge</span>
            ${(item.formats || []).some(f => f.type.includes('.zip')) ? `<span class="card-loader-pill vanilla" title="Standalone World Save"><i data-lucide="globe"></i> World</span>` : ''}
          </div>

          <div class="card-footer-actions">
            <button class="btn btn-primary btn-sm" onclick="openBuildModalWithDownload('${safeId}')" title="Choose version and loader to download">
              <i data-lucide="download"></i> Download Options
            </button>
            <button class="btn btn-secondary btn-sm" onclick="openBuildModal('${safeId}')" title="View Full Multi-Screenshots &amp; Details">
              <i data-lucide="images"></i> View Gallery
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
  initScrollReveal();
}

/**
 * Toggle Like on Card with Heart Animation & Floating Particle Hearts
 */
window.toggleLike = function(id, btn) {
  const item = schematics.find(s => s.id === id);
  if (!item) return;

  const countSpan = btn.querySelector('.like-count');
  const isLiked = userLikedIds.has(id);

  if (isLiked) {
    userLikedIds.delete(id);
    item.likesCount = Math.max(0, item.likesCount - 1);
    btn.classList.remove('liked');
    playSound('click');
  } else {
    userLikedIds.add(id);
    item.likesCount++;
    btn.classList.add('liked');
    playSound('pop');
    spawnParticleBurst(btn);
    spawnFloatingHearts(btn);
  }

  saveLikedStatus();
  saveRealMetrics();
  if (countSpan) countSpan.innerText = item.likesCount.toLocaleString();

  // Update total likes counter in hero
  const totalLikes = schematics.reduce((acc, curr) => acc + (curr.likesCount || 0), 0);
  const likesElem = document.getElementById('total-likes-count');
  if (likesElem) likesElem.innerText = totalLikes.toLocaleString();
};

/**
 * Open Detailed Build Modal with Multi-Screenshot Carousel & Command Copier
 */
window.openBuildModal = function(id) {
  playSound('click');
  const safeId = sanitizeId(id);
  const item = schematics.find(s => s.id === safeId);
  if (!item) return;

  activeSchematic = item;
  activeScreenshotIdx = 0;

  const modal = document.getElementById('detail-modal');
  const body = document.getElementById('modal-content');
  if (!modal || !body) return;

  const screenshots = (item.screenshots && item.screenshots.length)
    ? item.screenshots.map(s => ({
        url: sanitizeSafeUrl(s.url),
        tag: escapeHtml(s.tag || ''),
        caption: escapeHtml(s.caption || '')
      }))
    : [{ url: sanitizeSafeUrl(item.image), tag: "Main View", caption: escapeHtml(item.title) }];

  const safeTitle = escapeHtml(item.title);
  const safeSubtitle = escapeHtml(item.subtitle);
  const safeCategory = escapeHtml(item.category);
  const safeVersion = escapeHtml(item.version);
  const safeDifficulty = escapeHtml(item.difficulty || 'Normal');
  const safeShaders = item.shadersTag ? escapeHtml(item.shadersTag) : '';
  const cleanId = safeId.replace(/-/g, '_');
  const rawCommand = item.command || `//schem load ${cleanId}`;
  const safeCommand = escapeHtml(rawCommand);
  const safeAuthor = escapeHtml(item.author);
  const safeTexturePack = escapeHtml(item.texturePackTag || 'Default 16x');
  const safeDesc = escapeHtml(item.description);
  const dimW = Number(item.dimensions?.width || 0);
  const dimH = Number(item.dimensions?.height || 0);
  const dimL = Number(item.dimensions?.length || 0);
  const blockCount = Number(item.blockCount || 0);

  body.innerHTML = `
    <!-- Interactive Multi-Screenshot Gallery Carousel -->
    <div class="gallery-container">
      <div class="gallery-main-view" id="gallery-main-view">
        <img id="gallery-active-img" src="${screenshots[0].url}" alt="${safeTitle}">
        
        <div class="gallery-caption-overlay">
          <div>
            <span class="gallery-tag-pill" id="gallery-active-tag">${screenshots[0].tag}</span>
            <div class="gallery-caption-text" id="gallery-active-caption">${screenshots[0].caption}</div>
          </div>
          <span style="font-size: 0.8rem; color: #94a3b8; font-weight: 700;" id="gallery-active-counter">1 / ${screenshots.length}</span>
        </div>
      </div>

      ${screenshots.length > 1 ? `
        <button class="gallery-arrow-btn prev" onclick="navigateGallery(-1)" aria-label="Previous screenshot">
          <i data-lucide="chevron-left"></i>
        </button>
        <button class="gallery-arrow-btn next" onclick="navigateGallery(1)" aria-label="Next screenshot">
          <i data-lucide="chevron-right"></i>
        </button>

        <div class="gallery-thumbnail-strip" id="gallery-thumb-strip">
          ${screenshots.map((s, idx) => `
            <div class="gallery-thumb-item ${idx === 0 ? 'active' : ''}" onclick="selectScreenshot(${idx})">
              <img src="${s.url}" alt="${s.tag}">
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>

    <div class="modal-unified-content">
      <!-- Title & Badges -->
      <div class="modal-title-row">
        <div class="modal-badges">
          <span class="badge badge-emerald">${safeCategory}</span>
          <span class="badge badge-diamond">Minecraft ${safeVersion}</span>
          <span class="badge badge-gold">${safeDifficulty} Level</span>
          ${safeShaders ? `<span class="badge badge-diamond" style="background:rgba(56,189,248,0.1);"><i data-lucide="sun"></i> ${safeShaders}</span>` : ''}
        </div>
        <h2 class="modal-main-title">${safeTitle}</h2>
        <p class="modal-main-subtitle">${safeSubtitle}</p>
      </div>

      <!-- One-Click In-Game WorldEdit Command Copier -->
      <div class="command-copy-bar">
        <div class="command-copy-left">
          <span class="command-label">WorldEdit Command:</span>
          <code class="command-text" id="command-text-val">${safeCommand}</code>
        </div>
        <button class="copy-cmd-btn" id="copy-cmd-btn" data-command="${safeCommand}" onclick="copySchemCommandFromBtn(this)">
          <i data-lucide="copy"></i> Copy Command
        </button>
      </div>

      <!-- Interactive Minecraft Version & Mod Loader Selector System -->
      ${renderModalVersionSelector(item)}

      <!-- Specs Quick Bar (4 metrics) -->
      <div class="modal-specs-bar">
        <div class="spec-item">
          <span class="spec-key">Dimensions (X × Y × Z)</span>
          <span class="spec-val">${dimW} × ${dimH} × ${dimL}</span>
        </div>
        <div class="spec-item">
          <span class="spec-key">Total Blocks</span>
          <span class="spec-val">${blockCount.toLocaleString()}</span>
        </div>
        <div class="spec-item">
          <span class="spec-key">Builder / Creator</span>
          <span class="spec-val">${safeAuthor}</span>
        </div>
        <div class="spec-item">
          <span class="spec-key">Texture Pack</span>
          <span class="spec-val">${safeTexturePack}</span>
        </div>
      </div>

      <!-- Description Block -->
      <div class="modal-section-block">
        <h4>About This Build</h4>
        <p class="modal-desc-text">${safeDesc}</p>
        <div class="modal-tags">
          ${(item.tags || []).map(tag => `<span class="format-chip">#${escapeHtml(tag)}</span>`).join('')}
        </div>
      </div>

      <!-- Survival Materials Checklist -->
      <div class="modal-section-block">
        <h4>Survival Materials Required (${item.materials ? item.materials.length : 0} items)</h4>
        <div class="materials-wrapper">
          <div class="materials-search">
            <i data-lucide="search" style="width: 16px; height: 16px; color: var(--text-muted);"></i>
            <input type="text" id="mat-filter-input" placeholder="Search materials (e.g. Deepslate, Pistons)...">
          </div>

          <table class="materials-table">
            <thead>
              <tr>
                <th>Block / Item</th>
                <th>Total Count</th>
                <th>Stacks (~64)</th>
              </tr>
            </thead>
            <tbody id="materials-table-body">
              ${(item.materials || []).map(mat => {
                const count = Number(mat.count || 0);
                const stacks = Math.floor(count / 64);
                const remainder = count % 64;
                const stackStr = stacks > 0 ? `${stacks} stacks + ${remainder}` : `${remainder}`;
                return `
                  <tr>
                    <td><strong>${escapeHtml(mat.name)}</strong></td>
                    <td>${count.toLocaleString()}</td>
                    <td class="mat-stacks">${stackStr}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Attach Material Filter
  const matInput = body.querySelector('#mat-filter-input');
  if (matInput) {
    matInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const rows = body.querySelectorAll('#materials-table-body tr');
      rows.forEach(r => {
        const text = r.innerText.toLowerCase();
        r.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (window.lucide) window.lucide.createIcons();
};

/**
 * Screenshot Gallery Navigation Helper
 */
window.navigateGallery = function(direction) {
  if (!activeSchematic || !activeSchematic.screenshots) return;
  const count = activeSchematic.screenshots.length;
  if (count <= 1) return;

  playSound('click');
  activeScreenshotIdx = (activeScreenshotIdx + direction + count) % count;
  updateGalleryDisplay();
};

window.selectScreenshot = function(index) {
  if (!activeSchematic || !activeSchematic.screenshots) return;
  playSound('click');
  activeScreenshotIdx = index;
  updateGalleryDisplay();
};

function updateGalleryDisplay() {
  if (!activeSchematic || !activeSchematic.screenshots) return;
  const s = activeSchematic.screenshots[activeScreenshotIdx];
  const count = activeSchematic.screenshots.length;

  const img = document.getElementById('gallery-active-img');
  const tag = document.getElementById('gallery-active-tag');
  const caption = document.getElementById('gallery-active-caption');
  const counter = document.getElementById('gallery-active-counter');

  if (img) {
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = sanitizeSafeUrl(s.url);
      img.style.opacity = '1';
    }, 150);
  }
  if (tag) tag.innerText = s.tag || '';
  if (caption) caption.innerText = s.caption || '';
  if (counter) counter.innerText = `${activeScreenshotIdx + 1} / ${count}`;

  // Update active thumbnail
  const thumbs = document.querySelectorAll('.gallery-thumb-item');
  thumbs.forEach((t, i) => {
    t.classList.toggle('active', i === activeScreenshotIdx);
  });
}

/**
 * One-Click In-Game Command Copier
 */
window.copySchemCommand = function(cmd) {
  playSound('click');
  navigator.clipboard.writeText(cmd).then(() => {
    const btn = document.getElementById('copy-cmd-btn');
    const bar = document.querySelector('.command-copy-bar');
    if (bar) {
      bar.classList.add('copied-flash');
      setTimeout(() => bar.classList.remove('copied-flash'), 1200);
    }
    if (btn) {
      btn.innerHTML = `<i data-lucide="check" style="width:16px;height:16px;"></i> Copied!`;
      btn.classList.add('copied');
      if (window.lucide) window.lucide.createIcons();
      setTimeout(() => {
        btn.innerHTML = `<i data-lucide="copy" style="width:16px;height:16px;"></i> Copy Command`;
        btn.classList.remove('copied');
        if (window.lucide) window.lucide.createIcons();
      }, 2500);
    }
    showToast(`Copied "${cmd}" to clipboard! Paste into Minecraft chat.`);
  }).catch(() => {
    showToast('Failed to copy. Please manually select the text.');
  });
};

/**
 * Close Detail Modal
 */
function closeModal() {
  playSound('click');
  const modal = document.getElementById('detail-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/**
 * Helper: Smart Download Link Formatter (Auto-converts Google Drive & Cloud links)
 */
function formatDownloadUrl(url) {
  if (!url) return '';
  const trimmed = String(url).trim();
  // Auto-convert Google Drive share links to instant direct downloads
  if (trimmed.includes('drive.google.com')) {
    const fileIdMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
    }
  }
  return trimmed;
}

/**
 * Render Version & Mod Loader Selection System inside Modal
 */
function renderModalVersionSelector(item) {
  // Determine suitable initial version based on item.version
  if (item.version && item.version.includes('1.21')) {
    activeModalVersion = '1.21';
  } else if (item.version && item.version.includes('1.20')) {
    activeModalVersion = '1.20';
  } else if (item.version && item.version.includes('1.19')) {
    activeModalVersion = '1.19';
  } else if (item.version && item.version.includes('1.18')) {
    activeModalVersion = '1.18';
  } else {
    activeModalVersion = '1.21';
  }

  // Determine initial loader based on available formats
  if (item.formats.some(f => f.type.includes('.litematic'))) {
    activeModalLoader = 'fabric';
  } else if (item.formats.some(f => f.type.includes('.schem'))) {
    activeModalLoader = 'paper';
  } else {
    activeModalLoader = 'vanilla';
  }

  return `
    <div class="version-selector-card" id="version-selector-card">
      <div class="version-selector-header">
        <div class="setup-icon"><i data-lucide="layers"></i></div>
        <div>
          <h4 class="setup-title">Choose Your Minecraft Version &amp; Mod Loader</h4>
          <p class="setup-subtitle">Select your client or server setup to download the exact file format with destination instructions.</p>
        </div>
      </div>

      <!-- Step 1: Minecraft Version Selection -->
      <div class="selector-step">
        <label class="selector-label"><i data-lucide="gamepad-2"></i> 1. Select Game Version:</label>
        <div class="version-pill-group" id="modal-version-group">
          <button type="button" class="version-btn ${activeModalVersion === '1.21' ? 'active' : ''}" onclick="setModalVersion('1.21')">
            <span>1.21+ (Tricky Trials)</span>
          </button>
          <button type="button" class="version-btn ${activeModalVersion === '1.20' ? 'active' : ''}" onclick="setModalVersion('1.20')">
            <span>1.20+ (Trails &amp; Tales)</span>
          </button>
          <button type="button" class="version-btn ${activeModalVersion === '1.19' ? 'active' : ''}" onclick="setModalVersion('1.19')">
            <span>1.19+ (The Wild Update)</span>
          </button>
          <button type="button" class="version-btn ${activeModalVersion === '1.18' ? 'active' : ''}" onclick="setModalVersion('1.18')">
            <span>1.18+ (Caves &amp; Cliffs)</span>
          </button>
        </div>
      </div>

      <!-- Step 2: Loader Selection -->
      <div class="selector-step">
        <label class="selector-label"><i data-lucide="cpu"></i> 2. Select Mod Loader / Platform:</label>
        <div class="loader-grid" id="modal-loader-grid">
          <!-- Fabric Option -->
          <div class="loader-card ${activeModalLoader === 'fabric' ? 'active' : ''}" data-loader="fabric" onclick="setModalLoader('fabric')">
            <div class="loader-top">
              <span class="loader-name"><i data-lucide="feather"></i> Fabric / Quilt</span>
              <span class="loader-badge emerald">Litematica</span>
            </div>
            <p class="loader-desc">Best for survival projections with Malilib hologram preview.</p>
            <div class="loader-file-hint">Format: <strong>.litematic</strong></div>
          </div>

          <!-- Paper / WorldEdit Option -->
          <div class="loader-card ${activeModalLoader === 'paper' ? 'active' : ''}" data-loader="paper" onclick="setModalLoader('paper')">
            <div class="loader-top">
              <span class="loader-name"><i data-lucide="server"></i> Paper / Spigot</span>
              <span class="loader-badge blue">WorldEdit / FAWE</span>
            </div>
            <p class="loader-desc">Best for servers using FastAsyncWorldEdit //paste commands.</p>
            <div class="loader-file-hint">Format: <strong>.schem</strong></div>
          </div>

          <!-- Forge / NeoForge Option -->
          <div class="loader-card ${activeModalLoader === 'forge' ? 'active' : ''}" data-loader="forge" onclick="setModalLoader('forge')">
            <div class="loader-top">
              <span class="loader-name"><i data-lucide="box"></i> Forge / NeoForge</span>
              <span class="loader-badge purple">WorldEdit Mod</span>
            </div>
            <p class="loader-desc">Compatible with Forge/NeoForge client mods and WorldEdit.</p>
            <div class="loader-file-hint">Format: <strong>.schem</strong></div>
          </div>

          <!-- Vanilla Save Option -->
          <div class="loader-card ${activeModalLoader === 'vanilla' ? 'active' : ''}" data-loader="vanilla" onclick="setModalLoader('vanilla')">
            <div class="loader-top">
              <span class="loader-name"><i data-lucide="globe"></i> Vanilla / No Mods</span>
              <span class="loader-badge amber">World Save (.zip)</span>
            </div>
            <p class="loader-desc">Standalone single-player world map containing this exact build.</p>
            <div class="loader-file-hint">Format: <strong>.zip</strong></div>
          </div>
        </div>
      </div>

      <!-- Action Bar with Download Button & Folder Instructions -->
      <div id="modal-action-bar-container">
        ${getModalActionBarHtml(item, activeModalVersion, activeModalLoader)}
      </div>

      <!-- Raw Formats Accordion Toggle -->
      <div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed rgba(255,255,255,0.1);">
        <button type="button" class="raw-formats-toggle" onclick="toggleRawFormatsList()">
          <i data-lucide="chevron-down" id="raw-formats-chevron"></i>
          <span>Need another raw file? View all formats (${item.formats ? item.formats.length : 0} files)</span>
        </button>
        <div class="raw-formats-list" id="raw-formats-list" style="display: none;">
          ${(item.formats || []).map(fmt => {
            const rawUrl = sanitizeSafeUrl(formatDownloadUrl(fmt.file));
            const isExternal = rawUrl.startsWith('http');
            const safeType = escapeHtml(fmt.type);
            const safeSize = escapeHtml(fmt.size);
            const safeId = sanitizeId(item.id);
            return `
              <a href="${rawUrl}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : 'download'} class="raw-format-link" onclick="handleModalDownload(this, '${safeId}', '${safeType}', event)">
                <i data-lucide="download"></i>
                <span>${safeType} (${safeSize})</span>
              </a>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function getModalActionBarHtml(item, ver, loader) {
  if (!item) return '';

  let targetFormat = null;
  let loaderTitle = '';
  let destFolder = '';
  let usageGuide = '';

  const safeId = sanitizeId(item.id);
  const cleanId = safeId.replace(/-/g, '_');

  if (loader === 'fabric') {
    loaderTitle = 'Fabric / Quilt (Litematica)';
    targetFormat = item.formats.find(f => f.type.includes('.litematic')) || item.formats.find(f => f.type.includes('.schem')) || item.formats[0];
    destFolder = '.minecraft/schematics/';
    usageGuide = `Press 'M' in game &gt; click 'Load Schematics' &gt; select the file &gt; click 'Paste' or project survival hologram.`;
  } else if (loader === 'paper') {
    loaderTitle = 'Paper / Spigot (WorldEdit & FAWE)';
    targetFormat = item.formats.find(f => f.type.includes('.schem')) || item.formats[0];
    destFolder = 'plugins/FastAsyncWorldEdit/schematics/';
    usageGuide = `Place file in folder, run '//schem load ${cleanId}' then stand at position and type '//paste'.`;
  } else if (loader === 'forge') {
    loaderTitle = 'Forge / NeoForge (WorldEdit Mod)';
    targetFormat = item.formats.find(f => f.type.includes('.schem')) || item.formats.find(f => f.type.includes('.litematic')) || item.formats[0];
    destFolder = 'config/worldedit/schematics/';
    usageGuide = `Run '//schem load ${cleanId}' in game and paste at your chosen coordinates.`;
  } else {
    loaderTitle = 'Vanilla World Save (.zip)';
    targetFormat = item.formats.find(f => f.type.includes('.zip')) || item.formats[0];
    destFolder = '.minecraft/saves/';
    usageGuide = `Extract folder into '.minecraft/saves/'. Launch Minecraft &gt; Singleplayer &gt; play world.`;
  }

  // Compatibility checking
  const numMatch = (item.version || '1.18').match(/1\.\d+/);
  const itemMajor = numMatch ? parseFloat(numMatch[0]) : 1.18;
  const chosenMajor = parseFloat(ver);

  let compatBadge = '';
  if (chosenMajor < itemMajor) {
    compatBadge = `
      <span class="compat-tag" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border-color: rgba(245, 158, 11, 0.35);">
        <i data-lucide="alert-triangle"></i> Created for MC ${escapeHtml(item.version)}. Newer blocks in 1.21 may not render in ${escapeHtml(ver)}.
      </span>
    `;
  } else {
    compatBadge = `
      <span class="compat-tag">
        <i data-lucide="check-circle-2"></i> 100% Verified Compatible with Minecraft ${escapeHtml(ver)}
      </span>
    `;
  }

  const finalUrl = sanitizeSafeUrl(formatDownloadUrl(targetFormat.file));
  const isExternal = finalUrl.startsWith('http');
  const safeLoaderTitle = escapeHtml(loaderTitle);
  const safeDestFolder = escapeHtml(destFolder);
  const safeTargetType = escapeHtml(targetFormat.type);
  const safeTargetSize = escapeHtml(targetFormat.size);
  const displayLoader = escapeHtml(loaderTitle.split('(')[0].trim());

  return `
    <div class="selector-action-bar">
      <div class="action-status-line">
        <div class="action-status-text">
          Target: <strong>${safeLoaderTitle}</strong> for <strong>Minecraft ${escapeHtml(ver)}</strong>
        </div>
        ${compatBadge}
      </div>

      <div class="dest-guide-strip">
        <div class="dest-guide-text">
          <i data-lucide="folder"></i>
          <span>Save Destination: <code>${safeDestFolder}</code></span>
        </div>
        <button type="button" class="copy-mini-btn" data-path="${safeDestFolder}" onclick="copyDestinationPathFromBtn(this)" title="Copy directory path">
          <i data-lucide="copy"></i> Copy Path
        </button>
      </div>

      <div style="font-size: 0.8rem; color: #94a3b8; display: flex; align-items: flex-start; gap: 0.4rem;">
        <i data-lucide="info" style="width: 14px; height: 14px; color: #38bdf8; flex-shrink: 0; margin-top: 2px;"></i>
        <span>${usageGuide}</span>
      </div>

      <div class="action-download-row">
        <a href="${finalUrl}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : 'download'} class="btn btn-primary btn-lg btn-download-primary modal-dl-btn" onclick="handleModalDownload(this, '${safeId}', '${safeTargetType}', event)">
          <i data-lucide="download"></i> Download ${safeTargetType} for ${displayLoader} (${safeTargetSize})
        </a>
      </div>
    </div>
  `;
}

window.setModalVersion = function(ver) {
  activeModalVersion = ver;
  playSound('pop');
  const group = document.getElementById('modal-version-group');
  if (group) {
    group.querySelectorAll('.version-btn').forEach(btn => {
      btn.classList.toggle('active', btn.innerText.includes(ver));
    });
  }
  const barContainer = document.getElementById('modal-action-bar-container');
  if (barContainer && activeSchematic) {
    barContainer.innerHTML = getModalActionBarHtml(activeSchematic, activeModalVersion, activeModalLoader);
    if (window.lucide) window.lucide.createIcons();
  }
};

window.setModalLoader = function(loader) {
  activeModalLoader = loader;
  playSound('pop');
  const grid = document.getElementById('modal-loader-grid');
  if (grid) {
    grid.querySelectorAll('.loader-card').forEach(card => {
      const match = (card.dataset.loader === loader) || (card.getAttribute('onclick') && card.getAttribute('onclick').includes(loader));
      card.classList.toggle('active', !!match);
    });
  }
  const barContainer = document.getElementById('modal-action-bar-container');
  if (barContainer && activeSchematic) {
    barContainer.innerHTML = getModalActionBarHtml(activeSchematic, activeModalVersion, activeModalLoader);
    if (window.lucide) window.lucide.createIcons();
  }
};

window.toggleRawFormatsList = function() {
  playSound('click');
  const list = document.getElementById('raw-formats-list');
  const chevron = document.getElementById('raw-formats-chevron');
  if (list) {
    const isHidden = list.style.display === 'none';
    list.style.display = isHidden ? 'flex' : 'none';
    if (chevron) {
      chevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  }
};

window.copyDestinationPath = function(path) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(path).then(() => {
      playSound('pop');
      showToast(`📋 Copied path: ${path}`);
    }).catch(() => fallbackCopy(path));
  } else {
    fallbackCopy(path);
  }
};

window.openBuildModalWithDownload = function(id) {
  openBuildModal(id);
  setTimeout(() => {
    const selectorCard = document.getElementById('version-selector-card');
    if (selectorCard) {
      selectorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 220);
};

/**
 * Trigger Default Download with Interactive Button State Transitions
 */
window.triggerDefaultDownload = function(id, event) {
  const item = schematics.find(s => s.id === id);
  if (!item || !item.formats.length) return;

  const btn = event ? (event.currentTarget || event.target.closest('button')) : null;
  const originalHtml = btn ? btn.innerHTML : '';

  if (btn) {
    btn.disabled = true;
    btn.classList.add('btn-loading');
    btn.innerHTML = `<span class="btn-spinner"></span> <span>Preparing...</span>`;
  }

  const defaultFormat = item.formats[0];
  const downloadUrl = formatDownloadUrl(defaultFormat.file);

  setTimeout(() => {
    if (downloadUrl.startsWith('http')) {
      window.open(downloadUrl, '_blank');
    } else {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = downloadUrl.split('/').pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    trackDownload(id, defaultFormat.type, event);

    if (btn) {
      btn.classList.remove('btn-loading');
      btn.classList.add('btn-success');
      btn.innerHTML = `<i data-lucide="check" style="width:16px;height:16px;"></i> <span>Downloaded!</span>`;
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        btn.classList.remove('btn-success');
        btn.innerHTML = originalHtml;
        btn.disabled = false;
        if (window.lucide) window.lucide.createIcons();
      }, 1600);
    }
  }, 350);
};

/**
 * Handle Modal Download Button Feedback
 */
window.handleModalDownload = function(btn, id, type, event) {
  if (btn) {
    const originalHtml = btn.innerHTML;
    btn.classList.add('btn-loading');
    btn.innerHTML = `<span class="btn-spinner"></span> <span>Preparing...</span>`;

    setTimeout(() => {
      trackDownload(id, type, event);
      btn.classList.remove('btn-loading');
      btn.classList.add('btn-success');
      btn.innerHTML = `<i data-lucide="check" style="width:16px;height:16px;"></i> <span>Downloaded!</span>`;
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        btn.classList.remove('btn-success');
        btn.innerHTML = originalHtml;
        if (window.lucide) window.lucide.createIcons();
      }, 1600);
    }, 350);
  } else {
    trackDownload(id, type, event);
  }
};

/**
 * Track Download & Trigger Particle Burst
 */
window.trackDownload = function(id, type, event) {
  const item = schematics.find(s => s.id === id);
  if (item) {
    item.downloadsCount++;
    saveRealMetrics();
    const totalDownloads = schematics.reduce((acc, curr) => acc + (curr.downloadsCount || 0), 0);
    const dlsElem = document.getElementById('total-downloads-count');
    if (dlsElem) dlsElem.innerText = totalDownloads.toLocaleString();

    // Update download badge on card
    const cardBadge = document.querySelector(`.schem-card[data-id="${id}"] .badge-gold`);
    if (cardBadge) {
      cardBadge.innerHTML = `<i data-lucide="download" style="width:12px;height:12px;"></i> ${item.downloadsCount.toLocaleString()}`;
      if (window.lucide) window.lucide.createIcons();
    }
  }

  playSound('levelUp');
  if (event && event.target) {
    spawnParticleBurst(event.target);
  }
  showToast(`Starting download for ${type}... Happy building!`);
};

/**
 * Particle Burst Animation (Minecraft Experience Orb / Emerald Sparkles)
 */
function spawnParticleBurst(originElement) {
  const rect = originElement.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  const burstContainer = document.createElement('div');
  burstContainer.style.position = 'fixed';
  burstContainer.style.top = '0';
  burstContainer.style.left = '0';
  burstContainer.style.width = '100vw';
  burstContainer.style.height = '100vh';
  burstContainer.style.pointerEvents = 'none';
  burstContainer.style.zIndex = '9999';
  document.body.appendChild(burstContainer);

  const colors = ['#10b981', '#34d399', '#38bdf8', '#fbbf24', '#ffffff'];

  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 8 + 4;
    p.style.position = 'absolute';
    p.style.left = `${originX}px`;
    p.style.top = `${originY}px`;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    p.style.boxShadow = `0 0 10px ${p.style.backgroundColor}`;
    burstContainer.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 90 + 35;
    const targetX = originX + Math.cos(angle) * distance;
    const targetY = originY + Math.sin(angle) * distance - 25;

    p.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${targetX - originX}px, ${targetY - originY}px) scale(0)`, opacity: 0 }
    ], {
      duration: 650 + Math.random() * 300,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    });
  }

  setTimeout(() => {
    burstContainer.remove();
  }, 1000);
}

/**
 * Subtle Ambient Canvas Particle System (Floating Experience Dust)
 */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(35, Math.floor(window.innerWidth / 35));

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1.5,
      speedY: Math.random() * 0.35 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.45 + 0.15,
      color: Math.random() > 0.35 ? '#10b981' : '#38bdf8'
    });
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      ctx.restore();
    });

    requestAnimationFrame(loop);
  }

  loop();
}

/**
 * Web Audio API Synthesizer for Authentic Minecraft-style Sound FX
 */
let audioCtx = null;
function playSound(type) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (type === 'click') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(820, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'pop') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } else if (type === 'levelUp') {
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((f, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime + i * 0.07);

        gain.gain.setValueAtTime(0.09, audioCtx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.07 + 0.22);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + i * 0.07);
        osc.stop(audioCtx.currentTime + i * 0.07 + 0.25);
      });
    }
  } catch (e) {}
}

/**
 * Live JSON preview generator in Add Custom Build modal
 */
/**
 * Toast Notification Helper
 */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `<i data-lucide="check-circle" style="width: 18px; height: 18px; color: var(--accent-emerald);"></i> <span>${escapeHtml(message)}</span>`;
  toast.classList.add('show');

  if (window.lucide) window.lucide.createIcons();

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/**
 * Utility: HTML escape
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Security: Strict URL Sanitizer for Links & Images
 * Blocks javascript:, data:text/html, vbscript:, and only allows safe web protocols & local paths
 */
function sanitizeSafeUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:') || lower.startsWith('data:text') || lower.startsWith('vbscript:')) {
    return '#';
  }
  return escapeHtml(trimmed);
}

/**
 * Security: Strict URL Sanitizer for iFrame embeds
 * Only permits valid, HTTPS YouTube / YouTube-NoCookie embed links
 */
function sanitizeEmbedUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  const allowedPrefixes = [
    'https://www.youtube.com/embed/',
    'https://www.youtube-nocookie.com/embed/',
    'https://player.vimeo.com/video/'
  ];
  const isAllowed = allowedPrefixes.some(prefix => trimmed.startsWith(prefix));
  if (isAllowed) {
    try {
      const parsed = new URL(trimmed);
      return parsed.origin + parsed.pathname;
    } catch (e) {
      return '';
    }
  }
  return '';
}

/**
 * Security: Strict Identifier Sanitizer
 */
function sanitizeId(id) {
  if (!id || typeof id !== 'string') return '';
  return id.replace(/[^a-zA-Z0-9_-]/g, '');
}

/**
 * Safe Event Delegation Handlers for Attributes
 */
window.copySchemCommandFromBtn = function(btn) {
  const cmd = btn ? (btn.getAttribute('data-command') || '') : '';
  window.copySchemCommand(cmd);
};

window.copyDestinationPathFromBtn = function(btn) {
  const p = btn ? (btn.getAttribute('data-path') || '') : '';
  window.copyDestinationPath(p);
};

/**
 * Scroll Reveal using IntersectionObserver with Staggered Delays
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal, .schem-card, .guide-card, .hero-stat-card, .faq-item');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  elements.forEach((el, index) => {
    el.classList.add('scroll-reveal');
    el.style.setProperty('--reveal-delay', (index % 4).toString());
    observer.observe(el);
  });
}

/**
 * Floating Heart Particles when liking builds
 */
function spawnFloatingHearts(originBtn) {
  const rect = originBtn.getBoundingClientRect();
  const count = 3;
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤';
    heart.style.left = `${rect.left + rect.width / 2}px`;
    heart.style.top = `${rect.top}px`;
    heart.style.setProperty('--x', `${(Math.random() - 0.5) * 45}px`);
    document.body.appendChild(heart);
    setTimeout(() => {
      if (heart.parentNode) heart.remove();
    }, 850);
  }
}

/**
 * Interactive 3D Voxel Vault Cube Unlock Easter Egg
 */
function initVaultCubeInteractive() {
  const cube = document.getElementById('vault-cube-trigger');
  if (!cube) return;

  cube.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    cube.classList.remove('unlock-spin');
    void cube.offsetWidth; // trigger reflow
    cube.classList.add('unlock-spin');

    playSound('levelUp');
    spawnParticleBurst(cube);

    // Floating XP badge
    const badge = document.createElement('div');
    badge.className = 'vault-unlock-badge';
    badge.innerText = '+100 XP Vault Unlocked!';
    cube.appendChild(badge);
    setTimeout(() => {
      if (badge.parentNode) badge.remove();
    }, 1200);

    showToast('⚡ Vault Core Activated! +100 Building XP');
  });
}

/**
 * Ambient Glowing Green Torchlight Cursor Shadow
 */
function initCursorGlow() {
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mouseX = -500;
  let mouseY = -500;
  let currentX = -500;
  let currentY = -500;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isMoving) {
      isMoving = true;
      glow.classList.add('active');
    }
  });

  window.addEventListener('mouseleave', () => {
    glow.classList.remove('active');
    isMoving = false;
  });

  // Smooth linear interpolation (lerp) loop for torchlight aura
  function animateHalo() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(animateHalo);
  }
  requestAnimationFrame(animateHalo);
}

/**
 * Interactive Kinetic Logo Letters (Audio Chime on glide)
 */
function initBrandLetterFX() {
  const chars = document.querySelectorAll('.brand-title .char');
  const letterNotes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50, 1174.66]; // C5 to D6

  chars.forEach((char, idx) => {
    char.addEventListener('mouseenter', () => {
      playChimeNote(letterNotes[idx % letterNotes.length]);
    });
  });
}

/**
 * Interactive Kinetic Hero Headline
 */
function initHeroTextFX() {
  const titleChars = document.querySelectorAll('.title-char');
  // Pentatonic harmonious scale across the characters
  const pentatonicScale = [
    261.63, 293.66, 329.63, 392.00, 440.00, 
    523.25, 587.33, 659.25, 783.99, 880.00, 
    1046.50, 1174.66, 1318.51
  ];

  titleChars.forEach((char, idx) => {
    char.addEventListener('mouseenter', () => {
      const note = pentatonicScale[idx % pentatonicScale.length];
      playChimeNote(note);
    });

    char.addEventListener('click', () => {
      playSound('pop');
      if (typeof spawnParticleBurst === 'function') {
        spawnParticleBurst(char);
      }
    });
  });
}

function playChimeNote(freq) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.18);
  } catch (e) {}
}
