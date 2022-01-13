import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.get('/', (req: Request, res: Response) => {
  res.json({ response : "hello" });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});