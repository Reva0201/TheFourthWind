/* ============================================================
   The Fourth Wind — hash router + shared behaviours
   ============================================================ */

import { home } from "./pages/home.js";
import { venue } from "./pages/venue.js";
import { mabar } from "./pages/mabar.js";
import { mabarVenue, initMabar } from "./pages/mabar-venue.js";
import { owners } from "./pages/owners.js";
import { brandkit, initBrandkit } from "./pages/brandkit.js";
import { legal } from "./pages/legal.js";
import { login } from "./pages/login.js";
import { notFound } from "./pages/notfound.js";

const routes = [
  { test: (p) => p === "/", render: home },
  { test: (p) => p === "/mabar", render: mabar },
  { test: (p) => p === "/untuk-pemilik", render: owners },
  { test: (p) => p === "/brand", render: brandkit },
  { test: (p) => p === "/privasi", render: () => legal("privasi") },
  { test: (p) => p === "/ketentuan", render: () => legal("ketentuan") },
  { test: (p) => p.endsWith("/mabar") && p.startsWith("/venue/"), render: mabarVenue },
  { test: (p) => p.startsWith("/venue/"), render: venue },
  { test: (p) => p === "/masuk", render: login },
];

function currentPath() {
  const raw = location.hash.replace(/^#/, "") || "/";
  const path = raw.split("?")[0];
  return path === "" ? "/" : path;
}

/** Section target carried in the hash: either #/?to=harga or the plain
 *  mahjongqu-style #harga anchor. */
const SECTION_IDS = ["venue", "harga", "faq", "mabar-section"];

function currentTarget() {
  const raw = location.hash.replace(/^#/, "");
  const [path, q = ""] = raw.split("?");
  const param = new URLSearchParams(q).get("to");
  if (param) return param;
  const bare = path.replace(/^\//, "");
  return SECTION_IDS.includes(bare) ? bare : null;
}

/* In-page section links work like mahjongqu's #harga anchors, but the hash is
   the router here, so the section travels as #/?to=harga. Clicking one from a
   different route navigates home first and then lands on the section. */
function sectionHref(id) {
  return `#/?to=${id}`;
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function bindScrollLinks() {
  document.querySelectorAll("[data-scroll]").forEach((a) => {
    if (a.dataset.bound) return;
    a.dataset.bound = "1";
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = a.dataset.scroll;
      if (scrollToSection(id)) {
        history.replaceState(null, "", `#/?to=${id}`);
        syncActiveNav(id);
      } else {
        location.hash = `#/?to=${id}`;
      }
    });
  });
}

/** Highlight the nav item that matches the section currently on screen. */
function syncActiveNav(id) {
  document.querySelectorAll("[data-header-nav]").forEach((a) => {
    const on = a.dataset.scroll === id;
    a.classList.toggle("bg-primary-50", on);
    a.classList.toggle("text-primary-700", on);
    a.classList.toggle("font-bold", on);
  });
}

function render() {
  const target = currentTarget();
  const bare = location.hash.replace(/^#/, "").split("?")[0].replace(/^\//, "");
  // A bare section anchor (#harga) renders home rather than 404-ing.
  const path = target && bare === target ? "/" : currentPath();
  const route = routes.find((r) => r.test(path));
  const app = document.getElementById("app");

  app.innerHTML = route ? route.render(path) : notFound("Halaman");

  const landed = target ? scrollToSection(target) : false;
  if (!landed) window.scrollTo({ top: 0, behavior: "instant" });

  // Re-bind interactions after each render.
  bindMenu();
  bindReveal();
  bindFaq();
  bindHeaderScroll();
  bindVenueSearch();
  bindScrollLinks();
  bindClubSearch();
  initPerPage();
  syncActiveNav(target);
  document.dispatchEvent(new CustomEvent("route:rendered", { detail: { path } }));
}

/* Run whatever the current page registered as its init hook. */
function initPerPage() {
  const path = currentPath();
  if (path === "/brand") initBrandkit();
  if (path.endsWith("/mabar")) initMabar();
  if (typeof window.__pageInit === "function") {
    window.__pageInit();
    window.__pageInit = null;
  }
}

/* Mabar club picker filter. */
function bindClubSearch() {
  const input = document.querySelector("[data-club-search]");
  if (!input) return;
  const cards = Array.from(document.querySelectorAll("[data-club-grid] [data-search]"));
  const counter = document.querySelector("[data-club-count]");
  const base = Number(counter?.textContent ?? 0);

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach((c) => {
      const hit = !q || c.dataset.search.includes(q);
      c.classList.toggle("hidden", !hit);
      if (hit) shown += 1;
    });
    if (counter) counter.textContent = String(q ? Math.max(shown, 0) : base);
  });
}

/* Header floats transparent over a dark hero, then turns solid once the
   hero has scrolled past. Mirrors the production behaviour. */
function bindHeaderScroll() {
  const bar = document.querySelector("[data-header-bar]");
  if (!bar) return;

  const solidClasses = ["border-primary-100", "bg-white/95", "shadow-lift"];
  const ghostClasses = ["border-white/10", "bg-primary-900/25"];

  const apply = () => {
    const solid = bar.dataset.solid === "true" || window.scrollY > 24;
    bar.classList.toggle("border-primary-100", solid);
    bar.classList.toggle("bg-white/95", solid);
    bar.classList.toggle("shadow-lift", solid);
    bar.classList.toggle("border-white/10", !solid);
    bar.classList.toggle("bg-primary-900/25", !solid);

    const link = bar.querySelector("[data-header-login]");
    if (link) {
      link.classList.toggle("border-primary-200", solid);
      link.classList.toggle("text-primary", solid);
      link.classList.toggle("hover:bg-primary-50", solid);
      link.classList.toggle("border-white/25", !solid);
      link.classList.toggle("text-white", !solid);
      link.classList.toggle("hover:bg-white/10", !solid);
    }

    const navLinks = bar.querySelectorAll("[data-header-nav]");
    navLinks.forEach((a) => {
      a.classList.toggle("text-ink/70", solid);
      a.classList.toggle("hover:bg-primary-50", solid);
      a.classList.toggle("hover:text-ink", solid);
      a.classList.toggle("text-white/80", !solid);
      a.classList.toggle("hover:bg-white/10", !solid);
      a.classList.toggle("hover:text-white", !solid);
    });

    const toggle = bar.querySelector("[data-menu-toggle]");
    if (toggle) {
      toggle.classList.toggle("border-primary-100", solid);
      toggle.classList.toggle("bg-primary-50", solid);
      toggle.classList.toggle("text-ink", solid);
      toggle.classList.toggle("border-white/15", !solid);
      toggle.classList.toggle("bg-white/10", !solid);
      toggle.classList.toggle("text-white", !solid);
    }

    const wordmark = bar.querySelector("[data-wordmark]");
    if (wordmark) {
      wordmark.classList.toggle("text-ink", solid);
      wordmark.classList.toggle("text-white", !solid);
    }
  };

  apply();
  window.removeEventListener("scroll", window.__headerScroll);
  window.__headerScroll = apply;
  window.addEventListener("scroll", apply, { passive: true });
}

/* Venue directory filter on the home page. */
function bindVenueSearch() {
  const input = document.querySelector("[data-venue-search]");
  if (!input) return;
  const cards = Array.from(document.querySelectorAll("[data-venue-grid] [data-search]"));
  const empty = document.querySelector("[data-venue-empty]");
  const hint = document.querySelector("[data-venue-hint]");
  const foot = document.querySelector("[data-venue-footnote]");
  const base = foot ? foot.textContent : "";

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach((c) => {
      const hit = !q || c.dataset.search.includes(q);
      c.classList.toggle("hidden", !hit);
      if (hit) shown += 1;
    });
    if (empty) empty.classList.toggle("hidden", shown > 0);
    if (hint) hint.textContent = q ? `${shown} club cocok dengan “${input.value.trim()}”.` : "Cari dengan nama club, nama jalan, mall, atau daerahnya.";
    if (foot) foot.textContent = q ? `${shown} dari ${cards.length} club.` : base;
  });
}

function bindMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const panel = document.querySelector("[data-menu-panel]");
  if (!toggle || !panel) return;
  toggle.addEventListener("click", () => {
    const open = !panel.classList.contains("hidden");
    panel.classList.toggle("hidden", open);
    toggle.setAttribute("aria-expanded", String(!open));
  });
  panel.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      panel.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

function bindReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length || typeof IntersectionObserver === "undefined") return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    targets.forEach((t) => t.classList.add("in"));
    return;
  }

  document.documentElement.dataset.reveal = "on";
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach((t) => io.observe(t));
}

/* FAQ uses native <details>/<summary>, so there is nothing to bind. */
function bindFaq() {}

let bindBooking;

// Pages may register their own post-render hook.
document.addEventListener("route:rendered", () => {
  if (typeof window.__pageInit === "function") {
    window.__pageInit();
    window.__pageInit = null;
  }
});

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
if (document.readyState !== "loading") render();
