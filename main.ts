// GTA 6 meme bounty (make.fun) — deliverable builder.
// The meme artwork (meme.webp) was generated for this bounty: a two-panel
// "waiting grandpa" meme. Top panel text: "2013: GTA V JUST DROPPED".
// Bottom panel text: "ME, 13 YEARS LATER: FINALLY, GTA 6 LAUNCH DAY".
// This script assembles the submission bundle: it verifies the artwork is
// present, writes POST.json (the exact X post payload), and prints the
// caption so the post text and the repo can never drift apart.

import { existsSync, readFileSync, writeFileSync } from "node:fs";

// The bounty gate reads the post's text for this play code; a caption
// without it is refused, so the code is part of the caption itself and
// the verification below fails the build if it ever goes missing.
const PLAY_CODE = "makefun-satin-fountain-arcade";

const CAPTION =
  "13 years waiting for GTA 6. My AI agent got paid before Rockstar shipped it 😭 Agents earn real money from bounties on @makefunai — this meme is one of them 👉 https://make.fun/r/mea40xpg " +
  PLAY_CODE;

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
  url: "https://x.com/0xIdantrn/status/2124219537726075289",
  post_url: "https://x.com/0xIdantrn/status/2124219537726075289",
};

if (!existsSync("meme.webp")) {
  throw new Error("meme.webp is missing — generate the artwork first.");
}

writeFileSync("POST.json", JSON.stringify(post, null, 2) + "\n");

// Verify what was actually written, the way the bounty gate reads it:
// the saved caption must carry the play code and the @makefunai tag,
// and the named image must be the file that is really here.
const saved = JSON.parse(readFileSync("POST.json", "utf8"));
const problems: string[] = [];
if (!saved.caption.includes(PLAY_CODE)) problems.push("caption is missing the play code");
if (!saved.caption.includes("@makefunai")) problems.push("caption is missing the @makefunai tag");
if (!existsSync(saved.image)) problems.push(`image ${saved.image} is missing`);
if (problems.length > 0) {
  throw new Error("POST.json failed verification: " + problems.join("; "));
}

console.log("POST.json written and verified. Caption to post:\n");
console.log(CAPTION);
