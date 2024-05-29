import { Config } from './config.js';
import path from 'path';
import fs from 'fs';

export function loadConfig(): Config {
    let customConfigPath: string;
    const args = process.argv.slice(2);

    if (args.includes('--typescript')) {
        customConfigPath = path.resolve(process.cwd(), 'secureflow.config.ts');
    } else if (args.includes('--javascript')) {
        customConfigPath = path.resolve(process.cwd(), 'secureflow.config.cjs');
    } else {
        // Default to JavaScript if no argument is provided
        customConfigPath = path.resolve(process.cwd(), 'secureflow.config.cjs');
    }

    if (fs.existsSync(customConfigPath)) {
        const customConfig = require(customConfigPath).default || require(customConfigPath);
        return { ...customConfig };
    } else {
        throw new Error(`No config file found at ${customConfigPath}`);
    }
}
