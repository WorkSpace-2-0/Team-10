import express from "express";
import { createMood } from "../controllers/mood/createMood.controller";
import {
  getAllMoods,
  getUserMoods,
} from "../controllers/mood/getMood.controller";
import { deleteMood } from "../controllers/mood/deleteMood.controller";
import { deleteSingleMood } from "../controllers/mood/deleteSingleMood.controller";

export const MoodRouter = express.Router();

MoodRouter.post("/newMood/:userId", createMood);
MoodRouter.get("/", getAllMoods);
MoodRouter.get("/moods/user/:userId", getUserMoods);
MoodRouter.delete("/moods/delete", deleteMood);
MoodRouter.delete("/delete/:id", deleteSingleMood);
