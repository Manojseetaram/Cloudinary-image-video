import { Request, Response, NextFunction } from "express";

export const generateSignature = async (req: Request, res: Response, next: NextFunction) => {
    try {
   
        res.status(200).json({ success: true, signature: "your_generated_signature" });
    } catch (error) {
        console.error(error);
        res.status(500);
        next(error);
    }
};
