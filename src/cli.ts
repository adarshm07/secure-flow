import fs from 'fs';
import path from 'path';

const __dirName = process.env.INIT_CWD;

const configContent = `module.exports = {
  encryptionAlgorithm: 'aes-256-cbc',
  encryptionKey: 'your-32-character-encryption-key',
  iv: Buffer.from('your-16-character-iv'),
};
`;

console.log("Postinstall script is running");
// Determine the paths
const isTsFile = path.resolve(__dirName, 'tsconfig.json');

let configPath: string;

if (fs.existsSync(isTsFile)) {
    configPath = path.resolve(__dirName, 'secureflow.config.ts');
} else {
    configPath = path.resolve(__dirName, 'secureflow.config.cjs');
}

// Check if the config file already exists
if (fs.existsSync(configPath)) {
    console.log(fs.existsSync(isTsFile) ? 'secureflow.config.ts already exists in the root directory.' : 'secureflow.config.cjs already exists in the root directory.');
    process.exit(1);
} else {
    fs.writeFileSync(configPath, configContent, 'utf8');
    console.log(fs.existsSync(isTsFile) ? 'secureflow.config.ts has been created successfully.' : 'secureflow.config.cjs has been created successfully.');
}
