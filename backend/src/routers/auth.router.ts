import express from "express";
import { CreateUserController } from "../controllers/auth/createUser.controller";
import { Login } from "../controllers/auth/login.controller";
export const AuthRouter = express.Router();

AuthRouter.post("/createUser", CreateUserController);
AuthRouter.post("/login", Login);
