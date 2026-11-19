/* Generates the two venue banner images used on the home directory.
   Simple, honest illustrations — no photos of real premises. */

import fs from "node:fs";

const out = "assets/banner";
fs.mkdirSync(out, { recursive: true });

function banner({ base = "#073b2b", accent = "#d4a24c", label = "" } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="280" viewBox="0 0 800 280" role="img" aria-label="Ilustrasi meja mahjong">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${base}"/>
      <stop offset="1" stop-color="#052a1f"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.72" cy="0.3" r="0.6">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="lattice" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0V44" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
      <circle cx="12" cy="18" r="1.6" fill="${accent}" fill-opacity="0.10"/>
    </pattern>
  </defs>

  <rect width="800" height="280" fill="url(#g)"/>
  <rect width="800" height="280" fill="url(#lattice)"/>
  <rect width="800" height="280" fill="url(#glow)"/>

  <!-- table -->
  <rect x="250" y="96" width="300" height="150" rx="18" fill="#0b6449"/>
  <rect x="250" y="96" width="300" height="150" rx="18" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="2"/>
  <rect x="286" y="128" width="228" height="86" rx="10" fill="#052a1f" fill-opacity="0.55"/>

  <!-- four tile backs around the table -->
  <g>
    <rect x="286" y="76" width="44" height="30" rx="6" fill="#fdfaf0"/>
    <rect x="340" y="76" width="44" height="30" rx="6" fill="#fdfaf0"/>
    <rect x="286" y="236" width="44" height="30" rx="6" fill="#fdfaf0"/>
    <rect x="340" y="236" width="44" height="30" rx="6" fill="#fdfaf0"/>
    <rect x="416" y="76" width="44" height="30" rx="6" fill="#fdfaf0"/>
    <rect x="470" y="76" width="44" height="30" rx="6" fill="#fdfaf0"/>
    <rect x="416" y="236" width="44" height="30" rx="6" fill="#fdfaf0"/>
    <rect x="470" y="236" width="44" height="30" rx="6" fill="#fdfaf0"/>
  </g>

  <!-- centre tile -->
  <g transform="translate(368 150) rotate(-6)">
    <rect x="0" y="8" width="64" height="60" rx="9" fill="#c9b98d"/>
    <rect x="0" y="0" width="64" height="60" rx="9" fill="#fdfaf0"/>
    <circle cx="32" cy="30" r="13" fill="#0e7c5a"/>
    <circle cx="32" cy="30" r="6" fill="#fdfaf0" fill-opacity="0.92"/>
  </g>

  ${label ? `<text x="40" y="248" font-family="Georgia, serif" font-size="20" fill="#f0d9a8" fill-opacity="0.75">${label}</text>` : ""}
</svg>
`;
}

fs.writeFileSync(`${out}/angin-timur.svg`, banner({ label: "Angin Timur" }), "utf8");
fs.writeFileSync(`${out}/mahjongqu.svg`, banner({ base: "#094e39", accent: "#f0d9a8", label: "Venue demo" }), "utf8");

console.log("wrote 2 banners to", out);
