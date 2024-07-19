import 'dotenv/config';
import { Request, Response } from "express";
import { SignInZodSchema } from "../types/zod";
import { prismaClient } from "../db";
import jwt from 'jsonwebtoken';


export const handleUser = async(req: Request, res: Response)=>{
    const { name, email, password } = req.body;
    console.log(req.body);
    try {
        SignInZodSchema.parse({ name, email, password});

        const existingUser = await prismaClient.user.findFirst({
            where: {
                email
            }
        });

        if(existingUser){
            if(existingUser.password != password){
                return res.status(401).json({
                    message: "Password is incorrect"
                })
            }

            const token = jwt.sign({
                id: existingUser.id,
                email
            }, process.env.JWT_AUTH_SECRET as string);
            return res.json({token});
        }
        else{
            const newUser = await prismaClient.user.create({
                data: {
                    name,
                    email,
                    password
                }
            });
            
            const token = jwt.sign({
                id: newUser.id,
                email
            }, process.env.JWT_AUTH_SECRET as string);
            return res.json({token});
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}