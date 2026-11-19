/* Extract a page's structure: section order, headings, key copy, controls.
   Usage: node audit-extract.mjs <url> <outfile> */

const url = process.argv[2];
const outFile = process.argv[3];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const html = await (await fetch(url, { headers: { "user-agent": UA } })).text();

// Pull the Inertia payload for content checks
let payload = null;
const m = html.match(/data-page="app" type="application\/json">([\s\S]*?)<\/script>/);
if (m) {
  try {
    payload = JSON.parse(m[1]);
  } catch {
    payload = null;
  }
}

// The body is client-rendered, so record what the server says is there.
const result = {
  url,
  status: 200,
  component: payload?.component ?? null,
  propKeys: payload ? Object.keys(payload.props ?? {}) : [],
  title: payload?.props?.seo?.full_title ?? null,
  description: payload?.props?.seo?.description ?? null,
  noindex: payload?.props?.seo?.noindex ?? null,
  htmlLen: html.length,
};

console.log(JSON.stringify(result, null, 2));
if (outFile) {
  const fs = await import("node:fs");
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
}
