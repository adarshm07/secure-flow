import { randomBytes } from "node:crypto";

// Generate a 32-byte (256-bit) key
const encryptionKey = randomBytes(32).toString('hex').slice(0, 32);

// Generate a 16-byte (128-bit) IV
const iv = randomBytes(16).toString('hex').slice(0, 16);

console.log('Encryption Key:', encryptionKey);
console.log('IV:', iv);