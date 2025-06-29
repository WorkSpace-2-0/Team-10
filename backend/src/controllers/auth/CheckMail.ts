// controllers/auth/checkEmail.controller.ts
import { Request, Response } from "express";
import { User } from "../../models/user.model";

export const checkEmailExists = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email || typeof email !== "string") {
      res.status(400).json({ success: false, message: "Имэйл байхгүй байна" });
    }

    const user = await User.findOne({ email });

    if (user) {
      res.json({ success: true, exists: true });
      return;
    } else {
      res.json({ success: true, exists: false });
      return;
    }
  } catch (error) {
    console.error("Email шалгах алдаа:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
