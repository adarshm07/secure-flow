// server.js
import express from "express";
import { encrypt, decrypt } from "./cryptoUtils.js";

const app = express();

// Middleware to encrypt response
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    if (typeof body === "string") {
      body = encrypt(body);
    }
    return originalSend.call(this, body);
  };
  next();
});

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Route to test decryption
app.get("/decrypt", (req, res) => {
  console.log(req.query.message);
  //   const encryptedMessage = req.query.message;
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
