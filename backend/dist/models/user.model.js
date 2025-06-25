"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    profile: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "profile",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.User = mongoose_1.default.model("user", userSchema);
