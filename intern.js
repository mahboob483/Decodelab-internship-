/* ══════════════════════════════════════════════════════
   CMS – Complaint Management System  |  script.js
   ══════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────
   INJECT ALL STYLES  (runs immediately, before DOM)
───────────────────────────────────────────────────── */
(function injectStyles() {
  const style = document.createElement('style');
  style.id = 'cms-dynamic-styles';
  style.textContent = `

    /* ══════════════════════════════════════════
       TOAST
    ══════════════════════════════════════════ */
    .cms-toast {
      position: fixed;
      bottom: 2rem; right: 2rem;
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: .8rem;
      padding: 1rem 1.4rem;
      border-radius: 14px;
      font-family: 'DM Sans', sans-serif;
      font-size: .92rem;
      font-weight: 500;
      max-width: 400px;
      min-width: 260px;
      box-shadow: 0 16px 48px rgba(0,0,0,.35);
      transform: translateY(130%);
      opacity: 0;
      transition: transform .4s cubic-bezier(.34,1.46,.64,1), opacity .3s ease;
    }
    .cms-toast.toast-show { transform: translateY(0); opacity: 1; }
    .toast-success {
      background: #0a1f3a;
      color: #e8f4ff !important;
      border: 1.5px solid rgba(0,201,167,.55);
    }
    .toast-error {
      background: #1c0a0a;
      color: #ffe8e8 !important;
      border: 1.5px solid rgba(255,80,80,.55);
    }
    .toast-msg { flex:1; line-height:1.45; color:inherit !important; }
    .toast-icon { font-size:1.1rem; flex-shrink:0; }
    .toast-close {
      background:none; border:none; cursor:pointer;
      font-size:.9rem; color:rgba(255,255,255,.45);
      padding:.15rem .3rem; border-radius:4px;
      transition:color .2s, background .2s; flex-shrink:0;
    }
    .toast-close:hover { color:#fff; background:rgba(255,255,255,.1); }
    @media(max-width:500px){
      .cms-toast { left:1rem; right:1rem; bottom:1rem; max-width:none; }
    }


    /* ══════════════════════════════════════════
       FIELD VALIDATION
    ══════════════════════════════════════════ */
    .field-error {
      border-color: #e53e3e !important;
      box-shadow: 0 0 0 3px rgba(229,62,62,.2) !important;
    }
    .field-error-msg {
      display: flex; align-items: center; gap:.3rem;
      font-size:.78rem; color:#e53e3e;
      margin-top:.3rem;
      font-family:'DM Sans',sans-serif; font-weight:500;
    }
    .field-error-msg::before { content:'⚠'; font-size:.7rem; }


    /* ══════════════════════════════════════════
       BUTTON STATES
    ══════════════════════════════════════════ */
    .btn-loading {
      opacity:.65 !important;
      cursor:not-allowed !important;
      pointer-events:none !important;
    }
    @keyframes ripple-anim { to { transform:scale(3); opacity:0; } }


    /* ══════════════════════════════════════════
       COMPLAINT SUCCESS CARD
    ══════════════════════════════════════════ */
    .complaint-success {
      background: linear-gradient(145deg,#0a1628,#0f2a4a);
      border: 1.5px solid rgba(0,201,167,.4);
      border-radius: 16px;
      padding: 2.5rem 2rem;
      text-align: center;
      animation: fadeSlideUp .45s cubic-bezier(.34,1.2,.64,1);
    }
    @keyframes fadeSlideUp {
      from { opacity:0; transform:translateY(18px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .success-confetti { font-size:2.8rem; margin-bottom:.75rem; display:block; }
    .complaint-success h4 {
      font-family:'Sora',sans-serif; font-size:1.25rem;
      font-weight:800; color:#ffffff !important; margin-bottom:.6rem;
    }
    .complaint-success .success-body {
      font-size:.9rem; color:rgba(200,220,255,.75) !important;
      line-height:1.6; margin-bottom:1.25rem;
    }
    .complaint-success .success-body strong { color:#90c2ff !important; }
    .complaint-success .success-body em     { font-style:normal; color:#00c9a7 !important; }
    .ticket-chip {
      display:inline-flex; align-items:center; gap:.5rem;
      background:rgba(0,201,167,.12);
      border:1.5px solid rgba(0,201,167,.45);
      color:#00c9a7 !important;
      font-family:'Sora',sans-serif; font-weight:700;
      font-size:1rem; padding:.55rem 1.4rem;
      border-radius:30px; letter-spacing:.04em;
    }
    .ticket-chip::before { content:'🎫'; font-size:.85rem; }
    .btn-new-complaint {
      display:inline-block; margin-top:1.5rem;
      padding:.7rem 1.75rem;
      background:rgba(26,110,245,.18);
      border:1.5px solid rgba(26,110,245,.45);
      color:#90c2ff !important;
      border-radius:30px;
      font-family:'Sora',sans-serif; font-size:.85rem; font-weight:700;
      cursor:pointer;
      transition:background .25s, border-color .25s;
    }
    .btn-new-complaint:hover {
      background:rgba(26,110,245,.32);
      border-color:rgba(26,110,245,.7);
    }


    /* ══════════════════════════════════════════
       TRACK RESULT
    ══════════════════════════════════════════ */
    .track-result { margin-top:1.5rem; animation:fadeSlideUp .4s ease; }
    .track-ticket-info {
      background:rgba(255,255,255,.08);
      border:1px solid rgba(255,255,255,.15);
      border-radius:10px;
      padding:1rem 1.3rem; margin-bottom:1.1rem;
      display:flex; justify-content:space-between;
      align-items:center; flex-wrap:wrap; gap:.5rem;
    }
    .track-ticket-id {
      font-family:'Sora',sans-serif; font-weight:800;
      color:#90c2ff !important; font-size:.95rem; letter-spacing:.04em;
    }
    .track-ticket-meta { font-size:.82rem; color:rgba(200,220,255,.55) !important; }
    .track-not-found {
      text-align:center; padding:1.75rem 1rem;
      color:rgba(200,220,255,.6) !important;
      font-size:.9rem; line-height:1.6;
      animation:fadeSlideUp .4s ease;
    }
    .track-not-found .nf-icon { font-size:2.2rem; display:block; margin-bottom:.6rem; }
    .track-not-found strong { color:#90c2ff !important; }
    .track-not-found small  { color:rgba(200,220,255,.4) !important; }


    /* ══════════════════════════════════════════
       DARK MODE TOGGLE BUTTON
    ══════════════════════════════════════════ */
    .dark-toggle {
      background:transparent;
      border:1.5px solid #dce6f7;
      border-radius:30px;
      padding:.42rem 1rem;
      cursor:pointer;
      font-size:.83rem;
      font-family:'Sora',sans-serif; font-weight:600;
      color:#4a5568;
      display:inline-flex; align-items:center; gap:.4rem;
      transition:all .25s ease;
      white-space:nowrap; line-height:1;
    }
    .dark-toggle:hover {
      background:#e8f1ff; border-color:#1a6ef5; color:#1a6ef5;
    }


    /* ══════════════════════════════════════════
       HAMBURGER
    ══════════════════════════════════════════ */
    .hamburger {
      display:none;
      background:transparent;
      border:1.5px solid #dce6f7;
      border-radius:8px;
      width:42px; height:42px;
      cursor:pointer;
      flex-direction:column;
      align-items:center; justify-content:center;
      gap:5px;
      transition:border-color .2s, background .2s;
      flex-shrink:0;
    }
    .hamburger span {
      display:block; width:19px; height:2px;
      background:#4a5568; border-radius:2px;
      transition:transform .3s ease, opacity .25s ease;
    }
    .hamburger:hover { border-color:#1a6ef5; background:#e8f1ff; }
    .hamburger:hover span { background:#1a6ef5; }
    .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
    .hamburger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
    .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
    @media(max-width:768px){ .hamburger { display:flex; } }


    /* ══════════════════════════════════════════
       SCROLL REVEAL
    ══════════════════════════════════════════ */
    .reveal-hidden {
      opacity:0; transform:translateY(22px);
      transition:opacity .55s ease, transform .55s ease;
    }
    .reveal-visible { opacity:1; transform:translateY(0); }


    /* ══════════════════════════════════════════
       ██████████  DARK MODE  ██████████
       Every element with explicit hard colours —
       no relying on CSS variable cascade
    ══════════════════════════════════════════ */

    /* ── Base body ── */
    body.dark-mode {
      background: #0b1623 !important;
      color: #c8ddf5 !important;
    }

    /* ── Nav ── */
    body.dark-mode .nav {
      background: rgba(9,18,32,.97) !important;
      border-bottom: 1px solid #182d47 !important;
    }
    body.dark-mode .nav-logo       { color: #1a6ef5 !important; }
    body.dark-mode .nav-links a    { color: #8ab0d8 !important; }
    body.dark-mode .nav-links a:hover {
      background: #0d2040 !important; color: #90c2ff !important;
    }
    body.dark-mode .nav-links .nav-cta {
      background: #1a6ef5 !important; color: #fff !important;
    }
    body.dark-mode .nav-links .nav-cta:hover { background: #3b8bff !important; }
    body.dark-mode .dark-toggle {
      border-color: #1e3a58 !important; color: #90c2ff !important;
      background: rgba(26,110,245,.08) !important;
    }
    body.dark-mode .dark-toggle:hover {
      background: rgba(26,110,245,.2) !important;
      border-color: #3b8bff !important; color: #c8dfff !important;
    }
    body.dark-mode .hamburger { border-color: #1e3a58 !important; }
    body.dark-mode .hamburger span { background: #90c2ff !important; }

    /* ── Mobile nav open ── */
    @media(max-width:768px){
      .nav-links.open {
        display:flex !important; flex-direction:column;
        position:absolute; top:100%; left:0; right:0;
        padding:1rem; align-items:stretch; z-index:998;
        box-shadow:0 8px 24px rgba(0,0,0,.12);
        background:#ffffff; border-bottom:1px solid #dce6f7;
      }
      .nav-links.open a { padding:.75rem 1rem; border-radius:8px; color:#2d3748; }
      .nav-links.open a:hover { background:#e8f1ff; color:#1a6ef5; }
      .nav-links.open .nav-cta {
        text-align:center; background:#1a6ef5 !important;
        color:#fff !important; margin:.25rem 0 0;
      }
      body.dark-mode .nav-links.open {
        background:#0c1a2d !important;
        border-bottom:1px solid #182d47 !important;
        box-shadow:0 8px 32px rgba(0,0,0,.5) !important;
      }
      body.dark-mode .nav-links.open a { color:#8ab0d8 !important; }
      body.dark-mode .nav-links.open a:hover {
        background:#0d2040 !important; color:#90c2ff !important;
      }
    }

    /* ── Section labels ── */
    body.dark-mode .section-label {
      background: rgba(26,110,245,.18) !important;
      color: #90c2ff !important;
    }

    /* ── Section headings & sub ── */
    body.dark-mode .section-title {
      color: #d8eaff !important;
    }
    body.dark-mode .section-sub {
      color: #6b8aa8 !important;
    }

    /* ── Hero (already dark, leave gradient but fix text just in case) ── */
    body.dark-mode .hero { background: linear-gradient(135deg,#070f1c,#0a1e38,#091a35) !important; }
    body.dark-mode .hero h1 { color: #ffffff !important; }
    body.dark-mode .hero p  { color: #7a9ec4 !important; }
    body.dark-mode .hero-card { background:rgba(255,255,255,.05) !important; border-color:rgba(255,255,255,.1) !important; }
    body.dark-mode .hero-card-label { color:rgba(255,255,255,.45) !important; }
    body.dark-mode .hero-card-title { color:#ffffff !important; }
    body.dark-mode .hero-card-sub   { color:rgba(255,255,255,.4) !important; }
    body.dark-mode .stat-box { background:rgba(255,255,255,.05) !important; border-color:rgba(255,255,255,.08) !important; }
    body.dark-mode .stat-num { color:#ffffff !important; }
    body.dark-mode .stat-lbl { color:rgba(255,255,255,.4) !important; }
    body.dark-mode .hero-badge { color:#7ab8f5 !important; }

    /* ── Submit section ── */
    body.dark-mode .submit-section { background: #0c1a2d !important; }
    body.dark-mode .submit-info .section-title { color: #d8eaff !important; }
    body.dark-mode .submit-info .section-sub   { color: #6b8aa8 !important; }
    body.dark-mode .why-item .why-icon { background: rgba(26,110,245,.15) !important; }
    body.dark-mode .why-text strong { color: #d8eaff !important; }
    body.dark-mode .why-text span   { color: #6b8aa8 !important; }

    /* Form card */
    body.dark-mode .form-card {
      background: #0d1c2e !important;
      border-color: #182d47 !important;
      box-shadow: 0 4px 28px rgba(0,0,0,.5) !important;
    }
    body.dark-mode .form-card h3 { color: #d8eaff !important; }

    /* Labels */
    body.dark-mode .form-group label { color: #8ab0d8 !important; }

    /* All inputs, selects, textareas */
    body.dark-mode .form-group input,
    body.dark-mode .form-group select,
    body.dark-mode .form-group textarea {
      background: #091525 !important;
      color: #c8ddf5 !important;
      border-color: #182d47 !important;
    }
    body.dark-mode .form-group input::placeholder,
    body.dark-mode .form-group textarea::placeholder {
      color: #324d66 !important;
    }
    body.dark-mode .form-group select option {
      background: #091525 !important;
      color: #c8ddf5 !important;
    }
    body.dark-mode .form-group input:focus,
    body.dark-mode .form-group select:focus,
    body.dark-mode .form-group textarea:focus {
      border-color: #1a6ef5 !important;
      background: #0d1f38 !important;
      color: #e0eeff !important;
      box-shadow: 0 0 0 3px rgba(26,110,245,.22) !important;
    }

    /* ── Categories section ── */
    body.dark-mode .categories { background: #0b1623 !important; }
    body.dark-mode .categories-header .section-title { color: #d8eaff !important; }
    body.dark-mode .categories-header .section-sub   { color: #6b8aa8 !important; }
    body.dark-mode .cat-card {
      background: #0e1d30 !important;
      border-color: #182d47 !important;
    }
    body.dark-mode .cat-card:hover { border-color: #1a6ef5 !important; }
    body.dark-mode .cat-card h4 { color: #d8eaff !important; }
    body.dark-mode .cat-card p  { color: #5e7d99 !important; }
    body.dark-mode .cat-card:nth-child(1) .cat-icon { background:rgba(255,165,0,.12) !important; }
    body.dark-mode .cat-card:nth-child(2) .cat-icon { background:rgba(0,200,100,.1)  !important; }
    body.dark-mode .cat-card:nth-child(3) .cat-icon { background:rgba(255,80,100,.1) !important; }
    body.dark-mode .cat-card:nth-child(4) .cat-icon { background:rgba(26,110,245,.12)!important; }
    body.dark-mode .cat-card:nth-child(5) .cat-icon { background:rgba(150,80,245,.1) !important; }
    body.dark-mode .cat-card:nth-child(6) .cat-icon { background:rgba(0,200,210,.1)  !important; }

    /* ── Track section (already dark gradient, just ensure text) ── */
    body.dark-mode .track-section { background:linear-gradient(135deg,#070f1c,#091a35) !important; }
    body.dark-mode .track-text .section-title { color: #d8eaff !important; }
    body.dark-mode .track-text .section-sub   { color: #7a9ec4 !important; }
    body.dark-mode .track-box {
      background: rgba(255,255,255,.06) !important;
      border-color: rgba(255,255,255,.12) !important;
    }
    body.dark-mode .track-box h3 { color: #d8eaff !important; }
    body.dark-mode .track-input-row input {
      background: rgba(255,255,255,.06) !important;
      color: #d8eaff !important;
      border-color: rgba(255,255,255,.18) !important;
    }
    body.dark-mode .track-input-row input::placeholder { color: rgba(200,220,255,.3) !important; }
    body.dark-mode .track-input-row input:focus {
      border-color: #1a6ef5 !important;
      background: rgba(26,110,245,.12) !important;
    }
    body.dark-mode .status-row { background:rgba(255,255,255,.04) !important; border-color:rgba(255,255,255,.07) !important; }
    body.dark-mode .status-row.active { background:rgba(26,110,245,.18) !important; border-color:rgba(26,110,245,.38) !important; }
    body.dark-mode .status-desc       { color:rgba(200,220,255,.6) !important; }
    body.dark-mode .status-desc strong{ color:#d8eaff !important; }

    /* ── About section ── */
    body.dark-mode .about-section { background: #0c1a2d !important; }
    body.dark-mode .about-content .section-title { color: #d8eaff !important; }
    body.dark-mode .about-content > p { color: #6b8aa8 !important; }
    body.dark-mode .about-bg-card {
      background: #0d1c2e !important;
      border-color: #182d47 !important;
    }
    body.dark-mode .about-icon-row > div:last-child > div:first-child { color: #d8eaff !important; }
    body.dark-mode .about-icon-row > div:last-child > div:last-child  { color: #6b8aa8 !important; }
    body.dark-mode .metric-val { color: #1a6ef5 !important; }
    body.dark-mode .metric-lbl { color: #6b8aa8 !important; }
    body.dark-mode .point-icon { background: rgba(26,110,245,.15) !important; }
    body.dark-mode .point-text h5 { color: #d8eaff !important; }
    body.dark-mode .point-text p  { color: #6b8aa8 !important; }
    body.dark-mode .about-floating { background: #091525 !important; color: #d8eaff !important; }

    /* ── Contact section ── */
    body.dark-mode .contact-section { background: #0b1623 !important; }
    body.dark-mode .contact-header .section-title { color: #d8eaff !important; }
    body.dark-mode .contact-header .section-sub   { color: #6b8aa8 !important; }
    body.dark-mode .contact-card {
      background: #0e1d30 !important;
      border-color: #182d47 !important;
    }
    body.dark-mode .contact-card:hover { border-color: #1a6ef5 !important; }
    body.dark-mode .contact-card h5 { color: #5e7d99 !important; }
    body.dark-mode .contact-card p  { color: #d8eaff !important; }
    body.dark-mode .contact-card-icon { background: rgba(26,110,245,.15) !important; }
    body.dark-mode .contact-form-card {
      background: #0d1c2e !important;
      border-color: #182d47 !important;
    }
    body.dark-mode .contact-form-card h3 { color: #d8eaff !important; }

    /* ── Footer (already dark, minor tweaks) ── */
    body.dark-mode .footer { background: #060e18 !important; }
    body.dark-mode .footer-brand p { color: rgba(200,220,255,.5) !important; }
    body.dark-mode .footer-col h4  { color: #c8ddf5 !important; }
    body.dark-mode .footer-col ul a { color: rgba(200,220,255,.45) !important; }
    body.dark-mode .footer-col ul a:hover { color: #c8ddf5 !important; }
    body.dark-mode .footer-bottom { border-top-color: rgba(255,255,255,.08) !important; color: rgba(200,220,255,.4) !important; }
    body.dark-mode .footer-bottom-links a { color: rgba(200,220,255,.35) !important; }
    body.dark-mode .footer-bottom-links a:hover { color: #c8ddf5 !important; }
  `;
  document.head.appendChild(style);
})();


/* ─────────────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────────────── */
function generateTicketID() {
  return 'CMS-' + Math.floor(1000 + Math.random() * 9000);
}
function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
}
function escapeHTML(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function setFieldError(input, msg) {
  clearFieldError(input);
  input.classList.add('field-error');
  const span = document.createElement('span');
  span.className = 'field-error-msg';
  span.textContent = msg;
  input.parentElement.appendChild(span);
}
function clearFieldError(input) {
  input.classList.remove('field-error');
  input.parentElement.querySelector('.field-error-msg')?.remove();
}


/* ─────────────────────────────────────────────────────
   TOAST
───────────────────────────────────────────────────── */
function showToast(message, type = 'success') {
  document.getElementById('cms-toast')?.remove();
  const t = document.createElement('div');
  t.id = 'cms-toast';
  t.className = `cms-toast toast-${type}`;
  t.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" aria-label="Close">✕</button>
  `;
  document.body.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('toast-show')));
  const timer = setTimeout(() => dismissToast(t), 5500);
  t.querySelector('.toast-close').addEventListener('click', () => {
    clearTimeout(timer); dismissToast(t);
  });
}
function dismissToast(t) {
  t.classList.remove('toast-show');
  t.addEventListener('transitionend', () => t?.remove(), { once: true });
}


/* ─────────────────────────────────────────────────────
   1. MOBILE MENU
───────────────────────────────────────────────────── */
function initMobileMenu() {
  const nav   = document.getElementById('navLinks');
  const inner = document.querySelector('.nav-inner');
  if (!nav || !inner) return;

  const btn = document.createElement('button');
  btn.className = 'hamburger';
  btn.setAttribute('aria-label', 'Toggle menu');
  btn.innerHTML = '<span></span><span></span><span></span>';
  inner.appendChild(btn);

  const close = () => {
    nav.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = nav.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', e => { if (!inner.contains(e.target)) close(); });
}


/* ─────────────────────────────────────────────────────
   2. DARK MODE
───────────────────────────────────────────────────── */
function initDarkMode() {
  const navLinks = document.getElementById('navLinks');
  if (!navLinks) return;

  const saved   = localStorage.getItem('cms-theme');
  const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let dark = saved ? saved === 'dark' : sysDark;

  const btn = document.createElement('button');
  btn.className = 'dark-toggle';
  btn.setAttribute('aria-label', 'Toggle theme');

  const li = document.createElement('li');
  li.appendChild(btn);
  const cta = navLinks.querySelector('.nav-cta')?.parentElement;
  cta ? navLinks.insertBefore(li, cta) : navLinks.appendChild(li);

  function apply() {
    document.body.classList.toggle('dark-mode', dark);
    btn.innerHTML = dark ? '☀️ Light' : '🌙 Dark';
    localStorage.setItem('cms-theme', dark ? 'dark' : 'light');
  }
  apply();

  btn.addEventListener('click', () => {
    dark = !dark;
    document.body.style.transition = 'background .3s ease, color .3s ease';
    apply();
    setTimeout(() => document.body.style.transition = '', 350);
  });
}


/* ─────────────────────────────────────────────────────
   3. COMPLAINT FORM
───────────────────────────────────────────────────── */
function initComplaintForm() {
  const btn  = document.querySelector('.form-submit');
  const card = document.querySelector('.form-card');
  if (!btn || !card) return;

  ['fname','femail','fcat','fdesc'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input',  () => clearFieldError(el));
      el.addEventListener('change', () => clearFieldError(el));
    }
  });

  btn.addEventListener('click', () => {
    const f = {
      name:  document.getElementById('fname'),
      email: document.getElementById('femail'),
      cat:   document.getElementById('fcat'),
      desc:  document.getElementById('fdesc'),
    };
    Object.values(f).forEach(clearFieldError);

    let ok = true, first = null;
    const fail = (el, msg) => {
      setFieldError(el, msg);
      if (!first) first = el;
      ok = false;
    };

    if (!f.name.value.trim())                          fail(f.name,  'Full name is required');
    if (!f.email.value.trim())                         fail(f.email, 'Email address is required');
    else if (!isValidEmail(f.email.value))             fail(f.email, 'Enter a valid email (name@example.com)');
    if (!f.cat.value)                                  fail(f.cat,   'Please select a category');
    if (f.desc.value.trim().length < 10)               fail(f.desc,  'Please describe your complaint (at least 10 characters)');

    if (!ok) { showToast('Please fix the highlighted fields.', 'error'); first?.focus(); return; }

    const orig = btn.textContent;
    btn.classList.add('btn-loading');
    btn.textContent = 'Submitting…';

    setTimeout(() => {
      const id  = generateTicketID();
      const cat = f.cat.options[f.cat.selectedIndex].text;
      const nm  = f.name.value.trim();

      const stored = JSON.parse(sessionStorage.getItem('cms-tickets') || '{}');
      stored[id] = {
        name: nm, email: f.email.value.trim(), category: cat,
        description: f.desc.value.trim(),
        status: ['pending','in-progress','resolved'][Math.floor(Math.random()*3)],
        submitted: new Date().toLocaleString('en-PK', {
          day:'2-digit', month:'short', year:'numeric',
          hour:'2-digit', minute:'2-digit'
        })
      };
      sessionStorage.setItem('cms-tickets', JSON.stringify(stored));

      btn.classList.remove('btn-loading');
      btn.textContent = orig;

      card.innerHTML = `
        <div class="complaint-success">
          <span class="success-confetti">🎉</span>
          <h4>Complaint Submitted!</h4>
          <p class="success-body">
            Thank you, <strong>${escapeHTML(nm)}</strong>.<br>
            Your <em>${escapeHTML(cat)}</em> complaint is logged.
            Our team will respond within <strong style="color:#90c2ff">2 business hours</strong>.
          </p>
          <div class="ticket-chip">${id}</div><br>
          <button class="btn-new-complaint" id="btnNew">+ Submit Another</button>
        </div>
      `;
      showToast(`Submitted! Ticket: ${id}`);
      document.getElementById('btnNew')?.addEventListener('click', () => location.reload());
    }, 1400);
  });
}


/* ─────────────────────────────────────────────────────
   4. TRACK SYSTEM
───────────────────────────────────────────────────── */
function initTrackSystem() {
  const trackBtn   = document.querySelector('.track-input-row .btn');
  const trackInput = document.querySelector('.track-input-row input');
  const statuses   = document.querySelector('.statuses');
  if (!trackBtn || !trackInput || !statuses) return;

  const DEMO = {
    'CMS-1234': { name:'Ali Hassan',  category:'Billing Problem',  status:'resolved',    submitted:'15 May 2026, 09:15 AM' },
    'CMS-5678': { name:'Sara Khan',   category:'Technical Issue',  status:'in-progress', submitted:'18 May 2026, 11:30 AM' },
    'CMS-9999': { name:'Omar Farooq', category:'Delivery Issue',   status:'pending',     submitted:'20 May 2026, 02:00 PM' },
    'CMS-0001': { name:'Zara Malik',  category:'Account Issue',    status:'resolved',    submitted:'12 May 2026, 08:45 AM' },
    'CMS-8821': { name:'Ahmed Raza',  category:'Billing Problem',  status:'resolved',    submitted:'21 May 2026, 04:00 PM' },
    'CMS-9043': { name:'Hina Tariq', category:'Technical Issue',   status:'in-progress', submitted:'22 May 2026, 10:00 AM' },
  };
  const ORDER = ['pending','in-progress','resolved'];

  function lookup(id) {
    const s = JSON.parse(sessionStorage.getItem('cms-tickets') || '{}');
    return s[id] || DEMO[id] || null;
  }
  function normalize(raw) {
    return raw.toUpperCase().trim().replace(/^CMS[\s-]?(\d+)$/, 'CMS-$1');
  }
  function highlight(status) {
    const rows = document.querySelectorAll('.status-row');
    const idx  = ORDER.indexOf(status);
    rows.forEach((r, i) => r.classList.toggle('active', i <= idx));
  }
  function renderResult(ticket, id) {
    document.querySelector('.track-result')?.remove();
    const labels = { pending:'Pending', 'in-progress':'In Progress', resolved:'Resolved' };
    const div = document.createElement('div');
    div.className = 'track-result';
    div.innerHTML = `
      <div class="track-ticket-info">
        <span class="track-ticket-id"># ${escapeHTML(id)}</span>
        <span class="track-ticket-meta">${escapeHTML(ticket.category)} &middot; ${escapeHTML(ticket.submitted)}</span>
      </div>
    `;
    statuses.parentElement.appendChild(div);
    highlight(ticket.status);
    showToast(`Ticket ${id} — Status: ${labels[ticket.status] || ticket.status}`);
  }
  function notFound(id) {
    document.querySelector('.track-result')?.remove();
    const div = document.createElement('div');
    div.className = 'track-result track-not-found';
    div.innerHTML = `
      <span class="nf-icon">🔍</span>
      <p>No ticket found for <strong>${escapeHTML(id)}</strong>.<br>
      Double-check your ID and try again.<br>
      <small>Try: CMS-1234 &bull; CMS-5678 &bull; CMS-9999</small></p>
    `;
    statuses.parentElement.appendChild(div);
    document.querySelectorAll('.status-row').forEach(r => r.classList.remove('active'));
    showToast(`No ticket found for "${escapeHTML(id)}"`, 'error');
  }

  function track() {
    const raw = trackInput.value.trim();
    if (!raw) {
      trackInput.style.borderColor = '#e53e3e';
      trackInput.style.boxShadow   = '0 0 0 3px rgba(229,62,62,.2)';
      showToast('Please enter a Complaint ID (e.g. CMS-1234)', 'error');
      trackInput.focus(); return;
    }
    trackInput.style.borderColor = trackInput.style.boxShadow = '';
    const id     = normalize(raw);
    const ticket = lookup(id);
    ticket ? renderResult(ticket, id) : notFound(id);
  }

  trackBtn.addEventListener('click', track);
  trackInput.addEventListener('keydown', e => { if (e.key === 'Enter') track(); });
  trackInput.addEventListener('input', () => {
    trackInput.style.borderColor = trackInput.style.boxShadow = '';
  });
}


/* ─────────────────────────────────────────────────────
   5. CONTACT FORM
───────────────────────────────────────────────────── */
function initContactForm() {
  const section = document.querySelector('.contact-section');
  if (!section) return;
  const btn  = section.querySelector('.btn-primary');
  const name = document.getElementById('cname');
  const mail = document.getElementById('cemail');
  const msg  = document.getElementById('cmsg');
  if (!btn || !name || !mail || !msg) return;

  [name, mail, msg].forEach(el => {
    el.addEventListener('input',  () => clearFieldError(el));
    el.addEventListener('change', () => clearFieldError(el));
  });

  btn.addEventListener('click', () => {
    [name, mail, msg].forEach(clearFieldError);
    let ok = true, first = null;
    const fail = (el, m) => { setFieldError(el, m); if (!first) first = el; ok = false; };

    if (!name.value.trim())                fail(name, 'Your name is required');
    if (!mail.value.trim())                fail(mail, 'Email address is required');
    else if (!isValidEmail(mail.value))    fail(mail, 'Enter a valid email address');
    if (msg.value.trim().length < 5)       fail(msg,  'Please enter your message (at least 5 characters)');

    if (!ok) { showToast('Please fill in all contact fields.', 'error'); first?.focus(); return; }

    const orig = btn.textContent;
    btn.classList.add('btn-loading');
    btn.textContent = 'Sending…';

    setTimeout(() => {
      name.value = mail.value = msg.value = '';
      btn.classList.remove('btn-loading');
      btn.textContent = orig;
      showToast("Message sent! We'll reply within 2 hours ✉️");
    }, 1200);
  });
}


/* ─────────────────────────────────────────────────────
   6. RIPPLE
───────────────────────────────────────────────────── */
function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (this.classList.contains('btn-loading')) return;
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.8;
      const rip  = document.createElement('span');
      Object.assign(rip.style, {
        position:'absolute', borderRadius:'50%',
        width:size+'px', height:size+'px',
        left:(e.clientX-rect.left-size/2)+'px',
        top:(e.clientY-rect.top-size/2)+'px',
        background:'rgba(255,255,255,.2)',
        transform:'scale(0)', animation:'ripple-anim .6s ease-out forwards',
        pointerEvents:'none',
      });
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(rip);
      rip.addEventListener('animationend', () => rip.remove(), { once:true });
    });
  });
}


/* ─────────────────────────────────────────────────────
   7. SCROLL REVEAL
───────────────────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll(
    '.cat-card,.why-item,.about-point,.contact-card,.stat-box,.hero-card,.track-box,.form-card'
  );
  els.forEach(el => el.classList.add('reveal-hidden'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('reveal-visible'), i * 70);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold:.1, rootMargin:'0px 0px -30px 0px' });
  els.forEach(el => obs.observe(el));
}


/* ─────────────────────────────────────────────────────
   8. SMOOTH SCROLL
───────────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = (document.querySelector('.nav')?.offsetHeight || 0) + 16;
        window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - offset, behavior:'smooth' });
      }
    });
  });
}


/* ─────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDarkMode();
  initComplaintForm();
  initTrackSystem();
  initContactForm();
  initRipple();
  initScrollReveal();
  initSmoothScroll();
});