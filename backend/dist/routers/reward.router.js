"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardRouter = void 0;
const express_1 = __importDefault(require("express"));
const addReward_controller_1 = require("../controllers/reward/addReward.controller");
exports.RewardRouter = express_1.default.Router();
exports.RewardRouter.post("/add", addReward_controller_1.addReward);
