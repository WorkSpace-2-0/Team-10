import { Request, Response } from "express";
import { User } from "../../models/user.model";

export const CreateUserController = async (req: Request, res: Response) => {
  const { email, password, userName } = req.body;

  try {
    const newUser = await User.create({
      email,
      password,
      userName,
    });

    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
