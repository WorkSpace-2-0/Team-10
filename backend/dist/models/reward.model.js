"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reward = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const rewardSchema = new mongoose_1.default.Schema({
    rewardTitle: {
        type: String,
        required: true,
    },
});
exports.reward = mongoose_1.default.model("reward", rewardSchema);
