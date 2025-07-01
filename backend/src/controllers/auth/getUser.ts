import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { profile as Profile } from "../../models/profile.model";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;

    const user = await User.findById(userId).select("userName email");

    if (!user) {
       res.status(404).json({ message: "User not found" });
       return;
    }
    const userProfile = await Profile.findOne({ user: userId });

    res.status(200).json({
      userName: user.userName,
      email: user.email,
      goingOut: userProfile?.goingOut || [],
      weekend: userProfile?.weekend || [],
      hobby: userProfile?.hobby || [],
    });
  } catch (error) {
    console.error("getUserById error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
