import fs from "node:fs";

let s = fs.readFileSync("src/data.js", "utf8");

const start = s.indexOf("export const VENUES = [");
const end = s.indexOf("export const ROOM_TYPES");

if (start === -1 || end === -1) {
  console.error("markers not found", { start, end });
  process.exit(1);
}

const replacement =
  "/* The full 88-entry venue directory lives in its own module. */\n" +
  'export { VENUES } from "./venues.js";\n\n';

fs.writeFileSync("src/data.js", s.slice(0, start) + replacement + s.slice(end), "utf8");
console.log("data.js updated");
