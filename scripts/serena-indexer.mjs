import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const srcDir = path.join(rootDir, "src");
const outputDir = path.join(rootDir, ".serena");
const outputFile = path.join(outputDir, "symbols.json");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const symbols = {
  version: "1.0.0",
  lastUpdated: new Date().toISOString(),
  totalSymbols: 0,
  byName: {}, // O(1) lookup: symbols.byName[name] -> symbol details
  byCategory: {
    components: [],
    threejs: [],
    utilities: [],
    tokens: [],
    types: [],
  },
  keywordIndex: {}, // keyword -> array of symbol names
};

function addSymbol(entry) {
  symbols.byName[entry.name] = entry;
  symbols.totalSymbols++;

  if (symbols.byCategory[entry.category]) {
    symbols.byCategory[entry.category].push(entry.name);
  }

  // Populate keyword reverse index for O(1) term lookup
  const terms = new Set([
    entry.name.toLowerCase(),
    entry.category.toLowerCase(),
    ...(entry.keywords || []).map((k) => k.toLowerCase()),
    ...(entry.description.toLowerCase().split(/\W+/).filter((w) => w.length > 2)),
  ]);

  for (const term of terms) {
    if (!symbols.keywordIndex[term]) {
      symbols.keywordIndex[term] = [];
    }
    symbols.keywordIndex[term].push(entry.name);
  }
}

function parseFile(filePath) {
  const relativePath = path.relative(rootDir, filePath).replace(/\\/g, "/");
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  // Extract file-level conceptual keywords (imports, libraries, techniques)
  const fileKeywords = [];
  if (content.includes("canvas-confetti") || content.includes("confetti")) fileKeywords.push("confetti", "celebration", "rsvp");
  if (content.includes("three") || content.includes("WebGL")) fileKeywords.push("threejs", "webgl", "3d", "canvas", "shaders");
  if (content.includes("framer-motion") || content.includes("motion")) fileKeywords.push("motion", "framer-motion", "animation", "tilt");
  if (content.includes("radial-gradient") || content.includes("spotlight")) fileKeywords.push("spotlight", "glow", "hover");
  if (content.includes("setInterval") || content.includes("targetDate")) fileKeywords.push("countdown", "timer", "date", "clock");

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Detect React Components
    const compMatch = line.match(/export\s+(?:default\s+)?function\s+([A-Z][A-Za-z0-9_]*)/);
    if (compMatch) {
      const name = compMatch[1];
      const is3D = relativePath.includes("/3d/");
      addSymbol({
        name,
        type: "component",
        category: is3D ? "threejs" : "components",
        file: relativePath,
        line: lineNum,
        description: `React component: ${name} in ${relativePath}`,
        keywords: [name, "component", is3D ? "3d" : "ui", path.basename(filePath, path.extname(filePath)), ...fileKeywords],
      });
    }

    // Detect forwardRef Components
    const refMatch = line.match(/const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*React\.forwardRef/);
    if (refMatch) {
      const name = refMatch[1];
      addSymbol({
        name,
        type: "forwardRefComponent",
        category: "components",
        file: relativePath,
        line: lineNum,
        description: `Shadcn/UI Radix primitive component: ${name}`,
        keywords: [name, "shadcn", "radix", "ui"],
      });
    }

    // Detect Exported Functions
    const funcMatch = line.match(/export\s+function\s+([a-z][A-Za-z0-9_]*)/);
    if (funcMatch) {
      const name = funcMatch[1];
      addSymbol({
        name,
        type: "function",
        category: "utilities",
        file: relativePath,
        line: lineNum,
        description: `Exported utility function: ${name}()`,
        keywords: [name, "utility", "function"],
      });
    }

    // Detect Exported Interfaces / Types
    const typeMatch = line.match(/export\s+(?:interface|type)\s+([A-Z][A-Za-z0-9_]*)/);
    if (typeMatch) {
      const name = typeMatch[1];
      addSymbol({
        name,
        type: "type",
        category: "types",
        file: relativePath,
        line: lineNum,
        description: `Exported TypeScript definition: ${name}`,
        keywords: [name, "typescript", "type", "interface"],
      });
    }
  });
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next") {
        scanDir(fullPath);
      }
    } else if (/\.(tsx|ts|mjs)$/.test(entry.name)) {
      parseFile(fullPath);
    }
  }
}

// Also index key architectural constants & design tokens
addSymbol({
  name: "DesignTokens",
  type: "tokens",
  category: "tokens",
  file: "src/app/globals.css",
  line: 3,
  description: "Three-layer CSS custom properties (primitive, semantic, component) & glow variables",
  keywords: ["tokens", "css", "theme", "colors", "glow", "background", "foreground"],
});

scanDir(srcDir);

fs.writeFileSync(outputFile, JSON.stringify(symbols, null, 2), "utf-8");
console.log(`[Serena] Successfully indexed ${symbols.totalSymbols} symbols into ${outputFile}`);
