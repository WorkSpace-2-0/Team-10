import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model";

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const isMatch = await bcrypt.compare(
      password,
      userFound.password as string
    );
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    const token = jwt.sign(
      {
        userId: userFound._id,
        role: userFound.role,
        name: userFound.userName,
        createdAt: userFound.createdAt,
        userEmail: userFound.email,
      },
      jwtSecret,
      { expiresIn: "2 days" }
    );
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: token,
    });
    return;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};
