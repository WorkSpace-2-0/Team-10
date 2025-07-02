import { Request, Response } from "express";
import { User } from "../../models/user.model";
import bcrypt from "bcryptjs";

export const editUser = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const updateData = req.body;

    
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updateData.password, salt);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
       res.status(404).json({ message: "User not found." });
       return;
    }

    res.status(200).json({
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};
