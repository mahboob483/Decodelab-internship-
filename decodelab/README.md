# 🗂️ CMS – Complaint Management System

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-orange)

---

 Project Title

**CMS – Complaint Management System**

---
 Description

CMS (Complaint Management System) is a modern, fully responsive web application that allows users to **submit**, **track**, and **manage complaints** easily and efficiently.

It is designed to connect users with the right support team quickly and transparently — with real-time status tracking, form validation, dark mode support, and instant ticket generation.

### ✅ Key Features

- **Complaint Submission Form** — Submit a complaint with your name, email, category, and description. The system auto-generates a unique Ticket ID (e.g. `CMS-4821`).
- **Complaint Tracker** — Enter your Ticket ID to check the real-time status of your complaint: `Pending`, `In Progress`, or `Resolved`.
- **Form Validation** — All fields are validated before submission. Clear error messages guide the user.
- **Dark / Light Mode Toggle** — Switch between dark and light themes. Preference is saved in `localStorage`.
- **Mobile Responsive** — Fully responsive layout with a hamburger menu for mobile devices.
- **Toast Notifications** — Smooth animated success and error notifications on every action.
- **Scroll Reveal Animations** — Elements animate into view as you scroll down the page.
- **Button Ripple Effects** — Interactive click ripple effect on all buttons.
- **Contact Form** — Users can send a message directly to the support team.

---

## 🗂️ Project Structure

```
CMS Project/
│
├── index.html       ← Main HTML structure (all sections & layout)
├── all.css          ← Full stylesheet (variables, components, responsive)
├── script.js        ← All JavaScript (validation, dark mode, tracker, etc.)
└── README.md        ← Project documentation (this file)
```

---

## 🚀 How to Run

This is a **pure front-end project** — no server, no installation, no dependencies required.

### ▶️ Method 1 — Open Directly in Browser (Easiest)

1. Download or clone the project folder.
2. Open the project folder.
3. Double-click `index.html`.
4. The website opens in your default browser. ✅

---

### ▶️ Method 2 — Using VS Code Live Server (Recommended)

1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions panel.
3. Right-click `index.html` in the file explorer.
4. Select **"Open with Live Server"**.
5. The site opens at `http://127.0.0.1:5500` and auto-reloads on save. ✅

---

### ▶️ Method 3 — Using Python HTTP Server

If you have Python installed, run this command inside the project folder:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

Then open your browser and go to:
```
http://localhost:8000
```

---

### ▶️ Method 4 — Using Node.js (http-server)

If you have Node.js installed:

```bash
# Install http-server globally (only once)
npm install -g http-server

# Run inside the project folder
http-server
```

Then open your browser and go to:
```
http://localhost:8080
```

---

## 🧪 How to Test Features

| Feature | How to Test |
|---|---|
| Submit Complaint | Fill the form and click **"Submit Complaint →"** |
| Form Validation | Click submit with empty fields — errors appear |
| Track a Ticket | Enter `CMS-1234`, `CMS-5678`, or `CMS-9999` in the tracker |
| Dark Mode | Click the **🌙 Dark** button in the navbar |
| Mobile Menu | Resize browser below 768px — hamburger ☰ appears |
| Contact Form | Fill the contact form and click **"Send Message →"** |

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and semantic layout |
| **CSS3** | Styling, animations, responsive design |
| **JavaScript (ES6+)** | Interactivity, DOM manipulation, validation |
| **Google Fonts** | Sora & DM Sans typography |
| **localStorage** | Saving dark mode preference |
| **sessionStorage** | Storing submitted complaint tickets |

---

## 👨‍💻 Author

**Your Name**
- 📧 Email: your@email.com
- 🌐 GitHub: github.com/yourusername

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

> _"A simple and efficient complaint management system that ensures every issue gets the attention it deserves."_