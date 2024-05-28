#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const configContent = `module.exports = {
  encryptionAlgorithm: 'aes-256-cbc',
  encryptionKey: 'your-32-character-encryption-key',
  iv: Buffer.from('your-16-character-iv'),
};
`;

const configPath = path.resolve(process.cwd(), "secureflow.config.ts");

if (fs.existsSync(configPath)) {
  console.error("secureflow.config.ts already exists in the root directory.");
  process.exit(1);
}

fs.writeFileSync(configPath, configContent, "utf8");
console.log("secureflow.config.ts has been created successfully.");
