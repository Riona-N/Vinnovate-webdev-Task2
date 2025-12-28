# PV SINDHU — Project Showcase

A small, responsive single-page site showcasing the career and achievements of PV Sindhu — Olympic medallist and World Champion. This repository is a front‑end demo built with plain HTML, CSS, and JavaScript intended for portfolio, educational, or demonstration use.

---

## Table of Contents
- [About](#about)
- [Live Demo](#live-demo)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Customization](#customization)
- [Accessibility & Performance](#accessibility--performance)
- [Project Structure](#project-structure)
- [Known Issues](#known-issues)
- [Credits](#credits)
- [License](#license)

---

## About
This project is a focused, accessible, and responsive web page that highlights PV Sindhu's bio, career milestones, media gallery, and statistics. It demonstrates practical front-end techniques like lazy loading, keyboard-accessible components, theme persistence, and light-weight data visualization.

## Live Demo
Open `index.html` in your browser to try the site locally. For a local server (recommended for video playback):

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

---

## Features ✅
- Responsive hero, bio, timeline, media gallery, and stats sections
- Expandable career timeline with images and external links
- Lazy-loaded gallery and images for faster initial load
- Lightbox modal with keyboard navigation (← → to navigate, ESC to close)
- Theme selector (dark / light) with preference stored in localStorage
- Simple Chart.js chart showing achievements by year
- Settings & Connect panels for language/theme selection and social links
- Accessible markup: semantic elements, aria attributes, tabindex for interactive panels

---

## Getting Started
### Prerequisites
- Modern browser with video support
- (Optional) Local static server to test video and media files

### Run locally
1. Ensure the project files are in a single folder.
2. Open `index.html` with your browser, or serve the folder with a static server:

```bash
python -m http.server 8000
```

3. Visit http://localhost:8000

---

## Usage
- Use the top navigation to jump between sections (Home, About, Career, Media & Stats).
- Click **Explore Journey** or any timeline item’s "View Details" to expand more info.
- Open gallery images to view them full-size and navigate with keyboard arrows.
- Use the settings panel to change language (EN/ES) and theme (dark/light).

---

## Customization 🔧
- Update text and content in `index.html` (titles, timeline items, bio, links).
- Replace media files (images, `slowmo.mp4`, etc.) with your own assets; keep file names or update sources accordingly.
- Edit CSS variables at the top of `styles.css` to change color scheme and spacing.
- Chart data can be updated in `script.js` (Chart.js initialization section).
- To add timeline events or gallery items, follow the existing HTML structure and add relevant `data-*` attributes for filtering.

---

## Accessibility & Performance 💡
- Semantic HTML and ARIA attributes for assistive technologies.
- Images and videos use lazy-loading where applicable to improve performance.
- Avoid large uncompressed media files when publishing — resize and compress images and videos.

---

## Project Structure
```
VINNOVATE/
├─ index.html        # Single-page UI and content
├─ styles.css        # Site styles and theme variables
├─ script.js         # UI interactions, gallery, and chart logic
├─ sindhu.png        # Hero image (example)
├─ slowmo.mp4        # Background video for About section
├─ images/           # Timeline and gallery media
└─ tools/            # Utilities (e.g., accessibility audit script)
```

---

## Known Issues
- Video playback may require a local server on some browsers due to autoplay/loop restrictions.
- Chart.js is loaded via CDN — offline use requires bundling the library or hosting it locally.
- # PV SINDHU — Project Showcase

A small, responsive single-page site showcasing the career and achievements of PV Sindhu — Olympic medallist and World Champion. This repository is a front‑end demo built with plain HTML, CSS, and JavaScript intended for portfolio, educational, or demonstration use.

---

## Table of Contents
- [About](#about)
- [Live Demo](#live-demo)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Customization](#customization)
- [Accessibility & Performance](#accessibility--performance)
- [Project Structure](#project-structure)
- [Known Issues](#known-issues)
- [Credits](#credits)
- [License](#license)

---

## About
This project is a focused, accessible, and responsive web page that highlights PV Sindhu's bio, career milestones, media gallery, and statistics. It demonstrates practical front-end techniques like lazy loading, keyboard-accessible components, theme persistence, and light-weight data visualization.

## Live Demo
Open `index.html` in your browser to try the site locally. For a local server (recommended for video playback):

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

---

## Features ✅
- Responsive hero, bio, timeline, media gallery, and stats sections
- Expandable career timeline with images and external links
- Lazy-loaded gallery and images for faster initial load
- Lightbox modal with keyboard navigation (← → to navigate, ESC to close)
- Theme selector (dark / light) with preference stored in localStorage
- Simple Chart.js chart showing achievements by year
- Settings & Connect panels for language/theme selection and social links
- Accessible markup: semantic elements, aria attributes, tabindex for interactive panels

---

## Getting Started
### Prerequisites
- Modern browser with video support
- (Optional) Local static server to test video and media files

### Run locally
1. Ensure the project files are in a single folder.
2. Open `index.html` with your browser, or serve the folder with a static server:

```bash
python -m http.server 8000
```

3. Visit http://localhost:8000

---

## Usage
- Use the top navigation to jump between sections (Home, About, Career, Media & Stats).
- Click **Explore Journey** or any timeline item’s "View Details" to expand more info.
- Open gallery images to view them full-size and navigate with keyboard arrows.
- Use the settings panel to change language (EN/ES) and theme (dark/light).

---

## Customization 🔧
- Update text and content in `index.html` (titles, timeline items, bio, links).
- Replace media files (images, `slowmo.mp4`, etc.) with your own assets; keep file names or update sources accordingly.
- Edit CSS variables at the top of `styles.css` to change color scheme and spacing.
- Chart data can be updated in `script.js` (Chart.js initialization section).
- To add timeline events or gallery items, follow the existing HTML structure and add relevant `data-*` attributes for filtering.

---

## Accessibility & Performance 💡
- Keyboard accessible modal and panels (tab / ESC / arrow support).
- Semantic HTML and ARIA attributes for assistive technologies.
- Images and videos use lazy-loading where applicable to improve performance.
- Avoid large uncompressed media files when publishing — resize and compress images and videos.

---

## Project Structure
```
VINNOVATE/
├─ index.html        # Single-page UI and content
├─ styles.css        # Site styles and theme variables
├─ script.js         # UI interactions, gallery, and chart logic
├─ sindhu.png        # Hero image (example)
├─ slowmo.mp4        # Background video for About section
├─ images/           # Timeline and gallery media
└─ tools/            # Utilities (e.g., accessibility audit script)
```

---

## Known Issues
- Video playback may require a local server on some browsers due to autoplay/loop restrictions.
- Chart.js is loaded via CDN — offline use requires bundling the library or hosting it locally.
- The connect/fan form is front-end only and does not submit to a server (no backend integration).

---

## Credits
- Data and media: assembled for demo/educational use (replace with licensed images for publication)
- Icons: Font Awesome (CDN)
- Fonts: Google Fonts
- Charting: Chart.js

---

## License
This project is provided for educational and portfolio use. Add a `LICENSE` file (e.g., MIT) if you plan to publish or distribute the code.

---

If you'd like, I can add badges, a screenshot/GIF preview, or an MIT license file — tell me which you'd prefer next. ✅



---

## Credits
- Data and media: assembled for demo/educational use (replace with licensed images for publication)
- Icons: Font Awesome (CDN)
- Fonts: Google Fonts
- Charting: Chart.js

---

## License
This project is provided for educational and portfolio use. Add a `LICENSE` file (e.g., MIT) if you plan to publish or distribute the code.

---


