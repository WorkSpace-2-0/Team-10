import express from "express";
import { createMood } from "../controllers/mood/createMood.controller";
import {
  getAllMoods,
  getUserMoods,
} from "../controllers/mood/getMood.controller";

export const MoodRouter = express.Router();

MoodRouter.post("/newMood", createMood);
MoodRouter.get("/", getAllMoods);
MoodRouter.get("/moods/user/:userId", getUserMoods);
