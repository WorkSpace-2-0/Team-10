import express from "express";
import { CreateUserController } from "../controllers/auth/createUser.controller";
import { Login } from "../controllers/auth/login.controller";
import { getAllUser } from "../controllers/auth/getAllUser.controller";
import { checkEmailExists } from "../controllers/auth/CheckMail";
import  {editUser} from "../controllers/auth/EditAuth";
import { getUserById } from "../controllers/auth/getUser";

export const AuthRouter = express.Router();

AuthRouter.post("/createUser", CreateUserController);
AuthRouter.post("/login", Login);
AuthRouter.get("/getAllUser", getAllUser);
AuthRouter.get("/check-email", checkEmailExists);
AuthRouter.put("/UpdateUser", editUser);
AuthRouter.get("/getUserById", getUserById); 
