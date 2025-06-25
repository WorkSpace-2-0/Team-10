import { profile } from "../../models/profile.model";
import { Request, Response } from "express";

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { goingOut, weekend, hobby } = req.body;

  try {
    const updateProfile = await profile.findByIdAndUpdate(
      userId,
      {
        goingOut,
        weekend,
        hobby,
      },
    );
    if (!updateProfile) {
       res.status(404).json({ message: "Profile not found" });
    }
    res
      .status(200)
      .json({ message: "Profile updated successfully", status: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "failed to update profile", status: false });
  }
};
