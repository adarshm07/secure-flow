import { Config, defaultConfig } from './config.js';
import path from 'path';
import fs from 'fs';

export function loadConfig(): Config {
    let customConfigPath: string;
    // const args = process.argv.slice(2);
    let configPath = path.resolve(process.cwd(), 'tsconfig.json');

    if (fs.existsSync(configPath)) {
        customConfigPath = path.resolve(process.cwd(), 'secureflow.config.ts');
    } else {
        customConfigPath = path.resolve(process.cwd(), 'secureflow.config.cjs');
    }

    if (fs.existsSync(customConfigPath)) {
        const customConfig = require(customConfigPath).default || require(customConfigPath);
        return { ...defaultConfig, ...customConfig };
    } else {
        throw new Error(`No config file found at ${customConfigPath}`);
    }
}
