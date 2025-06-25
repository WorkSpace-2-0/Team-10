"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodRouter = void 0;
const express_1 = __importDefault(require("express"));
const createMood_controller_1 = require("../controllers/mood/createMood.controller");
const getMood_controller_1 = require("../controllers/mood/getMood.controller");
const deleteMood_controller_1 = require("../controllers/mood/deleteMood.controller");
const deleteSingleMood_controller_1 = require("../controllers/mood/deleteSingleMood.controller");
exports.MoodRouter = express_1.default.Router();
exports.MoodRouter.post("/newMood/:userId", createMood_controller_1.createMood);
exports.MoodRouter.get("/", getMood_controller_1.getAllMoods);
exports.MoodRouter.get("/moods/user/:userId", getMood_controller_1.getUserMoods);
exports.MoodRouter.delete("/moods/delete", deleteMood_controller_1.deleteMood);
exports.MoodRouter.delete("/delete/:id", deleteSingleMood_controller_1.deleteSingleMood);
