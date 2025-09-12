import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.argv[2] || "local";
const src = path.resolve(__dirname, `../env-config.${env}.json`);
const dest = path.resolve(__dirname, "../public/env-config.json");

if (!fs.existsSync(src)) {
  console.error(`Config file not found: ${src}`);
  process.exit(1);
}

fs.copyFileSync(src, dest);
console.log(`Copied ${src} to ${dest}`);
