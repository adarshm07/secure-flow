const encryptionAlgorithm = 'AES-CBC';

async function generateKey(password: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
    );

    return window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: new Uint8Array(16),
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial,
        { name: encryptionAlgorithm, length: 256 },
        true,
        ['encrypt', 'decrypt']
    );
}

export async function encrypt(text: string, password: string): Promise<string> {
    const key = await generateKey(password);
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const iv = window.crypto.getRandomValues(new Uint8Array(16));

    const encryptedContent = await window.crypto.subtle.encrypt(
        { name: encryptionAlgorithm, iv: iv },
        key,
        data
    );

    const encryptedContentArray = new Uint8Array(encryptedContent);
    const resultArray = new Uint8Array(iv.length + encryptedContentArray.length);
    resultArray.set(iv, 0);
    resultArray.set(encryptedContentArray, iv.length);

    return btoa(String.fromCharCode.apply(null, Array.from(resultArray)));
}

export async function decrypt(encryptedText: string, password: string): Promise<string> {
    const key = await generateKey(password);
    const encryptedData = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
    const iv = encryptedData.slice(0, 16);
    const data = encryptedData.slice(16);

    const decryptedContent = await window.crypto.subtle.decrypt(
        { name: encryptionAlgorithm, iv: iv },
        key,
        data
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedContent);
}