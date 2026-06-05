# 🗂️ CMS — Complaint Management System

> **Frontend Development · Project 4 · DecodeLabs Industrial Training Kit · Batch 2026**

A fully responsive, single-page Complaint Management System built with semantic HTML5, CSS3, and vanilla JavaScript. This project fulfils the **Optional Mastery Phase: Form Design & Validation** (Project 4), demonstrating production-grade form handling, real-time input validation, and dynamic UI feedback — all through pure programmatic architecture with zero dependencies.

---

## 📋 Table of Contents

- [Live Features](#-live-features)
- [Project Structure](#-project-structure)
- [Task 4 — Form Design & Validation](#-task-4--form-design--validation)
- [Validation Architecture (IPO Model)](#-validation-architecture-ipo-model)
- [How the Forms Work](#-how-the-forms-work)
- [Dark Mode](#-dark-mode)
- [Responsive Design](#-responsive-design)
- [Technologies Used](#-technologies-used)
- [How to Run](#-how-to-run)
- [Demo Ticket IDs](#-demo-ticket-ids)

---

## ✅ Live Features

| Feature | Status |
|---|---|
| Submit Complaint Form with validation | ✅ Complete |
| Real-time inline field error messages | ✅ Complete |
| Email format validation (Regex) | ✅ Complete |
| Success card with generated Ticket ID | ✅ Complete |
| Complaint Tracker (lookup by ID) | ✅ Complete |
| Contact Form with validation | ✅ Complete |
| Toast notification system | ✅ Complete |
| Dark / Light mode toggle | ✅ Complete |
| Mobile hamburger navigation | ✅ Complete |
| Scroll reveal animations | ✅ Complete |
| Button ripple effect | ✅ Complete |
| Smooth scrolling | ✅ Complete |

---

## 📁 Project Structure

```
cms-project/
│
├── index.html          ← Semantic HTML structure (all sections)
├── decodelab/
│   ├── all.css         ← All styles (variables, layout, components, dark mode)
│   └── intern.js       ← All JavaScript (validation, forms, UI interactions)
└── README.md           ← This file
```

---

## 🎯 Task 4 — Form Design & Validation

**Goal:** Create forms and validate user inputs using JavaScript.

This project implements Task 4 across **two forms** — the Complaint Submission Form and the Contact Form — meeting all key requirements:

### Key Requirements Fulfilled

**1. Input Fields (name, email, category, message)**

The Complaint Form contains:
- **Full Name** — text input, required
- **Email Address** — email input, validated with Regex
- **Complaint Category** — dropdown select, required
- **Complaint Description** — textarea, minimum 10 characters

The Contact Form contains:
- **Your Name** — text input, required
- **Email Address** — email input, validated with Regex
- **Message** — textarea, minimum 5 characters

**2. Error Messages**

Each field displays a red inline error message directly below it when validation fails. Errors are cleared instantly as the user starts typing (real-time feedback). A toast notification also fires at the top level summarising the failure.

```
⚠ Full name is required
⚠ Enter a valid email (name@example.com)
⚠ Please select a category
⚠ Please describe your complaint (at least 10 characters)
```

**3. Success Messages**

On successful submission, the form card is replaced with an animated success card that shows:
- A confetti emoji animation
- The user's name and complaint category
- A generated Ticket ID (e.g. `CMS-7342`)
- A "Submit Another" button that resets the page

A green toast notification also confirms submission.

**4. Basic Validation Logic**

All validation runs in `intern.js` using the `initComplaintForm()` and `initContactForm()` functions. No HTML5 `required` attributes are used — all logic is written in pure JavaScript to achieve complete control over error placement and styling.

---

## 🏗️ Validation Architecture (IPO Model)

This project follows the **Input → Process → Output (IPO)** model taught in the DecodeLabs curriculum:

```
┌─────────────────────────────────────────────────────────┐
│  STAGE 1: INPUT (The Structure)                         │
│  Semantic HTML — <form>, <input>, <label>, <textarea>   │
│  Data is collected from the user via designated fields  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  STAGE 2: PROCESS (The Gatekeeper)                      │
│  JavaScript + Regex logic gates inspect data:           │
│  • value.trim() === '' → empty field check              │
│  • /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) → email regex  │
│  • value.trim().length < 10 → length gate               │
│  • event.preventDefault() → stops page refresh          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  STAGE 3: OUTPUT (The Communicator)                     │
│  Dynamic UI feedback via DOM manipulation:              │
│  • Inline red error messages per field                  │
│  • Red border highlight on invalid fields               │
│  • Toast notifications (success / error)                │
│  • Success card with Ticket ID on valid submission      │
└─────────────────────────────────────────────────────────┘
```

---

## ⚙️ How the Forms Work

### Complaint Form (`initComplaintForm`)

```
User clicks "Submit Complaint"
        │
        ▼
All 4 fields validated simultaneously
        │
   ┌────┴────┐
   │ INVALID │ → setFieldError() adds red border + error message per field
   │         │ → showToast() fires error notification
   │         │ → first invalid field receives focus
   └────┬────┘
        │ VALID
        ▼
Button enters loading state ("Submitting…")
        │
   1.4 second simulated async delay
        │
        ▼
Ticket ID generated → CMS-XXXX (random 4-digit)
Ticket saved to sessionStorage (persists for tracking)
Form card replaced with animated success card
Green toast notification fires
```

### Track System (`initTrackSystem`)

```
User enters a Complaint ID → press Track or Enter
        │
        ▼
ID normalised → CMS-1234 format
        │
        ▼
Lookup in sessionStorage (user-submitted tickets)
        + DEMO tickets (6 pre-loaded examples)
        │
   ┌────┴────┐
   │  FOUND  │ → Status rows highlight up to current stage
   │         │ → Ticket info card renders above status
   │         │ → Toast shows status label
   └────┬────┘
        │ NOT FOUND
        ▼
"Not found" message with example IDs shown
All status rows cleared
Error toast fires
```

### Email Validation (Regex)

```javascript
// Pattern used throughout both forms
function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
}
```

This regex confirms:
- Text exists before the `@` symbol
- An `@` symbol is present
- Text exists after `@` with a `.` and domain

---

## 🌙 Dark Mode

The site supports full dark mode with automatic system preference detection (`prefers-color-scheme`). The user's choice is persisted in `localStorage`.

Toggle is available in the navigation bar (☀️ / 🌙 button). Every element — forms, inputs, cards, backgrounds, text — has explicit dark mode overrides to ensure consistent rendering.

---

## 📱 Responsive Design

| Breakpoint | Layout |
|---|---|
| `> 1024px` | Full two-column layouts, 3-column category grid |
| `768px – 1024px` | 2-column footer, 2-column category grid |
| `< 768px` | Single column, hamburger navigation, stacked forms |
| `< 480px` | Single column categories, stacked hero buttons, vertical track input |

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure (`<form>`, `<input>`, `<label>`, `<select>`, `<textarea>`) |
| **CSS3** | Custom properties, Grid, Flexbox, animations, backdrop-filter |
| **Vanilla JavaScript (ES6+)** | Form validation, DOM manipulation, event handling |
| **Regex** | Email format validation |
| **sessionStorage** | Ticket persistence across page sections |
| **localStorage** | Dark mode preference persistence |
| **IntersectionObserver API** | Scroll reveal animations |
| **Google Fonts** | Sora (headings) + DM Sans (body) |

---

## 🚀 How to Run

1. Clone or download the project folder
2. Open `index.html` in any modern browser
3. No build tools, no dependencies, no server required

```bash
# Option: serve with VS Code Live Server extension
# or simply double-click index.html
```

---

## 🔍 Demo Ticket IDs

Use these pre-loaded IDs in the **Track Status** section to test the tracker:

| Ticket ID | Category | Status |
|---|---|---|
| `CMS-1234` | Billing Problem | ✅ Resolved |
| `CMS-5678` | Technical Issue | 🔄 In Progress |
| `CMS-9999` | Delivery Issue | ⏳ Pending |
| `CMS-0001` | Account Issue | ✅ Resolved |
| `CMS-8821` | Billing Problem | ✅ Resolved |
| `CMS-9043` | Technical Issue | 🔄 In Progress |

Any ticket you submit via the form is also trackable in the same session using the generated ID.

---

## 👨‍💻 Author

**DecodeLabs Frontend Development — Batch 2026**
Project 4: Optional Mastery Phase — Form Design & Validation

---

*Built with semantic HTML, vanilla CSS, and pure JavaScript. No frameworks. No libraries. Just code.*