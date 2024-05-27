import crypto from "crypto";
import { config } from "./config.js";

const { encryptionAlgorithm, encryptionKey, iv } = config;

// Define return types and parameter types for the functions
export function encrypt(text: string): string | undefined {
  try {
    const cipher = crypto.createCipheriv(
      encryptionAlgorithm,
      Buffer.from(encryptionKey),
      iv
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
    const decipher = crypto.createDecipheriv(
      encryptionAlgorithm,
      Buffer.from(encryptionKey),
      iv
    );

    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error: any) {
    console.error("Error during decryption:", error.message);
    return undefined;
  }
}
