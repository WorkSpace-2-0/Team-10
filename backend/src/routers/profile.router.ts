import express from "express";
import { createProfile } from "../controllers/profile/createProfile.controller";
import { getProfileById } from "../controllers/profile/getProfileById.controller";
export const ProfileRouter = express.Router();

ProfileRouter.post("/createProfile/:userId", createProfile);
ProfileRouter.get("/getProfile/:userId", getProfileById);
