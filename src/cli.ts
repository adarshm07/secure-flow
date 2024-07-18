import fs from 'fs';
import path from 'path';

const __dirName = process.env.INIT_CWD || '';

const configContent = `import { Config } from 'your-package-name';

const config: Config = {
  encryptionAlgorithm: 'aes-256-cbc',
  encryptionKey: 'your-32-character-encryption-key',
  iv: Buffer.from('your-16-character-iv'),
};

export default config;
`;

console.log("Postinstall script is running");
// Determine the paths
const isTsFile = path.resolve(__dirName, 'tsconfig.json');

let configPath: string;

if (fs.existsSync(isTsFile)) {
    configPath = path.resolve(__dirName, 'secureflow.config.ts');
} else {
    configPath = path.resolve(__dirName, 'secureflow.config.js');
}

// Check if the config file already exists
if (fs.existsSync(configPath)) {
    console.log(`${path.basename(configPath)} already exists in the root directory.`);
} else {
    fs.writeFileSync(configPath, configContent, 'utf8');
    console.log(`${path.basename(configPath)} has been created successfully.`);
}