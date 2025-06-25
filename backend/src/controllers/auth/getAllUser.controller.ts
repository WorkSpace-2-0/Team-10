import { Request, Response } from 'express';
import { User } from '../../models/user.model';

export const getAllUser = async (req: Request, res : Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}