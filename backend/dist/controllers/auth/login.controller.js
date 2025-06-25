"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../../models/user.model");
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userFound = yield user_model_1.User.findOne({ email });
        if (!userFound) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, userFound.password);
        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
            return;
        }
        const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
        const token = jsonwebtoken_1.default.sign({
            userId: userFound._id,
            role: userFound.role,
            name: userFound.userName,
            createdAt: userFound.createdAt,
            userEmail: userFound.email,
        }, jwtSecret, { expiresIn: "2 days" });
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token: token,
        });
        return;
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
});
exports.Login = Login;
