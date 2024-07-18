import { encrypt as nodeEncrypt, decrypt as nodeDecrypt } from './nodeCryptoUtils.js';
import { encrypt as browserEncrypt, decrypt as browserDecrypt } from './browserCryptoUtils.js';

export const encrypt = typeof window === 'undefined' ? nodeEncrypt : browserEncrypt;
export const decrypt = typeof window === 'undefined' ? nodeDecrypt : browserDecrypt;