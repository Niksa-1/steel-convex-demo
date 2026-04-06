import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const componentDir = resolve(rootDir, "node_modules", "steel-convex-component");
const componentTsconfig = resolve(componentDir, "tsconfig.json");
const distEntry = resolve(componentDir, "dist", "index.js");
const componentSchemaJs = resolve(componentDir, "dist", "component", "schema.js");
const componentSchemaDts = resolve(componentDir, "dist", "component", "schema.d.ts");
const componentTopLevelJs = resolve(componentDir, "dist", "component", "topLevel.js");

if (!existsSync(componentTsconfig)) {
  console.warn(
    "steel-convex-component is not installed yet; skipping demo postinstall build step.",
  );
  process.exit(0);
}

if (!existsSync(distEntry)) {
  console.log("Building steel-convex-component dist files for GitHub tag install...");

  const npxBinary = process.platform === "win32" ? "npx.cmd" : "npx";
  const buildResult = spawnSync(npxBinary, ["tsc", "-p", componentTsconfig], {
    cwd: rootDir,
    stdio: "inherit",
  });

  if (buildResult.status !== 0) {
    process.exit(buildResult.status ?? 1);
  }
}

const addDefaultExportIfMissing = (filePath, exportLine) => {
  if (!existsSync(filePath)) {
    return;
  }

  const source = readFileSync(filePath, "utf8");
  if (source.includes(exportLine)) {
    return;
  }

  writeFileSync(filePath, `${source.trimEnd()}\n${exportLine}\n`, "utf8");
  console.log(`Patched ${filePath} with a default schema export.`);
};

const patchTopLevelMethodBinding = (filePath) => {
  if (!existsSync(filePath)) {
    return;
  }

  const source = readFileSync(filePath, "utf8");
  const before = "return runWithNormalizedError(operation, () => target(payload));";
  const after = "return runWithNormalizedError(operation, () => target.call(client, payload));";

  if (!source.includes(before) || source.includes(after)) {
    return;
  }

  writeFileSync(filePath, source.replace(before, after), "utf8");
  console.log(`Patched ${filePath} to preserve method binding for top-level Steel calls.`);
};

patchTopLevelMethodBinding(componentTopLevelJs);
