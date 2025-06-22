import { Request, Response } from "express";
import { reward } from "../../models/reward.model";

export const addReward = async (req: Request, res: Response) => {
  const { rewardTitle } = req.body;

  try {
    await reward.create({
      rewardTitle,
    });
    res.status(201).json({
      success: true,
      message: "Reward added successfuly",
    });
  } catch (error) {
    console.error("Adding reward error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
