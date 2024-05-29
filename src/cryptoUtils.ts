import { loadConfig } from './loadConfig.js';
import { Config } from './config.js';
import { createCipheriv, createDecipheriv } from 'node:crypto';

const config: Config = loadConfig();

// Define return types and parameter types for the functions
export function encrypt(text: string): string | undefined {
  try {
    const cipher = createCipheriv(
      config.encryptionAlgorithm,
      Buffer.from(config.encryptionKey),
      config.iv
    );
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (error: any) {
    console.error("Error during encryption:", error.message);
    return undefined;
  }
}

export function decrypt(text: string): string | undefined {
  try {
    const decipher = createDecipheriv(
      config.encryptionAlgorithm,
      Buffer.from(config.encryptionKey),
      config.iv
    );

    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error: any) {
    console.error("Error during decryption:", error.message);
    return undefined;
  }
}
