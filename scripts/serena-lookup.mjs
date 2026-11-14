import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const indexFile = path.join(rootDir, ".serena", "symbols.json");

if (!fs.existsSync(indexFile)) {
  console.error("Index not found. Please run 'npm run serena:index' first.");
  process.exit(1);
}

const symbols = JSON.parse(fs.readFileSync(indexFile, "utf-8"));
const query = process.argv[2];

if (!query) {
  console.log("Usage: node scripts/serena-lookup.mjs <SymbolNameOrKeyword>");
  console.log(`Indexed Symbols: ${symbols.totalSymbols}`);
  process.exit(0);
}

// 1. Exact O(1) Lookup
if (symbols.byName[query]) {
  const s = symbols.byName[query];
  console.log(`[Serena O(1) Hit] ${s.name}`);
  console.log(`  File:        ${s.file}#L${s.line}`);
  console.log(`  Type:        ${s.type}`);
  console.log(`  Category:    ${s.category}`);
  console.log(`  Description: ${s.description}`);
  process.exit(0);
}

// 2. Keyword Index Lookup
const lower = query.toLowerCase();
const matches = symbols.keywordIndex[lower] || [];

if (matches.length > 0) {
  console.log(`[Serena Keyword Hits for "${query}"] (${matches.length} matches):`);
  const uniqueNames = [...new Set(matches)];
  for (const name of uniqueNames) {
    const s = symbols.byName[name];
    console.log(`  • ${s.name} (${s.type}) -> ${s.file}#L${s.line}`);
  }
  process.exit(0);
}

// 3. Substring search fallback
const fallback = Object.values(symbols.byName).filter(
  (s) =>
    s.name.toLowerCase().includes(lower) ||
    s.description.toLowerCase().includes(lower) ||
    s.file.toLowerCase().includes(lower)
);

if (fallback.length > 0) {
  console.log(`[Serena Fuzzy Matches for "${query}"] (${fallback.length} found):`);
  for (const s of fallback) {
    console.log(`  • ${s.name} (${s.type}) -> ${s.file}#L${s.line}`);
  }
} else {
  console.log(`[Serena] No symbol matching "${query}" found.`);
}

