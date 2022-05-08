import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';

const app = express();

dotenv.config();

app.get('/', (req, res) => {
  return res.json({ message: 'hello ' }).send();
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
