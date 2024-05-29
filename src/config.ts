export const defaultConfig = {
  encryptionAlgorithm: "aes-256-cbc",
  encryptionKey: "", // Must be 32 characters
  iv: Buffer.from(""),
};

export type Config = typeof defaultConfig;
