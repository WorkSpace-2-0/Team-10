"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoConnection_1 = require("./mongoConnection");
const auth_router_1 = require("./routers/auth.router");
const profile_router_1 = require("./routers/profile.router");
const mood_router_1 = require("./routers/mood.router");
const moodEntry_router_1 = require("./routers/moodEntry.router");
const stats_router_1 = require("./routers/stats.router");
const reward_router_1 = require("./routers/reward.router");
const demo_router_1 = require("./routers/demo.router");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 9999;
(0, mongoConnection_1.connectDb)();
app.use("/service", (req, res) => {
    res.send("hello world");
});
app.use("/auth", auth_router_1.AuthRouter);
app.use("/profile", profile_router_1.ProfileRouter);
app.use("/mood", mood_router_1.MoodRouter);
app.use("/moodEntry", moodEntry_router_1.MoodEntryRouter);
app.use("/stats", stats_router_1.StatsRouter);
app.use("/reward", reward_router_1.RewardRouter);
app.use("/api", demo_router_1.demoRouter);
app.listen(port, () => {
    console.log(`successfuly listenin port ${port}`);
});
