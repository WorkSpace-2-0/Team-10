import express from "express";
import { addReward } from "../controllers/reward/addReward.controller";
export const RewardRouter = express.Router();

RewardRouter.post("/add", addReward);
