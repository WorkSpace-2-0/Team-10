"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsRouter = void 0;
const express_1 = __importDefault(require("express"));
const analytic_controller_1 = require("../controllers/stats/analytic.controller");
const getTopChoice_controller_1 = require("../controllers/profile/getTopChoice.controller");
exports.StatsRouter = express_1.default.Router();
exports.StatsRouter.get("/Chart", analytic_controller_1.getMoodChart);
exports.StatsRouter.get("/summary", analytic_controller_1.getMoodSummary);
exports.StatsRouter.get("/getTopChoice", getTopChoice_controller_1.getTopChoices);
