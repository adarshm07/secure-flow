// cryptoUtils.js
import crypto from "crypto";
import { config } from "./config.js";
const { encryptionAlgorithm, encryptionKey, iv } = config;

export function encrypt(text) {
  try {
    const cipher = crypto.createCipheriv(
      encryptionAlgorithm,
      Buffer.from(encryptionKey),
      iv
    );
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (error) {
    console.log("error =====", error.message);
  }
}

export function decrypt(text) {
  try {
    const decipher = crypto.createDecipheriv(
      encryptionAlgorithm,
      Buffer.from(encryptionKey),
      iv
    );

    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.log("error ============", error.message);
  }
}
