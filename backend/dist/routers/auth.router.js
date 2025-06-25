"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const createUser_controller_1 = require("../controllers/auth/createUser.controller");
const login_controller_1 = require("../controllers/auth/login.controller");
const getAllUser_controller_1 = require("../controllers/auth/getAllUser.controller");
exports.AuthRouter = express_1.default.Router();
exports.AuthRouter.post("/createUser", createUser_controller_1.CreateUserController);
exports.AuthRouter.post("/login", login_controller_1.Login);
exports.AuthRouter.get("/getAllUser", getAllUser_controller_1.getAllUser);
