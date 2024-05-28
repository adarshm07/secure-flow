#!/usr/bin/env node

import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";

const configContent = `module.exports = {
  encryptionAlgorithm: 'aes-256-cbc',
  encryptionKey: 'your-32-character-encryption-key',
  iv: Buffer.from('your-16-character-iv'),
};
`;

const configPath = resolve(process.cwd(), "secureflow.config.ts");

if (existsSync(configPath)) {
  console.error("secureflow.config.ts already exists in the root directory.");
  process.exit(1);
}

writeFileSync(configPath, configContent, "utf8");
console.log("secureflow.config.ts has been created successfully.");
