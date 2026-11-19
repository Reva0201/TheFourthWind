import fs from "node:fs";

const pages = {
  home: "https://mahjongqu.com/",
  mabar: "https://mahjongqu.com/mabar",
  mabarVenue: "https://mahjongqu.com/venue/ANGNTM/mabar",
  venue: "https://mahjongqu.com/venue/angin-timur-mahjong-club",
  owners: "https://mahjongqu.com/untuk-pemilik",
  brand: "https://mahjongqu.com/brand",
  privasi: "https://mahjongqu.com/privasi",
  ketentuan: "https://mahjongqu.com/ketentuan",
};

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

fs.mkdirSync("ref", { recursive: true });

const OPEN = '<div id="app">';

for (const [name, url] of Object.entries(pages)) {
  const res = await fetch(url, { headers: { "user-agent": UA } });
  const html = await res.text();
  const start = html.indexOf(OPEN);
  let body = "";
  if (start !== -1) {
    let i = start + OPEN.length;
    let depth = 1;
    while (i < html.length && depth > 0) {
      if (html.startsWith("<div", i)) depth++;
      else if (html.startsWith("</div>", i)) depth--;
      i += 1;
    }
    body = html.slice(start + OPEN.length, i - 6);
  }
  fs.writeFileSync(`ref/${name}.html`, body || "(no app found)");
  console.log(name.padEnd(12), res.status, String(body.length).padStart(7));
}
