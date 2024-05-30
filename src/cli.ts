import fs from 'fs';
import path from 'path';

const configContent = `module.exports = {
  encryptionAlgorithm: 'aes-256-cbc',
  encryptionKey: 'your-32-character-encryption-key',
  iv: Buffer.from('your-16-character-iv'),
};
`;
const args = process.argv.slice(2);

let configPath: string;
if (args.includes('--typescript')) {
    configPath = path.resolve(process.cwd(), 'secureflow.config.ts');
} else if (args.includes('--javascript')) {
    configPath = path.resolve(process.cwd(), 'secureflow.config.cjs');
} else {
    console.error('Invalid argument. Use --typescript or --javascript.', args);
    process.exit(1);
}

if (fs.existsSync(configPath)) {
    console.error(args.includes('--typescript') ? 'secureflow.config.ts already exists in the root directory.' : 'secureflow.config.cjs already exists in the root directory.');
    process.exit(1);
}

fs.writeFileSync(configPath, configContent, 'utf8');
console.log('secureflow.config.ts has been created successfully.');
