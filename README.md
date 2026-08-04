# Fahim Hassan — Modern Responsive Portfolio

A redesigned static portfolio built with semantic HTML, modern CSS, and vanilla JavaScript.

## Main features

- Fully responsive desktop, tablet, and mobile layouts
- Sticky navigation and mobile hamburger menu
- Light/dark theme with saved preference
- Hero typing animation
- Scroll-reveal effects and animated statistics
- Filterable project gallery
- Responsive images, videos, and embedded PDF reports
- Accessible labels, skip link, focus states, and reduced-motion support
- AJAX contact form with validation, loading state, success/error feedback, character counter, and honeypot spam protection
- Shared CSS and JavaScript files to reduce duplicated code

## Project structure

```text
E-Portfolio/
├── index.html
├── education-card.html
├── projects.html
├── achievements.html
├── link.html
├── laser_light.html
├── rain_detector.html
├── softwere_project.html
├── styles/
│   └── styles.css
├── js/
│   └── script.js
├── images/
├── MODIFICATION_GUIDE.md
└── README.md
```

## Run locally

You can open `index.html` directly, but a local server is better for testing:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages deployment

1. Replace your repository files with this folder's contents.
2. Commit and push to the `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/root`, then save.

## Contact form activation

The form uses FormSubmit's AJAX endpoint. On the first real submission, check `faahim180@gmail.com` and approve FormSubmit's activation email. Test the form again after activation.
