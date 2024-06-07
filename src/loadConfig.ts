import { Config, defaultConfig } from './config.js';
import path from 'path';
import fs from 'fs';

export async function loadConfig(): Promise<Config> {
    let customConfigPath: string;
    let configPath = path.resolve(process.cwd(), 'tsconfig.json');

    if (fs.existsSync(configPath)) {
        customConfigPath = path.resolve(process.cwd(), 'secureflow.config.ts');
    } else {
        customConfigPath = path.resolve(process.cwd(), 'secureflow.config.cjs');
    }

    if (fs.existsSync(customConfigPath)) {
        const module = await import(customConfigPath);
        let customConfig = module.default || module;
        return { ...defaultConfig, ...customConfig } as Config;
    } else {
        throw new Error(`No config file found at ${customConfigPath}`);
    }
}
