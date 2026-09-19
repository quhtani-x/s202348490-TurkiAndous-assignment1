# AI Usage Report

**Assignment 1 — Foundation & AI Integration**
**Student:** Turki Andous (s202348490) · **Course:** SWE363, KFUPM

---

## 1. Tools Used & Use Cases

### Claude (Anthropic), used through Claude Code

Claude Code is a terminal-based AI coding assistant that can read and edit files
in the project directory. It was my primary AI tool for this assignment. I chose
a single tool deliberately: it could see the whole repository at once, so its
suggestions stayed consistent with the code that already existed instead of
being context-free snippets.

I used it for five distinct jobs:

| # | Use case | What I asked for | What I got back |
| --- | --- | --- | --- |
| 1 | **Refactoring for theming** | "Take this dark-only stylesheet and restructure it so a light theme is one variable swap." | Every hard-coded colour moved into CSS custom properties on `:root`, plus a `:root[data-theme="light"]` block that only redefines the tokens. |
| 2 | **Code generation** | "Write client-side validation for a Name / Email / Message form with inline errors and no backend." | The `rules` object and `validateField()` function in `js/script.js`. |
| 3 | **Asset generation** | "Generate lightweight placeholder thumbnails for six projects — no external services." | A short Python script that wrote six hand-tuned SVG files into `assets/images/projects/`. |
| 4 | **Code review** | "Review this CSS for colour-contrast and accessibility problems in both themes." | Four concrete findings, including the contrast failure described in section 4. |
| 5 | **Documentation support** | "Draft the technical documentation section on the CSS architecture." | A first draft of `docs/technical-documentation.md`, which I then rewrote to match how I had actually structured the file. |

### Why not more tools

The rubric rewards *meaningful* AI use, not the number of logos. Splitting the
work across three assistants would have meant three of them holding partial
context and contradicting each other and would require more time to review and coordinate  — especially on the design tokens, where
one inconsistent colour breaks the whole light theme.

---

## 2. Benefits & Challenges

### Benefits

**It removed the mechanical work, not the thinking.** Converting roughly forty
hard-coded colour values into tokens is the kind of task where a human makes one
typo and spends twenty minutes finding it. The AI did it in a single pass, which
left my time for the decisions that actually mattered — which breakpoints to
use, what belongs in HTML versus JavaScript, what "simple" means for this
assignment.

**It was a genuinely useful reviewer.** Asking "what's wrong with this?" turned
out to be more valuable than asking "write this for me". The contrast bug in
section 4 is something I would have shipped, because on my own screen the light
theme looked fine.

**It accelerated the parts I already understood.** Writing the sixth project
card by hand after five identical ones teaches nothing. Describing the pattern
once and reviewing the output was faster and equally correct.

**It made an unfamiliar area approachable.** I had not used `IntersectionObserver`
before. Instead of only pasting the code, I asked it to explain `rootMargin`,
which is why the active-nav-link observer uses `-45% 0px -50% 0px` — a band
across the middle of the viewport — rather than the default.

### Challenges

**It over-engineers by default.** The first version of the portfolio it proposed
included a project archive of eighty repositories, a testimonials carousel and a
blog section. The assignment brief explicitly says *"keep this simple, focus on
clarity and structure, not over-design"*. I had to push back and cut the site
down to the sections that earn marks. **AI optimises for impressive, not for the
rubric.**

**It reaches for dependencies I did not need.** It suggested Bootstrap for the
grid and an external placeholder-image service for the thumbnails. Both would
have worked, and both would have made the page slower and less my own work.
Plain CSS Grid is about fifteen lines here.

**It is confidently wrong about visual results.** The AI cannot see the rendered
page. It assured me the light theme was "high contrast" while the cyan accent
was effectively unreadable on a white card. Anything visual has to be verified
in a browser — the AI's claim is not evidence.

**Accepting code you have not read is a trap.** I initially kept an AI-written
validation snippet that used `type="email"` and relied on the browser's built-in
bubble. It worked in Chrome and looked completely different in Safari. If I had
not read it and tested it, that inconsistency would have shipped.

---

## 3. Learning Outcomes

**Technical**

- **CSS custom properties as an architecture, not a convenience.** Before this
  assignment I used variables to avoid repeating a hex code. I now understand
  that if *every* colour is a token, an entire alternate theme is one block of
  overrides — the ~300 lines of layout rules below never mention a colour and
  never need to change.
- **`IntersectionObserver` over scroll listeners.** A `scroll` handler fires
  hundreds of times a second and forces layout on every call. The observer is
  called by the browser only when an element actually crosses a threshold, so
  the reveal animations, the counters and the active nav link all cost
  effectively nothing.
- **Accessible form validation.** Setting `novalidate` and handling validation
  myself gives identical behaviour in every browser. Linking each input to its
  error with `aria-describedby` and `role="alert"` means a screen-reader user
  hears the error instead of just seeing a red border.
- **Progressive enhancement.** The statistics show their real values in the HTML
  and JavaScript animates *from* zero *to* those values. If the script fails,
  the numbers are still correct.

**Workflow**

- **Specific prompts produce usable output; vague prompts produce filler.**
  "Make my portfolio better" returned a feature wish list. "Restructure this
  stylesheet so a light theme is one variable swap, and change nothing else"
  returned exactly the diff I wanted.
- **The review prompt is the highest-value prompt.** Generation saves typing;
  review catches things I could not have caught myself.
- **The brief outranks the AI.** Whenever the model's suggestion and the
  assignment's "keep it simple" instruction conflicted, the brief won.

---

## 4. Responsible Use & Modifications

I treated every AI response as a draft from a fast colleague who has never seen
the page render. Concretely:

**Rejected — external image service.** The AI suggested
`https://placehold.co/800x500` for the project thumbnails. I rejected it: it
adds six network requests, breaks when the site is opened offline, and makes an
assignment about HTML/CSS/JS depend on a third party staying online. I asked for
locally generated SVGs instead — each is under 1.2 KB, stays sharp at any zoom
level, and is genuinely part of the repository.

**Rejected — CSS framework.** Bootstrap was proposed for the layout. The
assignment allows a framework, but pulling in ~200 KB to replace fifteen lines
of `grid-template-columns` is the wrong trade, and it would have meant my
submission was mostly someone else's CSS.

**Fixed — a real contrast bug.** The AI's first light palette reused the dark
theme's cyan (`#22d3ee`) for accents. Against a near-white card that is roughly
1.9:1 contrast — far below the WCAG AA minimum of 4.5:1 for body text. I
replaced it with `#0e7490`, and the pink `#f472b6` with `#be185d`, for the same
reason. This only surfaced because I opened the page and looked at it.

**Rewrote — form validation.** The generated version leaned on native browser
validation, which renders differently in every browser. I rewrote it to use
`novalidate` with my own `rules` object, inline `<p class="error">` messages,
`.invalid` styling on the field, focus moved to the first invalid input on
submit, and errors that clear as the visitor types. The regular expression it
produced (`/\S+@\S+\.\S+/`) accepted `a@b.c`; I tightened it to require at least
two characters in the top-level domain.

**Corrected — progressive enhancement.** The AI's statistics markup was
`<b data-count="1700">0</b>` — a literal zero in the HTML. If JavaScript is
blocked or fails, the page claims I have reached zero students. I changed the
fallback text to the real value.

**Added — reduced motion.** Nothing in the generated CSS respected
`prefers-reduced-motion`, and the reveal animation starts at `opacity: 0`, so a
visitor who disables animations would have seen a blank page. I added the media
query that forces `.reveal` visible and disables the background animations.

**What I can explain.** I can walk through every line of this submission: why
the burger menu breakpoint is 1024px and not 768px (the five-item desktop nav
starts to crowd the logo before 768px), why `applyTheme()` reads `localStorage`
before `matchMedia` (an explicit choice should outrank the OS default), and why
the typewriter effect calls `setTimeout` recursively rather than using
`setInterval` (it needs a different delay for typing, deleting and the pause on
a completed word).

**Academic integrity.** No code was copied from classmates. Nothing in this
repository is unmodified AI output pasted in without being read, tested in a
browser and — in most cases — changed. The AI's role here was that of a tool I
directed and corrected, and this report documents where it was wrong.
