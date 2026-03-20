// CTU Timetable Exporter v1 — by Huaniverse
// https://huaniverse.netlify.app/

(function () {
  'use strict';

  const TARGET_PATH = '/dangkyhocphan/sinhvien/danhmuchocphan';
  const PANEL_ID    = 'ctu5-panel';
  const STYLE_ID    = 'ctu5-style';
  const AUTHOR_URL  = 'https://huaniverse.netlify.app/';

  // ==========================================================================
  // SPA — URL polling (most reliable)
  // ==========================================================================

  let _lastHref = location.href;
  setInterval(() => {
    if (location.href !== _lastHref) {
      _lastHref = location.href;
      onNav();
    }
  }, 250);

  if (!history._ctu5) {
    const _wrap = fn => function (...a) {
      const r = fn.apply(this, a);
      setTimeout(onNav, 0);
      return r;
    };
    history.pushState    = _wrap(history.pushState);
    history.replaceState = _wrap(history.replaceState);
    history._ctu5 = true;
  }
  window.addEventListener('popstate',   onNav);
  window.addEventListener('hashchange', onNav);

  function isTarget() {
    return location.pathname === TARGET_PATH ||
           location.pathname.startsWith(TARGET_PATH + '/');
  }
  function onNav() {
    if (isTarget()) { if (!document.getElementById(PANEL_ID)) injectPanel(); }
    else removePanel();
  }

  // ==========================================================================
  // STYLES
  // ==========================================================================

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const css = `
      /* ─── RESET ─── */
      #${PANEL_ID},
      #${PANEL_ID} *,
      #${PANEL_ID} *::before,
      #${PANEL_ID} *::after {
        all: unset !important;
        box-sizing: border-box !important;
        font-family: 'Inter','Segoe UI',system-ui,sans-serif !important;
        -webkit-font-smoothing: antialiased !important;
      }

      /* ─── SHELL ─── */
      #${PANEL_ID} {
        display: block !important;
        width: 100% !important;
        position: relative !important;
        z-index: 2147483647 !important;
        background: #1e2636 !important;
        border-bottom: 1px solid #2d3a50 !important;
        box-shadow: 0 2px 12px rgba(0,0,0,0.3) !important;
      }

      /* ─── TOP LOADING BAR ─── */
      #${PANEL_ID} .c5-loader-track {
        display: block !important;
        width: 100% !important;
        height: 6px !important;
        background: transparent !important;
        overflow: hidden !important;
        position: relative !important;
        z-index: 1000 !important;
      }
      #${PANEL_ID} .c5-loader-fill {
        display: block !important;
        height: 100% !important;
        background: #0ea5e9 !important;
        width: 0% !important;
        transition: opacity 0.4s ease !important;
        border-radius: 0 2px 2px 0 !important;
        box-shadow: 0 0 10px #0ea5e9 !important;
        opacity: 0 !important;
      }
      #${PANEL_ID} .c5-loader-fill.c5-indeterminate {
        width: 50% !important;
        animation: c5-slide 1.2s ease-in-out infinite !important;
      }
      @keyframes c5-slide {
        0%   { transform: translateX(-100%); }
        100% { transform: translateX(250%); }
      }

      /* ─── MAIN BAR ─── */
      #${PANEL_ID} .c5-bar {
        display: flex !important;
        align-items: center !important;
        height: 52px !important;
        padding: 0 14px !important;
        gap: 10px !important;
      }

      /* ─── LOGO ─── */
      #${PANEL_ID} .c5-logo {
        display: flex !important;
        align-items: center !important;
        gap: 7px !important;
        flex-shrink: 0 !important;
        text-decoration: none !important;
        cursor: pointer !important;
      }
      #${PANEL_ID} .c5-logo-icon {
        width: 22px !important;
        height: 22px !important;
        border-radius: 6px !important;
        background: linear-gradient(135deg,#38bdf8,#818cf8) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex-shrink: 0 !important;
        font-size: 12px !important;
        font-weight: 800 !important;
        color: #fff !important;
      }
      #${PANEL_ID} .c5-logo-text {
        display: flex !important;
        flex-direction: column !important;
        gap: 0px !important;
      }
      #${PANEL_ID} .c5-logo-name {
        font-size: 12.5px !important;
        font-weight: 700 !important;
        color: #e2e8f0 !important;
        white-space: nowrap !important;
        letter-spacing: 0.1px !important;
      }
      #${PANEL_ID} .c5-logo-by {
        font-size: 9.5px !important;
        color: #94a3b8 !important;
        white-space: nowrap !important;
      }
      #${PANEL_ID} .c5-logo-by a,
      #${PANEL_ID} .c5-logo-by span {
        color: #38bdf8 !important;
        text-decoration: none !important;
        cursor: pointer !important;
        font-size: 9.5px !important;
      }
      #${PANEL_ID} .c5-logo-by a:hover { text-decoration: underline !important; }

      /* ─── DIVIDER ─── */
      #${PANEL_ID} .c5-div {
        width: 1px !important;
        height: 26px !important;
        background: #2d3a50 !important;
        flex-shrink: 0 !important;
        display: block !important;
      }

      /* ─── CONTENT AREA ─── */
      #${PANEL_ID} .c5-content {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        flex: 1 !important;
        min-width: 0 !important;
        height: 100% !important;
      }

      /* each state fills the content area */
      #${PANEL_ID} .c5-state {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        flex: 1 !important;
        min-width: 0 !important;
      }
      #${PANEL_ID} .c5-state.c5-h { display: none !important; }

      /* ─── CHECKING ─── */
      #${PANEL_ID} .c5-dim {
        font-size: 12px !important;
        color: #94a3b8 !important;
        white-space: nowrap !important;
      }

      /* ─── FORM ─── */
      #${PANEL_ID} .c5-field {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        gap: 3px !important;
        flex-shrink: 0 !important;
      }
      #${PANEL_ID} .c5-field-grow {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        gap: 3px !important;
        flex: 1 !important;
        min-width: 0 !important;
      }
      #${PANEL_ID} .c5-lbl {
        font-size: 9px !important;
        font-weight: 600 !important;
        color: #94a3b8 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.7px !important;
        white-space: nowrap !important;
      }
      #${PANEL_ID} .c5-inp,
      #${PANEL_ID} .c5-sel {
        height: 28px !important;
        padding: 0 9px !important;
        background: #111827 !important;
        border: 1px solid #2d3a50 !important;
        border-radius: 5px !important;
        font-size: 12px !important;
        color: #e2e8f0 !important;
        outline: none !important;
        width: 100% !important;
        display: block !important;
        transition: border-color .15s, background .15s !important;
      }
      #${PANEL_ID} .c5-sel {
        line-height: 26px !important;
      }
      #${PANEL_ID} .c5-inp::placeholder { color: #94a3b8 !important; font-size: 12px !important; }
      #${PANEL_ID} .c5-inp:focus,
      #${PANEL_ID} .c5-sel:focus {
        border-color: #38bdf8 !important;
        background: #0f172a !important;
        outline: none !important;
      }
      #${PANEL_ID} .c5-sel option {
        background: #1e2636 !important;
        color: #cbd5e1 !important;
      }
      #${PANEL_ID} .c5-w-year { width: 118px !important; }
      #${PANEL_ID} .c5-w-sem  { width: 100px !important; }

      /* ─── BUTTONS — all same height 28px ─── */
      #${PANEL_ID} .c5-btn {
        height: 28px !important;
        padding: 0 11px !important;
        border-radius: 5px !important;
        font-size: 11.5px !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        white-space: nowrap !important;
        flex-shrink: 0 !important;
        border: none !important;
        outline: none !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 4px !important;
        letter-spacing: 0.1px !important;
        transition: opacity .15s, filter .15s, transform .1s !important;
        line-height: 1 !important;
        vertical-align: middle !important;
      }
      #${PANEL_ID} .c5-btn:hover  { filter: brightness(1.12) !important; transform: translateY(-1px) !important; }
      #${PANEL_ID} .c5-btn:active { transform: none !important; filter: brightness(0.95) !important; }
      #${PANEL_ID} .c5-btn:disabled { opacity: 0.38 !important; cursor: not-allowed !important; transform: none !important; filter: none !important; }

      #${PANEL_ID} .c5-btn-sky   { background: #0ea5e9 !important; color: #fff !important; }
      #${PANEL_ID} .c5-btn-green { background: #22c55e !important; color: #052e16 !important; }
      #${PANEL_ID} .c5-btn-amber { background: #f59e0b !important; color: #1c1917 !important; }
      #${PANEL_ID} .c5-btn-ghost {
        background: #1e2636 !important;
        border: 1px solid #2d3a50 !important;
        color: #94a3b8 !important;
      }
      #${PANEL_ID} .c5-btn-ghost:hover {
        filter: none !important;
        border-color: #38bdf8 !important;
        color: #e2e8f0 !important;
        background: #243044 !important;
      }
      #${PANEL_ID} #c5-form > .c5-btn {
        align-self: flex-end !important;
      }

      #${PANEL_ID} .c5-btn-active-tgl {
        background: rgba(56,189,248,0.12) !important;
        border: 1px solid #38bdf8 !important;
        color: #38bdf8 !important;
      }

      /* ─── RESULT CHIP ─── */
      #${PANEL_ID} .c5-chip {
        display: inline-flex !important;
        align-items: center !important;
        gap: 4px !important;
        padding: 0 10px !important;
        height: 28px !important;
        border-radius: 5px !important;
        font-size: 11.5px !important;
        font-weight: 600 !important;
        flex-shrink: 0 !important;
        white-space: nowrap !important;
      }
      #${PANEL_ID} .c5-chip-ok {
        background: rgba(34,197,94,0.12) !important;
        border: 1px solid rgba(34,197,94,0.3) !important;
        color: #86efac !important;
      }
      #${PANEL_ID} .c5-chip-err {
        background: rgba(239,68,68,0.12) !important;
        border: 1px solid rgba(239,68,68,0.3) !important;
        color: #fca5a5 !important;
      }

      /* ─── PROGRESS TEXT ─── */
      #${PANEL_ID} #c5-ptxt {
        color: #e2e8f0 !important;
        font-weight: 500 !important;
      }

      /* ─── ERR TEXT ─── */
      #${PANEL_ID} .c5-etxt {
        font-size: 11.5px !important;
        color: #94a3b8 !important;
        flex: 1 !important;
        min-width: 0 !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }

      /* ─── TRAY ─── */
      #${PANEL_ID} .c5-tray {
        display: none !important;
        align-items: center !important;
        gap: 8px !important;
        flex-wrap: wrap !important;
        padding: 8px 14px !important;
        background: #16202e !important;
        border-top: 1px solid #1e2d3d !important;
        animation: c5-in .16s ease !important;
      }
      #${PANEL_ID} .c5-tray.c5-open { display: flex !important; }
      @keyframes c5-in {
        from { opacity:0; transform: translateY(-3px); }
        to   { opacity:1; transform: translateY(0); }
      }
      #${PANEL_ID} .c5-tray-lbl {
        font-size: 11px !important;
        color: #94a3b8 !important;
        white-space: nowrap !important;
        flex-shrink: 0 !important;
      }
      #${PANEL_ID} .c5-tray-row {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        flex: 1 !important;
        min-width: 0 !important;
      }

      /* ─── PILLS ─── */
      #${PANEL_ID} .c5-pills {
        display: flex !important;
        align-items: center !important;
        gap: 5px !important;
        flex-wrap: wrap !important;
        flex: 1 !important;
      }
      #${PANEL_ID} .c5-pill {
        display: inline-flex !important;
        align-items: center !important;
        gap: 3px !important;
        padding: 2px 6px 2px 8px !important;
        background: #1e2d3d !important;
        border: 1px solid #2d3a50 !important;
        border-radius: 999px !important;
        font-size: 11px !important;
        color: #94a3b8 !important;
      }
      #${PANEL_ID} .c5-pill-x {
        width: 13px !important;
        height: 13px !important;
        border-radius: 50% !important;
        background: #2d3a50 !important;
        border: none !important;
        color: #94a3b8 !important;
        font-size: 9px !important;
        cursor: pointer !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex-shrink: 0 !important;
        transition: background .12s, color .12s !important;
        padding: 0 !important;
        line-height: 1 !important;
      }
      #${PANEL_ID} .c5-pill-x:hover { background: #ef4444 !important; color: #fff !important; }

      #${PANEL_ID} .c5-h { display: none !important; }
    `;
    const s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ==========================================================================
  // BUILD HTML
  // ==========================================================================

  function buildPanel() {
    const el = document.createElement('div');
    el.id = PANEL_ID;
    el.innerHTML = `
      <!-- loading bar -->
      <div class="c5-loader-track">
        <div class="c5-loader-fill" id="c5-lfill"></div>
      </div>

      <!-- main bar -->
      <div class="c5-bar">

        <!-- logo / credit -->
        <div class="c5-logo" id="c5-logo-link" title="Visit Huaniverse">
          <div class="c5-logo-icon">H</div>
          <div class="c5-logo-text">
            <span class="c5-logo-name">CTU Exporter</span>
            <span class="c5-logo-by">by <a id="c5-author-link" href="${AUTHOR_URL}" target="_blank" rel="noopener">Huaniverse</a></span>
          </div>
        </div>

        <div class="c5-div"></div>

        <!-- states -->
        <div class="c5-content">

          <!-- checking -->
          <div class="c5-state" id="c5-checking">
            <span class="c5-dim">Đang chờ trang tải...</span>
          </div>

          <!-- form -->
          <div class="c5-state c5-h" id="c5-form">
            <div class="c5-field">
              <span class="c5-lbl">Năm học</span>
              <input class="c5-inp c5-w-year" id="c5-year" type="text"
                placeholder="2025-2026" autocomplete="off" spellcheck="false" />
            </div>
            <div class="c5-field">
              <span class="c5-lbl">Học kỳ</span>
              <select class="c5-sel c5-w-sem" id="c5-sem">
                <option value="">-- Chọn --</option>
                <option value="1">Học kỳ 1</option>
                <option value="2">Học kỳ 2</option>
                <option value="3">Học kỳ 3</option>
              </select>
            </div>
            <div class="c5-field-grow">
              <span class="c5-lbl">Mã học phần (cách nhau dấu phẩy)</span>
              <input class="c5-inp" id="c5-codes" type="text"
                placeholder="CT101, ML014, XH025" autocomplete="off" spellcheck="false" />
            </div>
            <button class="c5-btn c5-btn-sky" id="c5-go">▶ Bắt đầu</button>
          </div>

          <!-- progress -->
          <div class="c5-state c5-h" id="c5-progress">
            <span class="c5-dim" id="c5-ptxt" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Đang xử lý...</span>
          </div>

          <!-- result -->
          <div class="c5-state c5-h" id="c5-result">
            <span class="c5-chip c5-chip-ok" id="c5-rbadge">✓</span>
            <button class="c5-btn c5-btn-green" id="c5-dl">⬇ Tải tệp Excel</button>
            <button class="c5-btn c5-btn-ghost" id="c5-tgl-add">＋ Thêm môn</button>
            <button class="c5-btn c5-btn-ghost" id="c5-tgl-del">－ Xóa môn</button>
            <button class="c5-btn c5-btn-ghost" id="c5-reset">↺ Làm lại</button>
          </div>

          <!-- error -->
          <div class="c5-state c5-h" id="c5-error">
            <span class="c5-chip c5-chip-err">✗ Lỗi</span>
            <span class="c5-etxt" id="c5-etxt"></span>
            <button class="c5-btn c5-btn-amber" id="c5-reload">⟳ Tải lại trang</button>
            <button class="c5-btn c5-btn-ghost" id="c5-retry">↺ Thử lại</button>
          </div>

        </div>
      </div>

      <!-- tray: add courses -->
      <div class="c5-tray" id="c5-tray-add">
        <span class="c5-tray-lbl">Thêm môn học:</span>
        <div class="c5-tray-row">
          <input class="c5-inp" id="c5-add-inp" type="text"
            placeholder="VD: CT404, IT505" autocomplete="off" spellcheck="false"
            style="flex:1;min-width:0;" />
          <button class="c5-btn c5-btn-sky" id="c5-add-go">Quét &amp; thêm</button>
          <button class="c5-btn c5-btn-ghost" id="c5-add-cancel">Hủy</button>
        </div>
      </div>

      <!-- tray: remove courses -->
      <div class="c5-tray" id="c5-tray-del">
        <span class="c5-tray-lbl">Nhấn ✕ để xóa:</span>
        <div class="c5-pills" id="c5-pills"></div>
        <button class="c5-btn c5-btn-ghost" id="c5-del-done">Xong</button>
      </div>
    `;
    return el;
  }

  // ==========================================================================
  // STATE
  // ==========================================================================

  let scrapedData = null;
  let panelReady  = false;
  let activeTray  = null;

  const SEL = {
    YEAR: '#rc_select_0', SEM: '#rc_select_1', CODE: '#rc_select_2',
    SBTN: '.anticon-search',
    ROWS: 'tbody.ant-table-tbody tr.ant-table-row-level-0',
    NEXT: 'li.ant-pagination-next:not(.ant-pagination-disabled)',
    DOPT: '.ant-select-item-option'
  };
  const W   = { INP: 500, SEARCH: 1600, PAGE: 1000, DROP: 300 };
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const $    = id => document.getElementById(id);
  const STATES = ['checking','form','progress','result','error'];

  // ==========================================================================
  // LOADING BAR & PROGRESS ANIMATION
  // ==========================================================================

  let _progAnim = null;
  let _currentPct = 0;
  let _targetPct = 0;
  let _progText = '';

  function loaderSet(pct) {
    cancelAnimationFrame(_progAnim);
    _currentPct = pct;
    const f = $('c5-lfill');
    if (!f) return;
    f.classList.remove('c5-indeterminate');
    f.style.setProperty('width', pct + '%', 'important');
    f.style.setProperty('opacity', '1', 'important');
  }

  function loaderIndeterminate() {
    cancelAnimationFrame(_progAnim);
    const f = $('c5-lfill');
    if (!f) return;
    f.classList.add('c5-indeterminate');
    f.style.removeProperty('width');
    f.style.setProperty('opacity', '1', 'important');
  }

  function loaderHide() {
    cancelAnimationFrame(_progAnim);
    _currentPct = 0;
    const f = $('c5-lfill');
    if (!f) return;
    f.classList.remove('c5-indeterminate');
    f.style.setProperty('width', '0%', 'important');
    f.style.setProperty('opacity', '0', 'important');
  }

  // ==========================================================================
  // UI HELPERS
  // ==========================================================================

  function showState(st) {
    STATES.forEach(s => {
      const el = $('c5-' + s);
      if (el) el.classList.toggle('c5-h', s !== st);
    });
  }

  function setProg(targetPct, txtTemplate) {
    const f = $('c5-lfill');
    const t = $('c5-ptxt');
    if (!f || !t) return;
    
    f.classList.remove('c5-indeterminate');
    f.style.setProperty('opacity', '1', 'important');
    
    if (txtTemplate !== undefined) _progText = txtTemplate;
    _targetPct = targetPct;
    
    cancelAnimationFrame(_progAnim);
    
    // Jump instantly for ends or resets
    if (targetPct === 0 || targetPct === 100) {
      _currentPct = targetPct;
      f.style.setProperty('width', targetPct + '%', 'important');
      if (_progText) {
        t.textContent = targetPct === 100 ? _progText : ((targetPct > 0 && targetPct < 100) ? `[${targetPct}%] ${_progText}` : _progText);
      }
      return;
    }

    let lastTime = performance.now();
    
    function step(now) {
      const dt = Math.max(0, now - lastTime);
      lastTime = now;
      
      // Fast to target, slow asymptotic creep to 96%
      if (_currentPct < _targetPct - 0.5) {
        _currentPct += (_targetPct - _currentPct) * Math.min(dt / 300, 1);
      } else {
        _currentPct += (96 - _currentPct) * Math.min(dt / 25000, 1);
      }
      
      const p = Math.floor(_currentPct);
      f.style.setProperty('width', _currentPct + '%', 'important');
      
      if (_progText) {
         t.textContent = (p > 0 && p < 100) ? `[${p}%] ${_progText}` : _progText;
      }
      
      _progAnim = requestAnimationFrame(step);
    }
    _progAnim = requestAnimationFrame(step);
  }

  function openTray(name) {
    closeTray();
    if (!name) return;
    activeTray = name;
    const el = $('c5-tray-' + name);
    if (el) el.classList.add('c5-open');
    const tglId = name === 'add' ? 'c5-tgl-add' : 'c5-tgl-del';
    const btn = $(tglId);
    if (btn) {
      btn.classList.remove('c5-btn-ghost');
      btn.classList.add('c5-btn-active-tgl');
    }
  }

  function closeTray() {
    ['add','del'].forEach(n => {
      const el = $('c5-tray-' + n);
      if (el) el.classList.remove('c5-open');
    });
    ['c5-tgl-add','c5-tgl-del'].forEach(id => {
      const b = $(id);
      if (b) { b.classList.remove('c5-btn-active-tgl'); b.classList.add('c5-btn-ghost'); }
    });
    activeTray = null;
  }

  function updateBadge() {
    if (!scrapedData) return;
    const total = Object.values(scrapedData.courses).reduce((s,a) => s+a.length, 0);
    const n     = Object.keys(scrapedData.courses).length;
    $('c5-rbadge').textContent = `✓ ${total} lớp · ${n} môn`;
  }

  // ==========================================================================
  // EVENTS
  // ==========================================================================

  function bindEvents() {
    // logo link
    const lnk = $('c5-author-link');
    if (lnk) lnk.addEventListener('click', e => {
      e.stopPropagation();
      window.open(AUTHOR_URL, '_blank', 'noopener');
    });

    // year normalise
    $('c5-year').addEventListener('blur', () => {
      const v = $('c5-year').value.trim();
      if (/^\d{2}-\d{2}$/.test(v)) {
        const [a,b] = v.split('-');
        $('c5-year').value = `20${a}-20${b}`;
      }
    });

    $('c5-go').addEventListener('click', handleStart);
    $('c5-dl').addEventListener('click', handleDownload);
    $('c5-reset').addEventListener('click', handleReset);
    $('c5-retry').addEventListener('click', handleReset);
    $('c5-reload').addEventListener('click', () => location.reload());

    $('c5-tgl-add').addEventListener('click', () => {
      activeTray === 'add' ? closeTray() : openTray('add');
    });
    $('c5-tgl-del').addEventListener('click', () => {
      activeTray === 'del' ? closeTray() : (buildPills(), openTray('del'));
    });

    $('c5-add-go').addEventListener('click', handleAddCourses);
    $('c5-add-cancel').addEventListener('click', closeTray);
    $('c5-add-inp').addEventListener('keydown', e => { if (e.key==='Enter') handleAddCourses(); });
    $('c5-del-done').addEventListener('click', () => { closeTray(); updateBadge(); });
  }

  // ==========================================================================
  // STORAGE
  // ==========================================================================

  function saveCfg(c) { try { chrome.storage.local.set({ ctuV5: c }); } catch(e){} }
  function loadCfg(cb) {
    try { chrome.storage.local.get(['ctuV5'], r => r && r.ctuV5 && cb(r.ctuV5)); }
    catch(e){}
  }

  // ==========================================================================
  // PAGE READY
  // ==========================================================================

  function pageReady() {
    return !!(document.querySelector(SEL.YEAR) &&
              document.querySelector(SEL.SEM)  &&
              document.querySelector(SEL.CODE));
  }
  async function waitPageReady(tries=20, ms=700) {
    for (let i=0; i<tries; i++) { if (pageReady()) return true; await wait(ms); }
    return false;
  }

  // ==========================================================================
  // INIT
  // ==========================================================================

  async function initPanel() {
    panelReady = false; scrapedData = null; closeTray();
    showState('checking');
    loaderIndeterminate();

    const ok = await waitPageReady();
    loaderHide();

    if (ok) {
      loadCfg(c => {
        $('c5-year').value  = c.year  || '';
        $('c5-sem').value   = c.sem   || '';
        $('c5-codes').value = c.codes || '';
      });
      showState('form');
      panelReady = true;
    } else {
      $('c5-etxt').textContent = 'Trang chưa sẵn sàng — hãy thử tải lại (F5)';
      showState('error');
    }
  }

  // ==========================================================================
  // FORM SUBMIT
  // ==========================================================================

  function parseCodes(raw) { return [...new Set(raw.split(',').map(c=>c.trim().toUpperCase()).filter(Boolean))]; }
  function validCode(c)    { return /^[A-Z]{2}\d{3}E?$/.test(c); }

  async function handleStart() {
    const year = $('c5-year').value.trim();
    const sem  = $('c5-sem').value;
    const raw  = $('c5-codes').value.trim();

    if (!year || !/^(\d{4}-\d{4})|(\d{2}-\d{2})$/.test(year)) {
      alert('Năm học không hợp lệ — định dạng: YYYY-YYYY hoặc YY-YY'); return;
    }
    if (!sem)  { alert('Vui lòng chọn học kỳ'); return; }
    if (!raw)  { alert('Vui lòng nhập ít nhất một mã học phần'); return; }

    const list = parseCodes(raw);
    const bad  = list.filter(c => !validCode(c));
    if (bad.length) {
      alert(`Mã không hợp lệ: ${bad.join(', ')}\nĐịnh dạng: 2 chữ cái + 3 chữ số (VD: CT123)`); return;
    }

    const normYear = /^\d{2}-\d{2}$/.test(year)
      ? `20${year.split('-')[0]}-20${year.split('-')[1]}` : year;

    saveCfg({ year, sem, codes: raw });
    await runScraping(normYear, sem, list, false);
  }

  function handleReset() {
    scrapedData = null; panelReady = false; closeTray(); initPanel();
  }

  // ==========================================================================
  // ADD COURSES
  // ==========================================================================

  async function handleAddCourses() {
    if (!scrapedData) return;
    const raw  = $('c5-add-inp').value.trim();
    if (!raw) { alert('Nhập mã học phần để thêm'); return; }

    const list = parseCodes(raw);
    const bad  = list.filter(c => !validCode(c));
    if (bad.length) { alert(`Mã không hợp lệ: ${bad.join(', ')}`); return; }

    const toAdd = list.filter(c => !scrapedData.courses[c]);
    const exist = list.filter(c => scrapedData.courses[c]);

    if (!toAdd.length) { 
      alert('Tất cả các học phần này đã có trong danh sách!'); 
      return; 
    }
    
    if (exist.length > 0) {
      if (!confirm(`Các môn sau đã có trong danh sách và sẽ bị bỏ qua: ${exist.join(', ')}.\nBạn có muốn tiếp tục quét các môn mới còn lại không?`)) {
        return;
      }
    }

    closeTray();
    showState('progress');
    setProg(0, 'Đang chuẩn bị thêm môn mới...');

    await fillYearSem(scrapedData.year, scrapedData.sem);

    for (let i=0; i<toAdd.length; i++) {
      const code = toAdd[i];
      setProg(Math.round((i/toAdd.length)*95), `Đang thêm ${code} (${i+1}/${toAdd.length})...`);
      const data = await scrapeCourse(code);
      if (data && data.length) scrapedData.courses[code] = data;
      await wait(400);
    }

    $('c5-add-inp').value = '';
    loaderSet(100);
    updateBadge();
    showState('result');
    setTimeout(loaderHide, 600);
  }

  // ==========================================================================
  // REMOVE COURSES — pills
  // ==========================================================================

  function buildPills() {
    if (!scrapedData) return;
    const list = $('c5-pills');
    list.innerHTML = '';
    for (const code of Object.keys(scrapedData.courses)) {
      const p = document.createElement('span');
      p.className = 'c5-pill';
      p.innerHTML = `${code}<button class="c5-pill-x" data-code="${code}">✕</button>`;
      list.appendChild(p);
    }
    list.querySelectorAll('.c5-pill-x').forEach(btn => {
      btn.addEventListener('click', () => {
        delete scrapedData.courses[btn.dataset.code];
        btn.closest('.c5-pill').remove();
        if (!Object.keys(scrapedData.courses).length) {
          closeTray(); scrapedData = null; showState('form');
        }
      });
    });
  }

  // ==========================================================================
  // DOWNLOAD EXCEL
  // ==========================================================================

  function handleDownload() {
    if (!scrapedData) { alert('Không có dữ liệu!'); return; }
    const allRows = Object.values(scrapedData.courses).flat();
    if (!allRows.length) { alert('Không có dữ liệu!'); return; }
    try {
      const wb = XLSX.utils.book_new();
      const autoCol = rows => Object.keys(rows[0]).map(h => ({
        wch: Math.min(rows.reduce((m,r) => Math.max(m, String(r[h]||'').length), h.length)+2, 42)
      }));

      const ws = XLSX.utils.json_to_sheet(allRows);
      ws['!cols'] = autoCol(allRows);
      XLSX.utils.book_append_sheet(wb, ws, 'Tất cả môn học');

      for (const [code, rows] of Object.entries(scrapedData.courses)) {
        if (!rows.length) continue;
        const w2 = XLSX.utils.json_to_sheet(rows);
        w2['!cols'] = autoCol(rows);
        XLSX.utils.book_append_sheet(wb, w2, code.slice(0,31));
      }

      const ts = new Date().toISOString().replace(/[:.]/g,'-').slice(0,-5);
      XLSX.writeFile(wb, `CTU_${scrapedData.year}_HK${scrapedData.sem}_${ts}.xlsx`);
    } catch(e) {
      alert('Lỗi xuất Excel: ' + e.message);
    }
  }

  // ==========================================================================
  // SCRAPING FLOW
  // ==========================================================================

  async function runScraping(year, sem, list) {
    showState('progress');
    setProg(0, 'Bắt đầu...');

    try {
      setProg(8, 'Đang chọn năm học & học kỳ...');
      if (!await fillYearSem(year, sem))
        throw new Error('Không thể chọn năm học / học kỳ');

      const courses = {};
      for (let i=0; i<list.length; i++) {
        const code = list[i];
        const pct  = 12 + Math.round((i/list.length)*84);
        setProg(pct, `Đang lấy dữ liệu ${code} (${i+1} / ${list.length})`);
        const data = await scrapeCourse(code);
        if (data && data.length) courses[code] = data;
        await wait(400);
      }

      const total = Object.values(courses).reduce((s,a) => s+a.length, 0);
      if (!total) throw new Error('Không tìm thấy dữ liệu — kiểm tra lại năm học, học kỳ và mã môn');

      scrapedData = { year, sem, courses };
      loaderSet(100);
      updateBadge();
      showState('result');
      setTimeout(loaderHide, 800);

    } catch(err) {
      loaderHide();
      $('c5-etxt').textContent = err.message;
      showState('error');
    }
  }

  // ==========================================================================
  // FILL HELPERS
  // ==========================================================================

  async function fillYearSem(year, sem) {
    try {
      const yw = document.querySelector(SEL.YEAR);
      if (yw) { yw.click(); await wait(W.DROP); }
      await pickDrop(year); await wait(W.INP);

      const sw = document.querySelector(SEL.SEM);
      if (sw) { sw.click(); await wait(W.DROP); }
      await pickDrop(sem); await wait(W.INP);
      return true;
    } catch(e) { return false; }
  }

  async function pickDrop(val) {
    await wait(W.DROP);
    for (const o of document.querySelectorAll(SEL.DOPT)) {
      const t = o.textContent.trim();
      if (t === val || t.includes(val)) { o.click(); await wait(W.DROP); return true; }
    }
    return false;
  }

  async function typeInto(sel, val) {
    const inp = document.querySelector(sel);
    if (!inp) throw new Error('Không tìm thấy ô nhập liệu: ' + sel);
    inp.focus(); inp.value = '';
    ['input','change'].forEach(ev => inp.dispatchEvent(new Event(ev,{bubbles:true})));
    await wait(100);
    for (const ch of val) {
      inp.value += ch;
      inp.dispatchEvent(new Event('input',{bubbles:true}));
      await wait(50);
    }
    ['change','blur'].forEach(ev => inp.dispatchEvent(new Event(ev,{bubbles:true})));
    await wait(W.INP);
  }

  // ==========================================================================
  // SCRAPE COURSE
  // ==========================================================================

  async function scrapeCourse(code) {
    try {
      const inp = document.querySelector(SEL.CODE);
      if (inp) { inp.click(); await wait(200); inp.focus(); inp.select(); document.execCommand('delete'); await wait(200); }
      await typeInto(SEL.CODE, code);
      const btn = document.querySelector(SEL.SBTN);
      if (btn) btn.click();
      await wait(W.SEARCH);

      const name = getCourseName();
      let all = [];
      while (true) {
        const raw = scrapeTable();
        if (!raw.length) break;
        all.push(...toStructured(normalizeRows(raw), code, name));
        const nx = document.querySelector(SEL.NEXT);
        if (!nx) break;
        nx.click(); await wait(W.PAGE);
      }
      return all.filter(d =>
        d['Thứ'] && d['Thứ']!=='N/A' && d['Thứ']!=='' &&
        d['Tiết học'] && d['Tiết học']!=='N/A' && d['Tiết học']!=='');
    } catch(e) { console.error('[CTU5]', e); return null; }
  }

  function getCourseName() {
    for (const el of document.querySelectorAll('p')) {
      if (el.textContent.includes('Danh mục học phần:')) {
        const r = el.textContent.replace('Danh mục học phần:','').trim();
        return r.includes('(Mã:') ? r.split('(Mã:')[0].trim() : r.replace(/\s*\([^()]*\)/g,'').trim();
      }
    }
    return 'N/A';
  }

  function scrapeTable() {
    return Array.from(document.querySelectorAll(SEL.ROWS))
      .map(r => Array.from(r.querySelectorAll('td')).map(c => c.textContent.trim()))
      .filter(r => r.length);
  }
  function normalizeRows(rows) { return rows.map(r => r.length===25 ? ['','', ...r] : r); }
  function toStructured(rows, code, name) {
    const out=[]; let prev='';
    for (const r of rows) {
      if (!r.length) continue;
      if (r[0]&&r[0].trim()) prev=r[0].trim();
      const get = i => r.length>i ? r[i] : 'N/A';
      const s=get(4), sc=get(5);
      out.push({
        'Mã học phần': code, 'Tên học phần': name, 'Nhóm': prev,
        'Thứ': get(2), 'Tiết học': get(6).replace(/-/g,''),
        'Phòng': get(7),
        'Sĩ số': (sc!=='N/A'&&s!=='N/A') ? `${sc}/${s}` : 'N/A',
        'Giảng viên': r[r.length-1]||'N/A'
      });
    }
    return out;
  }

  // ==========================================================================
  // INJECT / REMOVE
  // ==========================================================================

  function injectPanel() {
    if (!isTarget() || document.getElementById(PANEL_ID)) return;
    if (!document.body) { document.addEventListener('DOMContentLoaded', injectPanel); return; }
    injectStyles();
    const panel = buildPanel();
    document.body.insertBefore(panel, document.body.firstChild);
    bindEvents();
    initPanel();
  }

  function removePanel() {
    const p = document.getElementById(PANEL_ID);
    if (p) p.remove();
    panelReady=false; scrapedData=null; activeTray=null;
  }

  // Boot
  if (document.readyState==='loading') {
    document.addEventListener('DOMContentLoaded', () => { if (isTarget()) injectPanel(); });
  } else {
    if (isTarget()) injectPanel();
  }

  console.log('[CTU Exporter by Huaniverse] script loaded');
})();
