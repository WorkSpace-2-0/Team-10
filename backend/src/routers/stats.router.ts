import express from "express";

import {
  getMoodChart,
  getMoodSummary,
} from "../controllers/stats/analytic.controller";
import { getTopChoices } from "../controllers/profile/getTopChoice.controller";
export const StatsRouter = express.Router();

StatsRouter.get("/Chart", getMoodChart);
StatsRouter.get("/summary", getMoodSummary);
StatsRouter.get("/getTopChoice", getTopChoices);
