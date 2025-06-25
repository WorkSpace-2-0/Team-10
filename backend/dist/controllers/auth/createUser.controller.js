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
exports.CreateUserController = void 0;
const user_model_1 = require("../../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CreateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, userName } = req.body;
    try {
        const existingUser = yield user_model_1.User.findOne({
            email,
        });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User with this email already exists",
            });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield user_model_1.User.create({
            email,
            password: hashedPassword,
            userName,
        });
        const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
        const token = jsonwebtoken_1.default.sign({
            userId: newUser._id,
            role: newUser.role,
            name: newUser.userName,
            createdAt: newUser.createdAt,
            userEmail: newUser.email,
        }, jwtSecret, { expiresIn: "2 days" });
        res.status(201).json({
            success: true,
            message: " Sign up successfuly",
            token: token,
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.CreateUserController = CreateUserController;
