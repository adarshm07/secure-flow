## SecureFlow

The secure-flow provides the functionality for encrypting and decrypting text using the Node.js crypto module, with configurations loaded from a specified source.

## Installation

```bash
npm install -g secure-flow
# or
yarn global add secure-flow
```

## Usage

Once installed, you can run the following command to generate the secureflow.config.ts file in your current working directory:

```bash
npx create-secureflow-config --javascript
# or
npx create-secureflow-config --typescript
```

This will create a file named secureflow.config.ts or secureflow.config.cjs file with the following content:

```typescript
module.exports = {
  encryptionAlgorithm: "aes-256-cbc",
  encryptionKey: "your-32-character-encryption-key",
  iv: Buffer.from("your-16-character-iv"),
};
```

And you can import the encrypt or decrypt methods:

```typescript
import { encrypt, decrypt } from "secure-flow";
```

## Example usage with Express

```typescript
app.get("/encrypt", (req, res) => {
  const data = JSON.stringify({ data: "Hello, World!" });
  res.status(200).json(encrypt(data));
});

app.get("/decrypt", (req, res) => {
  const data = req.body;
  res.status(200).json(decrypt(data));
});
```

## Configuration

encryptionAlgorithm: The encryption algorithm used by SecureFlow. Default is 'aes-256-cbc'.
encryptionKey: A 32-character string used as the encryption key. Replace 'your-32-character-encryption-key' with your actual encryption key.
iv: Initialization Vector (IV) used for encryption. Should be a 16-character Buffer. Replace 'your-16-character-iv' with your actual IV.

## License

This package is licensed under the MIT License.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Bug Reports

If you find any issues with the package, please report them on the GitHub issues page.

## Author

Adarsh M
GitHub: `[Profile](https://github.com/adarshm07/)`
