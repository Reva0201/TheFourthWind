import fs from "node:fs";
const buf = fs.readFileSync("assets/logo/mark-light.svg");
const s = buf.toString("utf8");
const m = s.match(/font-size="52"[^>]*>([^<]*)</);
console.log("glyph text:", JSON.stringify(m && m[1]));
console.log("codepoints:", m ? Array.from(m[1]).map((c) => c.codePointAt(0).toString(16)) : null);
console.log("file bytes:", buf.length);
