/* ============================================================
   Extract a comparable structural fingerprint from a rendered page.
   Run inside the browser via tools.browser.evaluate.
   ============================================================ */

function fingerprint() {
  const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
  const root = document.querySelector("#app > div") || document.body;

  // Top-level regions in document order
  const regions = Array.from(root.children)
    .filter((el) => el.tagName !== "SCRIPT")
    .map((el) => ({
      tag: el.tagName.toLowerCase(),
      cls: norm(el.className).slice(0, 90),
      heading: norm(el.querySelector("h1, h2, h3")?.textContent).slice(0, 90),
    }));

  const headings = Array.from(root.querySelectorAll("h1, h2, h3"))
    .map((h) => `${h.tagName}: ${norm(h.textContent)}`.slice(0, 110))
    .filter(Boolean);

  const links = Array.from(root.querySelectorAll("a"))
    .map((a) => ({ text: norm(a.textContent).slice(0, 60), href: a.getAttribute("href") }))
    .filter((l) => l.text || l.href);

  const buttons = Array.from(root.querySelectorAll("button"))
    .map((b) => norm(b.textContent).slice(0, 60))
    .filter(Boolean);

  const fields = Array.from(root.querySelectorAll("input, select, textarea")).map((f) => ({
    tag: f.tagName.toLowerCase(),
    type: f.getAttribute("type") || "",
    name: f.getAttribute("name") || "",
    placeholder: f.getAttribute("placeholder") || "",
    aria: f.getAttribute("aria-label") || "",
  }));

  const images = Array.from(root.querySelectorAll("img")).map((i) => i.getAttribute("src"));

  // Distinctive copy: paragraphs and list items, deduped
  const copy = Array.from(root.querySelectorAll("p, li"))
    .map((p) => norm(p.textContent))
    .filter((t) => t.length > 12 && t.length < 260);
  const uniqCopy = [...new Set(copy)];

  return {
    url: location.href,
    title: document.title,
    regions,
    headings,
    links,
    buttons,
    fields,
    images,
    copy: uniqCopy,
    counts: {
      regions: regions.length,
      headings: headings.length,
      links: links.length,
      buttons: buttons.length,
      fields: fields.length,
      images: images.length,
      copy: uniqCopy.length,
    },
  };
}

return JSON.stringify(fingerprint());
