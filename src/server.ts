import express, { Request, Response, NextFunction } from "express";
import { encrypt, decrypt } from "./cryptoUtils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to encrypt response
app.use('/encrypt', (req: Request, res: Response, next: NextFunction) => {
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
app.get("/encrypt", (req: Request, res: Response) => {
  res.send(req.body);
});

// Route to test decryption
app.get("/decrypt", (req: Request, res: Response) => {
  const encryptedMessage = req.body.data;

  if (encryptedMessage) {
    const decryptedMessage = decrypt(encryptedMessage);
    console.log(JSON.parse(decryptedMessage));

    res.status(200).json(decryptedMessage);
  } else {
    res.status(400).send("No message provided");
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
