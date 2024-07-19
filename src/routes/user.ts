import { Router } from "express";
import { handleUser } from "../controllers/user";

export const userRouter = Router();

userRouter.post('/signin', handleUser)