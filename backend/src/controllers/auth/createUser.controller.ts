import { Request, Response } from "express";
import { User } from "../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const CreateUserController = async (req: Request, res: Response) => {
  const { email, password, userName } = req.body;

  try {
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      userName,
    });

    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    const token = jwt.sign(
      {
        userId: newUser._id,
        role: newUser.role,
        name: newUser.userName,
        createdAt: newUser.createdAt,
        userEmail: newUser.email,
      },
      jwtSecret,
      { expiresIn: "2 days" }
    );

    res.status(201).json({
      success: true,
      message: " Sign up successfuly",
      token: token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
