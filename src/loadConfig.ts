import { defaultConfig, Config } from './config.js';
import path from 'path';
import fs from 'fs';

export function loadConfig(): Config {
    const customConfigPath = path.resolve(process.cwd(), 'secureflow.config.ts');
    if (fs.existsSync(customConfigPath)) {
        const customConfig = require(customConfigPath);
        return { ...defaultConfig, ...customConfig };
    } else {
        return defaultConfig;
    }
}
