import fs from "node:fs";
import path from "node:path";

const OUT = path.join("assets", "logo");
fs.mkdirSync(OUT, { recursive: true });

const GLYPH = "\u98A8"; // 風
const JADE = "#052a1f";
const JADE_MID = "#0e7c5a";
const GOLD = "#d4a24c";

/* Chromium will not rasterise an <img>-loaded SVG that has no intrinsic size,
   so every file carries explicit width/height alongside the viewBox. */
const FONT = "Fraunces, Georgia, 'Times New Roman', serif";

const glyph = (fill, size, x, y, weight = 700) =>
  `  <text x="${x}" y="${y}" text-anchor="middle" font-family="${FONT}" font-weight="${weight}" font-size="${size}" fill="${fill}">${GLYPH}</text>`;

function wrap(w, h, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="The Fourth Wind">
${inner}</svg>
`;
}

function mark({ bg = GOLD, fg = JADE } = {}) {
  return wrap(
    96,
    96,
    `  <rect width="96" height="96" rx="22" fill="${bg}"/>\n${glyph(fg, 52, 48, 67)}\n`
  );
}

function horizontal({ bg = null, markBg = GOLD, markFg = JADE, text = JADE, accent = "#a97b2c" } = {}) {
  return wrap(
    380,
    96,
    `${bg ? `  <rect width="380" height="96" fill="${bg}"/>\n` : ""}  <rect x="0" y="16" width="64" height="64" rx="15" fill="${markBg}"/>\n${glyph(markFg, 35, 32, 62)}\n  <text x="80" y="60" font-family="${FONT}" font-weight="700" font-size="30" fill="${text}">The Fourth<tspan fill="${accent}"> Wind</tspan></text>\n`
  );
}

function stacked({ bg = null, markBg = GOLD, markFg = JADE, text = JADE, accent = "#a97b2c" } = {}) {
  return wrap(
    220,
    180,
    `${bg ? `  <rect width="220" height="180" fill="${bg}"/>\n` : ""}  <rect x="78" y="16" width="64" height="64" rx="15" fill="${markBg}"/>\n${glyph(markFg, 35, 110, 62)}\n  <text x="110" y="126" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="24" fill="${text}">The Fourth<tspan fill="${accent}"> Wind</tspan></text>\n`
  );
}

const VARIANTS = {
  light: { markBg: GOLD, markFg: JADE, text: JADE, accent: "#a97b2c" },
  dark: { markBg: GOLD, markFg: JADE, text: "#ffffff", accent: GOLD },
  mono: { markBg: "#12211c", markFg: "#ffffff", text: "#12211c", accent: "#12211c" },
  white: { markBg: "#ffffff", markFg: JADE_MID, text: "#ffffff", accent: GOLD },
};

for (const [name, v] of Object.entries(VARIANTS)) {
  fs.writeFileSync(path.join(OUT, `mark-${name}.svg`), mark({ bg: v.markBg, fg: v.markFg }), "utf8");
  fs.writeFileSync(path.join(OUT, `horizontal-${name}.svg`), horizontal(v), "utf8");
  fs.writeFileSync(path.join(OUT, `stacked-${name}.svg`), stacked(v), "utf8");
}
fs.writeFileSync(path.join(OUT, "mark-favicon.svg"), mark({ bg: GOLD, fg: JADE }), "utf8");

const check = fs.readFileSync(path.join(OUT, "horizontal-light.svg"), "utf8");
console.log("glyph intact:", check.includes(GLYPH), "| width attr:", /width="380"/.test(check));
