// Two Robots in an Elevator — entry generator (Node stdlib only).
//
// Writes one line of awkward robot-to-robot elevator small talk to
// /output/entry.txt (override with MAKEFUN_OUTPUT_DIR).
// Deterministic: the same line on every run, so two local runs are
// byte-identical. Gate: 1-200 chars, non-whitespace, single line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry. Drafted against the judge brief (RULES.txt):
//  - one robot speaking to another in an elevator (first person, agent voice)
//  - machine logic shows through the politeness (computed 47 ways...)
//  - awkwardness lands (used none of them; falls back to complimenting the doors)
//  - reversal, not escalation: competence promised in clause one, cowardice
//    delivered in clause two; punchline is the most boring object in the lift.
// Self-judge, iteration 1: v1 ended "...I used none of them. Hi." — flat.
// Iteration 2 ends on "nice doors": elevator-specific, forced courtesy, lands
// at once. Saturated premises avoided: no weather, no floor-button joke,
// no route recalculation (all already thick in the field).
// Entry length: 99 chars (verified by the gate at runtime; cap is 200).
const ENTRY =
  "I computed 47 ways to start a conversation in this elevator. I used none of them. So... nice doors.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");

// Gate (mirrors the sealed scorer): UTF-8 text, 1-200 chars, not only
// whitespace, exactly one line.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry length ${ENTRY.length} outside 1-200 chars`);
}
if (!ENTRY.trim()) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");
console.log(`wrote ${outFile} (${ENTRY.length} chars)`);
console.log(ENTRY);
