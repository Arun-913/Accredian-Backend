import { z } from 'zod';

export const SignInZodSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(30),
});

export const CreateReferralZodSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    message: z.string(),
});