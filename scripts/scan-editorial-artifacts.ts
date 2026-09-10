import fs from "fs";
import path from "path";

interface Candidate {
  file: string;
  line: number;
  category: "UI_DIRECTIVE" | "AI_CLICHE" | "COLON_LEAD_IN" | "CONVERSATIONAL_LEAK";
  pattern: string;
  text: string;
}

const UI_DIRECTIVE_PATTERNS = [
  { name: "select_below", regex: /\bselect\s+(?:a|an|the|any)\b.*?\b(?:below|here|above|following)\b/i },
  { name: "choose_below", regex: /\bchoose\s+(?:a|an|the|any)\b.*?\b(?:below|here|above|following)\b/i },
  { name: "click_to", regex: /\bclick\s+(?:here|below|on|any)\b/i },
  { name: "navigate_to", regex: /\bnavigate\s+(?:to|through|below|their)\b/i },
  { name: "browse_below", regex: /\bbrowse\s+(?:through|below|our)\b/i },
  { name: "explore_our", regex: /\bexplore\s+(?:our|the\s+following|this)\b/i },
  { name: "below_find", regex: /\b(?:below|here)\s+you\s+will\s+find\b/i },
  { name: "read_below", regex: /\bread\s+below\b/i },
  { name: "step_into", regex: /\bstep\s+into\b/i },
  { name: "journey_through", regex: /\bjourney\s+through\b/i },
  { name: "immerse_yourself", regex: /\bimmerse\s+yourself\b/i },
  { name: "invites_you", regex: /\binvites?\s+you\s+to\b/i },
];

const AI_CLICHE_PATTERNS = [
  { name: "testament_to", regex: /\b(?:stands?\s+as\s+(?:an?|a\s+living)\s+)?testament\s+to\b/i },
  { name: "rich_tapestry", regex: /\b(?:rich\s+)?tapestry\b/i },
  { name: "beacon_of", regex: /\bbeacon\s+of\b/i },
  { name: "delve_into", regex: /\bdelve(?:s|d)?\s+into\b/i },
  { name: "seamlessly", regex: /\bseamless(?:ly)?\b/i },
  { name: "embark_on", regex: /\bembark(?:s|ed|ing)?\s+on\b/i },
  { name: "crucial_role", regex: /\b(?:plays?\s+a\s+)?(?:crucial|pivotal|vital)\s+role\b/i },
  { name: "foster_deep", regex: /\bfoster(?:s|ed|ing)?\s+(?:a\s+)?(?:deep|greater)\b/i },
  { name: "vibrant_heart", regex: /\bvibrant\s+(?:tapestry|heart|hub|center)\b/i },
  { name: "unique_blend", regex: /\bunique\s+blend\b/i },
  { name: "rich_history", regex: /\brich\s+(?:history|tradition|heritage)\b/i },
  { name: "provides_glimpse", regex: /\bprovides?\s+a\s+glimpse\b/i },
  { name: "boasts_a", regex: /\bboasts?\s+(?:a|an)\b/i },
  { name: "nestled_in", regex: /\bnestled\s+(?:in|within|among|at)\b/i },
];

const CONVERSATIONAL_LEAK_PATTERNS = [
  { name: "whether_you_are", regex: /\bwhether\s+you\s+(?:are|'re)\b/i },
  { name: "if_you_are_looking", regex: /\bif\s+you\s+(?:are\s+looking|wish|seek)\b/i },
  { name: "feel_free_to", regex: /\bfeel\s+free\s+to\b/i },
  { name: "take_a_look", regex: /\btake\s+a\s+(?:look|deep\s+dive)\b/i },
  { name: "dive_in", regex: /\bdive\s+(?:in|into|deeper)\b/i },
  { name: "look_no_further", regex: /\blook\s+no\s+further\b/i },
  { name: "it_is_worth_noting", regex: /\bit\s+(?:is\s+worth|should\s+be)\s+not(?:ed|ing)\b/i },
];

function scanDirectory(dir: string, fileList: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== "dist" && entry.name !== ".git") {
        scanDirectory(fullPath, fileList);
      }
    } else if (/\.(astro|ts|tsx|md)$/.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = scanDirectory(path.resolve("src"));
const candidates: Candidate[] = [];

for (const file of files) {
  const relativePath = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, "utf-8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const lineNum = i + 1;

    // Ignore comments, imports, script tags, style tags
    if (
      trimmed.startsWith("//") ||
      trimmed.startsWith("/*") ||
      trimmed.startsWith("*") ||
      trimmed.startsWith("import ") ||
      trimmed.startsWith("<!--")
    ) {
      continue;
    }

    // Check UI Directives
    for (const p of UI_DIRECTIVE_PATTERNS) {
      if (p.regex.test(trimmed)) {
        candidates.push({
          file: relativePath,
          line: lineNum,
          category: "UI_DIRECTIVE",
          pattern: p.name,
          text: trimmed,
        });
      }
    }

    // Check AI Cliches
    for (const p of AI_CLICHE_PATTERNS) {
      if (p.regex.test(trimmed)) {
        candidates.push({
          file: relativePath,
          line: lineNum,
          category: "AI_CLICHE",
          pattern: p.name,
          text: trimmed,
        });
      }
    }

    // Check Conversational Leaks
    for (const p of CONVERSATIONAL_LEAK_PATTERNS) {
      if (p.regex.test(trimmed)) {
        candidates.push({
          file: relativePath,
          line: lineNum,
          category: "CONVERSATIONAL_LEAK",
          pattern: p.name,
          text: trimmed,
        });
      }
    }

    // Check Colon Lead-Ins before grids or lists:
    if (
      /^[<"'].*:\s*[>"']?$/.test(trimmed) &&
      !trimmed.includes("http") &&
      !trimmed.includes("var(") &&
      !trimmed.includes("aspect-") &&
      (trimmed.startsWith("<p") || trimmed.includes("lede=") || trimmed.includes("lead"))
    ) {
      candidates.push({
        file: relativePath,
        line: lineNum,
        category: "COLON_LEAD_IN",
        pattern: "colon_introducer",
        text: trimmed,
      });
    }
  }
}

// Write output
const outPath = path.resolve("scratch/editorial_candidates.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(candidates, null, 2), "utf-8");

console.log(`Scan completed. Found ${candidates.length} editorial candidates across ${files.length} files.`);
console.log(`Saved results to ${outPath}`);
