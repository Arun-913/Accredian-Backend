import { Request, Response } from "express";
import { prismaClient } from "../db";
import { CreateReferralZodSchema } from "../types/zod";
import { AuthenticatedRequest } from "../middlewares/user";
import { z } from "zod";
import { sendEmail } from "../services/emailSender";


export const createReferral = async(req: AuthenticatedRequest, res: Response) =>{
    const { name, email, message } = req.body;
    console.log(createReferral);
    
    try {
        CreateReferralZodSchema.parse({name, email, message});
        const userId = req.userId, userEmail = req.userEmail;

        const referral = await prismaClient.referral.create({
            data: {
                name,
                email,
                message,
                referredByEmail: userEmail as string
            }
        });

        await sendEmail({email, name});

        return res.json(referral);
    } catch (error) {
        console.log(error);
        return res.status(401).json(error);
    }
}

export const getAllRerrals = async(req: Request, res: Response) =>{
    try {
        const referral = await prismaClient.referral.findMany();

        return res.json(referral);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

export const getReferralByEmail = async(req: Request, res: Response) =>{
    const email  = req.params.email;

    try {
        const referral = await prismaClient.referral.findMany({
            where: {
                referredByEmail: email
            }
        });

        return res.json(referral);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}


export const deleteReferral = async(req: AuthenticatedRequest, res: Response) =>{
    const userEmail = req.params.email;
    const referredEmail = req.userEmail;

    try {
        const schema = z.string();
        schema.parse(userEmail);

        const deletedReferral = await prismaClient.referral.deleteMany({
            where: {
                referredByEmail: referredEmail,
                email: userEmail
            }
        });

        return res.json(deleteReferral);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}