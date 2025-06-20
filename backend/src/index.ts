import express from "express";
import cors from "cors";
import { connectDb } from "./mongoConnection";

const app = express();
app.use(cors());
app.use(express.json());
const port = 9999;

connectDb();

app.use("/service", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`successfuly listenin port ${port}`);
});
