import express from "express";
import { createProfile } from "../controllers/profile/createProfile.controller";
import { getProfileById } from "../controllers/profile/getProfileById.controller";
import { updateProfile } from "../controllers/profile/updateProfile.controller";

export const ProfileRouter = express.Router();

ProfileRouter.put("/update/:userId", updateProfile);
ProfileRouter.post("/:userId", createProfile);
ProfileRouter.get("/:userId", getProfileById);


