import express from "express";
import cors from "cors";
import { connectDb } from "./mongoConnection";
import { AuthRouter } from "./routers/auth.router";
import { ProfileRouter } from "./routers/profile.router";
import { MoodRouter } from "./routers/mood.router";

const app = express();
app.use(cors());
app.use(express.json());
const port = 9999;

connectDb();

app.use("/service", (req, res) => {
  res.send("hello world");
});
app.use("/auth", AuthRouter);
app.use("/profile", ProfileRouter);
app.use("/mood", MoodRouter);

app.listen(port, () => {
  console.log(`successfuly listenin port ${port}`);
});
