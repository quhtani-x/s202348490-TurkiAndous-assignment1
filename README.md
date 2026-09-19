# Turki Andous — Personal Portfolio

**SWE363 — Assignment 1: Foundation & AI Integration**

A responsive single-page personal portfolio built with plain HTML5, CSS3 and
vanilla JavaScript. No frameworks, no build step, no dependencies — open
`index.html` and it runs.

| | |
| --- | --- |
| **Student** | Turki Andous — s202348490 |
| **Course** | SWE363 — Web Engineering & Development, KFUPM |
| **Live site** | <https://quhtani-x.github.io/s202348490-TurkiAndous-assignment1/> |
| **Repository** | <https://github.com/quhtani-x/s202348490-TurkiAndous-assignment1> |

---

## Features

**Content**
- **About Me** — intro, tagline and profile image
- **Projects** — seven projects, each with a title, description, tech chips and a placeholder image; the flagship spans the full grid width
- **Contact** — a Name / Email / Message form with client-side validation (no backend)
- Extra sections: hero, stats, skills, and an experience timeline

**Responsive design**
- CSS Grid and Flexbox throughout, no framework
- Three breakpoints — desktop, tablet (≤1024px) and mobile (≤900px / ≤600px)
- The navigation collapses into a hamburger menu on tablet and below

**JavaScript interactivity** (`js/script.js`)
1. **Dark / light theme toggle** — remembers the choice in `localStorage`, defaults to the OS setting
2. **Time-of-day greeting** — "Good morning / afternoon / evening" in the hero
3. **Typewriter effect** — rotating roles under the name
4. **Project filter** — filter projects by category without reloading
5. **Contact form validation** — inline, per-field error messages and a success state
6. **Scroll effects** — smooth scrolling, sticky navbar, active-link highlighting, reveal-on-scroll animations and counting statistics

**Accessibility**
- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), a skip link, alt text on every image, labelled form fields, ARIA state on interactive controls, visible focus rings, and `prefers-reduced-motion` support

---

## Run it locally

**Option 1 — open the file directly**

```bash
git clone https://github.com/quhtani-x/s202348490-TurkiAndous-assignment1.git
cd s202348490-TurkiAndous-assignment1
open index.html        # macOS  ·  Windows: start index.html  ·  Linux: xdg-open index.html
```

**Option 2 — run a local web server** (recommended, matches how it is deployed)

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

If you use VS Code, the **Live Server** extension works too: right-click
`index.html` → *Open with Live Server*.

There is nothing to install and nothing to build — no Node, no npm, no
package manager.

### Test the responsive layout

Open DevTools (`F12` or `Cmd/Ctrl + Shift + I`), toggle the device toolbar
(`Cmd/Ctrl + Shift + M`) and check the three breakpoints: **1440px** (desktop),
**768px** (tablet) and **375px** (mobile).

---

## Project structure

```
s202348490-TurkiAndous-assignment1/
├── README.md
├── index.html                      # all page content and structure
├── .gitignore
├── css/
│   └── styles.css                  # design tokens, layout, responsive rules
├── js/
│   └── script.js                   # all interactivity
├── assets/
│   ├── resume.pdf
│   └── images/
│       ├── profile.jpg
│       └── projects/               # SVG placeholder thumbnails
└── docs/
    ├── ai-usage-report.md          # how AI tools were used
    └── technical-documentation.md  # architecture and technical decisions
```

---

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Markup | HTML5, semantic elements | Accessibility and clarity |
| Styling | CSS3 — custom properties, Grid, Flexbox | Theming and responsive layout with no framework |
| Behaviour | Vanilla JavaScript (ES6+) | No dependencies to install or update |
| Fonts | Space Grotesk + Inter (Google Fonts) | Loaded with `preconnect` and `display=swap` |
| Images | JPEG portrait + inline SVG thumbnails | SVGs stay sharp at any size and weigh ~1 KB each |

---

## AI usage (summary)

**Claude (Anthropic), used through Claude Code**, was my AI assistant for this
assignment — as a pair programmer and reviewer, not as a replacement for the
work. It drafted the first pass of the form-validation logic and the light-theme
colour palette, generated the SVG project thumbnails, and reviewed the CSS for
contrast and accessibility problems.

Every suggestion was read, tested in the browser and edited before it was kept —
including three cases where I rejected the AI's approach outright.
The full report — tools, prompts, benefits, challenges, learning outcomes and
the changes made to AI output — is in
[`docs/ai-usage-report.md`](docs/ai-usage-report.md).

---

## Deployment

The site is fully static, so any static host works.

**GitHub Pages:** repository **Settings → Pages → Source: `main` / root → Save**.
The site goes live at `https://quhtani-x.github.io/s202348490-TurkiAndous-assignment1/`.

---

## Browser support

Verified in a Chromium-based browser at desktop (1440px), tablet (768px) and
mobile (375px) widths. Every feature used — CSS Grid, custom properties,
`IntersectionObserver` — is supported in Chrome, Safari, Firefox and Edge in
every version released since 2020.
