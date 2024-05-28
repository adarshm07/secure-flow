## SecureFlow Configuration Generator

The SecureFlow Configuration Generator (`create-secureflow-config`) is a command-line tool that allows you to quickly create a configuration file for SecureFlow. This configuration file includes encryption settings required for SecureFlow to securely encrypt and decrypt data.

## Installation

You can install the `create-secureflow-config` package globally using npm or yarn:

```bash
npm install -g secure-flow
# or
yarn global add secure-flow
```

Usage
Once installed, you can run the following command to generate the secureflow.config.ts file in your current working directory:

```bash
create-secureflow-config
```

This will create a file named secureflow.config.ts with the following content:

```typescript
module.exports = {
  encryptionAlgorithm: "aes-256-cbc",
  encryptionKey: "your-32-character-encryption-key",
  iv: Buffer.from("your-16-character-iv"),
};
```

## Configuration

encryptionAlgorithm: The encryption algorithm used by SecureFlow. Default is 'aes-256-cbc'.
encryptionKey: A 32-character string used as the encryption key. Replace 'your-32-character-encryption-key' with your actual encryption key.
iv: Initialization Vector (IV) used for encryption. Should be a 16-character Buffer. Replace 'your-16-character-iv' with your actual IV.

## Example

Here's an example of how to use the generated secureflow.config.ts file in your SecureFlow application:

```typescript
// secureflow.config.ts
module.exports = {
  encryptionAlgorithm: "aes-256-cbc",
  encryptionKey: "your-32-character-encryption-key",
  iv: Buffer.from("your-16-character-iv"),
};

// Your SecureFlow application
import { config } from "./secureflow.config";
```

## License

This package is licensed under the MIT License.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Bug Reports

If you find any issues with the package, please report them on the GitHub issues page.

## Author

Adarsh M
GitHub: `[Profile](https://github.com/adarshm07/)`
