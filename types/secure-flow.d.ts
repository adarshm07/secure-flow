// types/secure-flow.d.ts

declare module 'secure-flow' {
    export function encrypt(text: string): string;
    export function decrypt(text: string): string;

    export interface Config {
        encryptionAlgorithm: string;
        encryptionKey: string;
        iv: Buffer;
    }

    export function loadConfig(): Config;
}
