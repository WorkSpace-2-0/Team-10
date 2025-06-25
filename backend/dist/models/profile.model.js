"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const profileSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    goingOut: {
        type: String,
        require: true,
    },
    weekend: {
        type: String,
        require: true,
    },
    hobby: {
        type: String,
        require: true,
    },
});
exports.profile = mongoose_1.default.model("profile", profileSchema);
