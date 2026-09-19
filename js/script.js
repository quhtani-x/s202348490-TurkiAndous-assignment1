/* Portfolio interactions — plain JavaScript, no dependencies. */

// ===== theme toggle (saved in localStorage, falls back to the OS setting) =====
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isLight = theme === "light";
  themeIcon.textContent = isLight ? "☀" : "☾";
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
}

const savedTheme = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
applyTheme(savedTheme || (prefersLight ? "light" : "dark"));

themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

// ===== greeting based on the visitor's local time =====
const hour = new Date().getHours();
const greeting = hour < 12 ? "Good morning — I'm" : hour < 18 ? "Good afternoon — I'm" : "Good evening — I'm";
document.getElementById("greeting").textContent = greeting;

// ===== typed rotating roles in the hero =====
const roles = ["autonomous systems", "AI that ships", "drone tech", "scalable platforms", "embedded systems"];
const roleEl = document.getElementById("roleText");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const word = roles[roleIndex];
  roleEl.textContent = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);

  // pause on the complete word before deleting it
  if (!deleting && charIndex === word.length + 1) {
    deleting = true;
    setTimeout(typeLoop, 1400);
    return;
  }
  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

// ===== navigation: scrolled state, mobile menu, active link =====
const nav = document.getElementById("nav");
const navLinks = document.getElementById("navLinks");
const burger = document.getElementById("burger");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

function closeMenu() {
  navLinks.classList.remove("open");
  burger.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Open menu");
}

burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// highlight the nav link of whichever section is in the middle of the viewport
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const link = navLinks.querySelector(`a[href="#${entry.target.id}"]`);
      if (!link) return;
      navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
      link.classList.add("active");
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("section[id]").forEach((section) => navObserver.observe(section));

// ===== reveal elements as they scroll into view =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== count the stat numbers up the first time they appear =====
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.dec || "0", 10);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const step = target / 60;
      let current = 0;

      const tick = () => {
        current = Math.min(current + step, target);
        el.textContent = prefix + current.toFixed(decimals) + suffix;
        if (current < target) requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll(".stat b").forEach((el) => counterObserver.observe(el));

// ===== project category filter =====
const filters = document.getElementById("filters");
const projectCards = document.querySelectorAll("#projGrid .pcard");
const projEmpty = document.getElementById("projEmpty");

filters.addEventListener("click", (e) => {
  const button = e.target.closest(".filter");
  if (!button) return;

  filters.querySelectorAll(".filter").forEach((b) => {
    const active = b === button;
    b.classList.toggle("active", active);
    b.setAttribute("aria-pressed", String(active));
  });

  const category = button.dataset.filter;
  let visible = 0;
  projectCards.forEach((card) => {
    const show = category === "all" || card.dataset.category === category;
    card.hidden = !show;
    if (show) visible++;
  });
  projEmpty.hidden = visible > 0;
});

// ===== contact form validation (front-end only, no backend) =====
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const rules = {
  name: (value) => (value.length >= 2 ? "" : "Please enter your name (at least 2 characters)."),
  email: (value) => (emailPattern.test(value) ? "" : "Please enter a valid email address."),
  message: (value) => (value.length >= 10 ? "" : "Please write a message of at least 10 characters."),
};

function validateField(input) {
  const message = rules[input.id](input.value.trim());
  input.closest(".field").classList.toggle("invalid", Boolean(message));
  document.getElementById(`${input.id}Error`).textContent = message;
  return !message;
}

// clear a field's error as soon as the visitor starts fixing it
Object.keys(rules).forEach((id) => {
  const input = document.getElementById(id);
  input.addEventListener("input", () => {
    if (input.closest(".field").classList.contains("invalid")) validateField(input);
  });
  input.addEventListener("blur", () => {
    if (input.value.trim()) validateField(input);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "";

  const inputs = Object.keys(rules).map((id) => document.getElementById(id));
  const invalid = inputs.filter((input) => !validateField(input));

  if (invalid.length) {
    invalid[0].focus();
    return;
  }

  formStatus.textContent = `Thanks, ${document.getElementById("name").value.trim()}! Your message is ready — I'll get back to you soon.`;
  form.reset();
});

// ===== footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
