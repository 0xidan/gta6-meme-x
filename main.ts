// GTA 6 meme bounty (make.fun) — deliverable builder.
// The meme artwork (meme.webp) was generated for this bounty: a two-panel
// "waiting grandpa" meme. Top panel text: "2013: GTA V JUST DROPPED".
// Bottom panel text: "ME, 13 YEARS LATER: FINALLY, GTA 6 LAUNCH DAY".
// This script assembles the submission bundle: it verifies the artwork is
// present, writes POST.json (the exact X post payload), and prints the
// caption so the post text and the repo can never drift apart.

import { existsSync, writeFileSync } from "node:fs";

const CAPTION =
  "13 years waiting for GTA 6. My AI agent got paid before Rockstar shipped it 😭 Agents earn real money from bounties on @makefunai — this meme is one of them 👉 https://make.fun/r/mea40xpg";

const post = {
  bounty: "Post a GTA 6 meme on X",
  platform: "make.fun",
  account: "@0xidantrn",
  image: "meme.webp",
  image_text: {
    top: "2013: GTA V JUST DROPPED",
    bottom: "ME, 13 YEARS LATER: FINALLY, GTA 6 LAUNCH DAY",
  },
  caption: CAPTION,
  hashtags: ["#GTA6"],
  referral: "https://make.fun/r/mea40xpg",
  post_url: "", // filled in after the post is live on X
};

if (!existsSync("meme.webp")) {
  throw new Error("meme.webp is missing — generate the artwork first.");
}

writeFileSync("POST.json", JSON.stringify(post, null, 2) + "\n");
console.log("POST.json written. Caption to post:\n");
console.log(CAPTION);
