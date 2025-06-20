import express from "express";
import { CreateUserController } from "../controllers/user/createUser.controller";
export const UserRouter = express.Router();

UserRouter.post("/createUser/", CreateUserController);
