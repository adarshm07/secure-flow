#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const configContent = `module.exports = {
  encryptionAlgorithm: 'aes-256-cbc',
  encryptionKey: 'your-32-character-encryption-key',
  iv: Buffer.from('your-16-character-iv'),
};
`;

const args = process.argv.slice(2);

let fileType = "javascript"; // Default to JavaScript

if (args.includes("--typescript")) {
  fileType = "ts";
} else if (args.includes("--javascript")) {
  fileType = "js";
} else {
  console.error("Invalid argument. Use --typescript or --javascript.");
  process.exit(1);
}

// Determine the config file path based on the fileType
const configFileName = `secureflow.config.${fileType}`;
const configPath = path.resolve(process.cwd(), configFileName);

// Check if config file already exists
if (fs.existsSync(configPath)) {
  console.error(`${configFileName} already exists in the root directory.`);
  process.exit(1);
}

fs.writeFileSync(configPath, configContent, "utf8");
console.log("secureflow.config.ts has been created successfully.");
