import fs from "node:fs";
import path from "node:path";

const dir = "assets/logo";
for (const f of fs.readdirSync(dir)) {
  const p = path.join(dir, f);
  const s = fs.readFileSync(p, "utf8");
  const issues = [];
  if (!s.trimStart().startsWith("<svg")) issues.push("no-svg-root");
  if (!s.trimEnd().endsWith("</svg>")) issues.push("no-close");
  if (!s.includes("\u98A8")) issues.push("no-glyph");
  // crude tag balance
  const open = (s.match(/<(?!\/)[a-zA-Z]/g) || []).length;
  const close = (s.match(/<\/[a-zA-Z]/g) || []).length;
  const self = (s.match(/\/>/g) || []).length;
  if (open !== close + self) issues.push(`unbalanced o${open} c${close} s${self}`);
  console.log(f.padEnd(46), issues.length ? "FAIL " + issues.join(",") : "ok");
}
