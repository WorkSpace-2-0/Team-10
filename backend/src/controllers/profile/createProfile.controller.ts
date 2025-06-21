import { Request, Response } from "express";
import { profile } from "../../models/profile.model";

export const createProfile = async (req: Request, res: Response) => {
  console.log(">>> createProfile called for userId:", req.params.userId);

  const userId = req.params.userId;
  const { goingOut, weekend, hobby } = req.body;

  try {
    const newProfile = await profile.create({
      user: userId,
      goingOut,
      weekend,
      hobby,
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfuly",
    });
  } catch (error) {
    console.error("Profile creation error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
