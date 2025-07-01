import { profile } from "../../models/profile.model";
import { Request, Response } from "express";

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { goingOut, weekend, hobby } = req.body;

  try {
    const updatedProfile = await profile.findOneAndUpdate(
      { user: userId }, 
      { goingOut, weekend, hobby },
      { new: true, upsert: true } 
    );

    if (!updatedProfile) {
       res.status(404).json({
        message: "Profile not found",
        status: false,
      });
    }

     res.status(200).json({
      message: "Profile updated successfully",
      status: true,
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Profile update error:", error);
     res.status(500).json({
      message: "Failed to update profile",
      status: false,
    });
  }
};
