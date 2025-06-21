import { Request, Response } from "express";
import { profile } from "../../models/profile.model";

export const getProfileById = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const foundProfile = await profile.findOne({
      user: userId,
    });
    res.status(201).json({
      success: true,
      message: "Profile by user id",
      userProfile: foundProfile,
    });
  } catch (error) {
    console.log("getting user profile by id", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
