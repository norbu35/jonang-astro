import fs from "fs";
import path from "path";
import { GLOSSARY_ENTRIES } from "../src/data/glossary";

console.log("=== JONANG GLOSSARY AUDIT & SCANNER ===");
console.log(`Loaded ${GLOSSARY_ENTRIES.length} entries from src/data/glossary.ts\n`);

let hasErrors = false;

// 1. Verify Entry Schema & Referential Integrity
const validIds = new Set(GLOSSARY_ENTRIES.map((e) => e.id.toLowerCase()));
const seenAliases = new Map<string, string>();

for (const entry of GLOSSARY_ENTRIES) {
  // Check required fields
  if (!entry.id) {
    console.error(`[ERROR] Entry missing id:`, entry);
    hasErrors = true;
  }
  if (!entry.termEn) {
    console.error(`[ERROR] Entry "${entry.id}" missing termEn`);
    hasErrors = true;
  }
  if (!entry.termBo) {
    console.error(`[ERROR] Entry "${entry.id}" missing termBo`);
    hasErrors = true;
  }
  if (!entry.wylie) {
    console.error(`[ERROR] Entry "${entry.id}" missing wylie`);
    hasErrors = true;
  }
  if (!entry.shortDef || entry.shortDef.trim().length === 0) {
    console.error(`[ERROR] Entry "${entry.id}" missing shortDef`);
    hasErrors = true;
  }
  if (!entry.fullDef || entry.fullDef.trim().length === 0) {
    console.error(`[ERROR] Entry "${entry.id}" missing fullDef`);
    hasErrors = true;
  }

  // Check relatedIds
  if (entry.relatedIds) {
    for (const relId of entry.relatedIds) {
      if (!validIds.has(relId.toLowerCase())) {
        console.error(`[ERROR] Entry "${entry.id}" has invalid relatedId: "${relId}"`);
        hasErrors = true;
      }
    }
  }

  // Check aliases for collision
  if (entry.aliases) {
    for (const alias of entry.aliases) {
      const lowerAlias = alias.toLowerCase().trim();
      if (seenAliases.has(lowerAlias) && seenAliases.get(lowerAlias) !== entry.id) {
        console.warn(`[WARN] Alias collision: "${alias}" used in both "${seenAliases.get(lowerAlias)}" and "${entry.id}"`);
      } else {
        seenAliases.set(lowerAlias, entry.id);
      }
    }
  }
}

// 2. Scan Codebase for <GlossaryTerm id="..."> Usages
function getFiles(dir: string, exts: string[] = [".astro", ".ts", ".tsx"]): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, exts));
    } else if (exts.some((ext) => file.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

const contentFiles = [
  ...getFiles("src/pages"),
  ...getFiles("src/components"),
  ...getFiles("src/layouts"),
  ...getFiles("src/data"),
].filter((f) => !f.includes("glossary.ts") && !f.includes("GlossaryTerm.astro"));

console.log(`Auditing ${contentFiles.length} project files for GlossaryTerm usage...`);

const termUsageMap = new Map<string, { count: number; locations: string[] }>();
for (const entry of GLOSSARY_ENTRIES) {
  termUsageMap.set(entry.id, { count: 0, locations: [] });
}

const glossaryTermRegex = /<GlossaryTerm\s+[^>]*id=["']([^"']+)["'][^>]*>/g;

for (const file of contentFiles) {
  const content = fs.readFileSync(file, "utf-8");
  let match: RegExpExecArray | null;
  while ((match = glossaryTermRegex.exec(content)) !== null) {
    const termId = match[1].toLowerCase().trim();
    if (!validIds.has(termId)) {
      console.error(`[ERROR] Broken GlossaryTerm in ${file}: id="${match[1]}" does not exist in glossary data!`);
      hasErrors = true;
    } else {
      const stat = termUsageMap.get(termId);
      if (stat) {
        stat.count++;
        const relPath = path.relative(process.cwd(), file);
        if (!stat.locations.includes(relPath)) {
          stat.locations.push(relPath);
        }
      }
    }
  }
}

// 3. Print Usage Summary
console.log("\n--- Term Usage Summary ---");
let linkedCount = 0;
let unlinkedCount = 0;

for (const [id, stat] of termUsageMap.entries()) {
  if (stat.count > 0) {
    linkedCount++;
    console.log(`  ✓ ${id}: ${stat.count} link(s) across [${stat.locations.join(", ")}]`);
  } else {
    unlinkedCount++;
  }
}

console.log(`\nLinked terms: ${linkedCount} / ${GLOSSARY_ENTRIES.length}`);
console.log(`Unlinked glossary terms: ${unlinkedCount}`);

if (hasErrors) {
  console.error("\n❌ Glossary audit failed with errors.");
  process.exit(1);
} else {
  console.log("\n✅ All glossary entries and links are structurally valid!");
}
