import { createCipheriv, createDecipheriv } from 'crypto';
import { loadConfig } from './loadConfig.js';
import { Config } from './config.js';

let config: Config;

async function initConfig(): Promise<void> {
  config = await loadConfig();
}

export async function encrypt(text: string): Promise<string | undefined> {
  if (!config) await initConfig();
  try {
    const cipher = createCipheriv(
      config.encryptionAlgorithm,
      Buffer.from(config.encryptionKey),
      config.iv
    );
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (error) {
    console.error("Error during encryption:", (error as Error).message);
    return undefined;
  }
}

export async function decrypt(text: string): Promise<string | undefined> {
  if (!config) await initConfig();
  try {
    const decipher = createDecipheriv(
      config.encryptionAlgorithm,
      Buffer.from(config.encryptionKey),
      config.iv
    );

    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Error during decryption:", (error as Error).message);
    return undefined;
  }
}