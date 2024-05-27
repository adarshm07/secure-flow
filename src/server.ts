import express, { Request, Response, NextFunction } from "express";
import { encrypt, decrypt } from "./cryptoUtils.js";

const app = express();

// Middleware to encrypt response
app.use((req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;
  res.send = function (body: any) {
    if (typeof body === "string") {
      body = encrypt(body);
    }
    return originalSend.call(this, body);
  };
  next();
});

// Sample route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

// Route to test decryption
app.get("/decrypt", (req: Request, res: Response) => {
  const encryptedMessage = encrypt("Hello, World!");
  if (encryptedMessage) {
    const decryptedMessage = decrypt(encryptedMessage);
    console.log(encryptedMessage);
    console.log(decryptedMessage);
    res.send(`Decrypted message: ${decryptedMessage}`);
  } else {
    res.status(400).send("No message provided");
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
