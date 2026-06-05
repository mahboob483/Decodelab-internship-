/* ══════════════════════════════════════════════════════
   CMS – Complaint Management System  |  intern.js
   Task 4: Form Design & Validation
   ══════════════════════════════════════════════════════

   VALIDATION ARCHITECTURE — IPO MODEL
   ─────────────────────────────────────────────────────
   INPUT   → Semantic <form> elements with named fields
   PROCESS → JS: empty checks, Regex, event.preventDefault()
   OUTPUT  → Inline errors, toast alerts, success card
   ══════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────────────── */
function generateTicketID() {
  return 'CMS-' + Math.floor(1000 + Math.random() * 9000);
}

/* Task 4 — Email regex: checks text@text.text pattern */
function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
}

function escapeHTML(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* Task 4 — Inline field error helpers */
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
   TOAST  — Task 4: Output notification system
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
   3. COMPLAINT FORM  ★ Task 4 Core ★

   INPUT   → <form id="complaintForm"> semantic fields
   PROCESS → submit event + preventDefault + validation gates
   OUTPUT  → inline errors OR animated success card + toast
───────────────────────────────────────────────────── */
function initComplaintForm() {
  const formEl = document.getElementById('complaintForm');
  if (!formEl) return;

  const submitBtn = formEl.querySelector('.form-submit');

  /* Real-time error clearing — errors vanish as user types */
  ['fname', 'femail', 'fcat', 'fdesc'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input',  () => clearFieldError(el));
      el.addEventListener('change', () => clearFieldError(el));
    }
  });

  /* ── PROCESS: submit event prevents page refresh ── */
  formEl.addEventListener('submit', (e) => {
    e.preventDefault(); /* Phase 2: stop browser HTTP request / memory wipe */

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

    /* Validation gates */
    if (!f.name.value.trim())
      fail(f.name,  'Full name is required');

    if (!f.email.value.trim())
      fail(f.email, 'Email address is required');
    else if (!isValidEmail(f.email.value))
      fail(f.email, 'Enter a valid email (name@example.com)');

    if (!f.cat.value)
      fail(f.cat,   'Please select a category');

    if (f.desc.value.trim().length < 10)
      fail(f.desc,  'Please describe your complaint (at least 10 characters)');

    /* ── OUTPUT: error state ── */
    if (!ok) {
      showToast('Please fix the highlighted fields.', 'error');
      first?.focus();
      return;
    }

    /* ── OUTPUT: loading state ── */
    const orig = submitBtn.textContent;
    submitBtn.classList.add('btn-loading');
    submitBtn.textContent = 'Submitting…';

    setTimeout(() => {
      const id  = generateTicketID();
      const cat = f.cat.options[f.cat.selectedIndex].text;
      const nm  = f.name.value.trim();

      /* Persist ticket to sessionStorage for tracker */
      const stored = JSON.parse(sessionStorage.getItem('cms-tickets') || '{}');
      stored[id] = {
        name: nm, email: f.email.value.trim(), category: cat,
        description: f.desc.value.trim(),
        status: ['pending', 'in-progress', 'resolved'][Math.floor(Math.random() * 3)],
        submitted: new Date().toLocaleString('en-PK', {
          day: '2-digit', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        })
      };
      sessionStorage.setItem('cms-tickets', JSON.stringify(stored));

      submitBtn.classList.remove('btn-loading');
      submitBtn.textContent = orig;

      /* ── OUTPUT: success card — Task 4 success message ── */
      formEl.innerHTML = `
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

  /* Pre-loaded demo tickets */
  const DEMO = {
    'CMS-1234': { name: 'Ali Hassan',  category: 'Billing Problem',  status: 'resolved',    submitted: '15 May 2026, 09:15 AM' },
    'CMS-5678': { name: 'Sara Khan',   category: 'Technical Issue',  status: 'in-progress', submitted: '18 May 2026, 11:30 AM' },
    'CMS-9999': { name: 'Omar Farooq', category: 'Delivery Issue',   status: 'pending',     submitted: '20 May 2026, 02:00 PM' },
    'CMS-0001': { name: 'Zara Malik',  category: 'Account Issue',    status: 'resolved',    submitted: '12 May 2026, 08:45 AM' },
    'CMS-8821': { name: 'Ahmed Raza',  category: 'Billing Problem',  status: 'resolved',    submitted: '21 May 2026, 04:00 PM' },
    'CMS-9043': { name: 'Hina Tariq', category: 'Technical Issue',   status: 'in-progress', submitted: '22 May 2026, 10:00 AM' },
  };
  const ORDER = ['pending', 'in-progress', 'resolved'];

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
    const labels = { pending: 'Pending', 'in-progress': 'In Progress', resolved: 'Resolved' };
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
      trackInput.focus();
      return;
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
   5. CONTACT FORM  ★ Task 4: Second Form ★

   INPUT   → <form id="contactForm">
   PROCESS → submit event + preventDefault + validation
   OUTPUT  → inline errors OR success toast + reset
───────────────────────────────────────────────────── */
function initContactForm() {
  const formEl = document.getElementById('contactForm');
  if (!formEl) return;

  const submitBtn = formEl.querySelector('.btn-primary');
  const name = document.getElementById('cname');
  const mail = document.getElementById('cemail');
  const msg  = document.getElementById('cmsg');
  if (!submitBtn || !name || !mail || !msg) return;

  [name, mail, msg].forEach(el => {
    el.addEventListener('input',  () => clearFieldError(el));
    el.addEventListener('change', () => clearFieldError(el));
  });

  /* ── PROCESS: submit event ── */
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    [name, mail, msg].forEach(clearFieldError);
    let ok = true, first = null;
    const fail = (el, m) => { setFieldError(el, m); if (!first) first = el; ok = false; };

    if (!name.value.trim())             fail(name, 'Your name is required');
    if (!mail.value.trim())             fail(mail, 'Email address is required');
    else if (!isValidEmail(mail.value)) fail(mail, 'Enter a valid email address');
    if (msg.value.trim().length < 5)    fail(msg,  'Please enter your message (at least 5 characters)');

    if (!ok) {
      showToast('Please fill in all contact fields.', 'error');
      first?.focus();
      return;
    }

    const orig = submitBtn.textContent;
    submitBtn.classList.add('btn-loading');
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      name.value = mail.value = msg.value = '';
      submitBtn.classList.remove('btn-loading');
      submitBtn.textContent = orig;
      showToast("Message sent! We'll reply within 2 hours ✉️");
    }, 1200);
  });
}


/* ─────────────────────────────────────────────────────
   6. RIPPLE EFFECT
───────────────────────────────────────────────────── */
function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      if (this.classList.contains('btn-loading')) return;
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.8;
      const rip  = document.createElement('span');
      Object.assign(rip.style, {
        position: 'absolute', borderRadius: '50%',
        width: size + 'px', height: size + 'px',
        left: (e.clientX - rect.left - size / 2) + 'px',
        top:  (e.clientY - rect.top  - size / 2) + 'px',
        background: 'rgba(255,255,255,.2)',
        transform: 'scale(0)', animation: 'ripple-anim .6s ease-out forwards',
        pointerEvents: 'none',
      });
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(rip);
      rip.addEventListener('animationend', () => rip.remove(), { once: true });
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
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
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
        window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
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
  initComplaintForm();  /* Task 4 */
  initTrackSystem();
  initContactForm();    /* Task 4 */
  initRipple();
  initScrollReveal();
  initSmoothScroll();
});