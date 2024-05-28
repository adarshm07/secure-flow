export const defaultConfig = {
  encryptionAlgorithm: "aes-256-cbc",
  encryptionKey: "12345678901234567890123456789012", // Must be 32 characters
  iv: Buffer.from("1234567890123456"),
};

export type Config = typeof defaultConfig;
