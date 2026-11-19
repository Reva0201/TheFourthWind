import fs from "node:fs";

/* Mabar card visibility, scanned from every directory venue page. */
const MABAR_ON = new Set([
  "369-mahjong-lounge-pik-2","alpes-gaming-cafe","arcanum-hobbies-bintaro-dragon-house",
  "arcanum-hobbies-taman-puring","batavia-mahjong-circle-at-hotel-des-indes-menteng",
  "castle-8-boardgame-cafe","clue-board-game-cafe","dice-boardgame-kitchen",
  "didadu-boardgame-arena-cafe","domain-board-game-cafe","dots-board-game-cafe",
  "doublexp-board-game-cafe","eat-and-play-cafe","facai-mahjong-lounge",
  "game-start-chill-station","gameopoly-board-game-cafe","gerberas-corner",
  "go-mahjong-alam-sutera-kula-courts","goblin-hut-board-game-ground",
  "good-game-board-game-cafe-store","grouplay-boardgame-shop-gandaria-city",
  "hobby-hub-boardgame-mahjong","hompimpa-board-game-cafe","hopeng-mahjong-parlor",
  "hu-mahjong-place","ichigo-ichie-board-games-cafe","justy-juice-cafe-and-board-game",
  "king-mahjong-gs","komunitas-riichi-mahjong-jakarta","lai-mahjong",
  "lugua-board-game-grand-indonesia","mahjong-class-at-tmg-hotel-tebet-kanteen-co",
  "mahjong-master-88","maze-board-game-cafe","meeple-story-board-game-cafe",
  "midgard-games-and-cafe","monopolis-board-game-store-cafe-hub-harapan-indah",
  "natural-twenty-boardgame-cafe","nongkee-house","nws-corner","oryx-boardgame-lounge",
  "othello-indonesia","papan-hobbies-board-game-cafe-bsd","papan-hobbies-cafe-and-co-hub",
  "play-mahjong","pong-mahjong-jakarta","pong-dragon-mahjong-citra-8",
  "pong-dragon-mahjong-gading-serpong","royal-gaming","rumah-maciok-mahjong-parlor",
  "sini-duduk-hobby-store","space-padel-pik2","sumo-mahjong",
  "the-bunker-board-game-cafe-store","the-mahjong-circles",
  "the-quarters-board-game-lounge","the-tile-social-board-game-mahjong-lounge",
  "the-vault-board-game-cafe-jakarta","tomo-board-game-cafe",
  "tongkrongan-bo-gem-board-game-cafe-depok","tujiro-mahjong-club",
  "twins-board-game-cafe","valhalla-gaming-movie-cafe","wan-mahjong","yu-mahjong",
  "young-mahjong",
]);

const p = "venue-raw.json";
const data = JSON.parse(fs.readFileSync(p, "utf8"));

let on = 0, off = 0;
for (const v of data) {
  const show = MABAR_ON.has(v.s);
  v.mabar = show;
  show ? on++ : off++;
}

fs.writeFileSync(p, JSON.stringify(data, null, 1), "utf8");
console.log(`mabar card: ${on} on / ${off} off (of ${data.length})`);
