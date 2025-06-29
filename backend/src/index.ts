import express from "express";
import cors from "cors";
import { connectDb } from "./mongoConnection";
import { AuthRouter } from "./routers/auth.router";
import { ProfileRouter } from "./routers/profile.router";
import { MoodRouter } from "./routers/mood.router";
import { MoodEntryRouter } from "./routers/moodEntry.router";
import { StatsRouter } from "./routers/stats.router";
import { RewardRouter } from "./routers/reward.router";
import { demoRouter } from "./routers/demo.router";

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
app.use("/moodEntry", MoodEntryRouter);
app.use("/stats", StatsRouter);
app.use("/reward", RewardRouter);
app.use("/api", demoRouter);

app.listen(port, () => {
  console.log(`successfuly listenin port ${port}`);
});
