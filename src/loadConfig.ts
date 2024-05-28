import { defaultConfig, Config } from './config.js';
import path from 'path';
import fs from 'fs';

export function loadConfig(): Config {
    let customConfigPath: string;
    const args = process.argv.slice(2);

    if (args.includes('--typescript')) {
        customConfigPath = path.resolve(process.cwd(), 'secureflow.config.ts');
    } else if (args.includes('--javascript')) {
        customConfigPath = path.resolve(process.cwd(), 'secureflow.config.js');
    } else {
        // Default to JavaScript if no argument is provided
        customConfigPath = path.resolve(process.cwd(), 'secureflow.config.js');
    }

    if (fs.existsSync(customConfigPath)) {
        const customConfig = require(customConfigPath).default || require(customConfigPath);
        return { ...defaultConfig, ...customConfig };
    } else {
        return defaultConfig;
    }
}
