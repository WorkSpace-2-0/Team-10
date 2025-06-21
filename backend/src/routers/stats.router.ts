import express from "express";

import {
  getMoodChart,
  getMoodSummary,
} from "../controllers/stats/analytic.controller";
export const StatsRouter = express.Router();

StatsRouter.get("/Chart", getMoodChart);
StatsRouter.get("/summary", getMoodSummary);
