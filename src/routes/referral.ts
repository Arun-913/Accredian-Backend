import { Router } from "express";
import { createReferral, deleteReferral, getAllRerrals, getReferralByEmail } from "../controllers/referral";
import { authMiddleware } from "../middlewares/user";

export const referralRouter = Router();

referralRouter.post('/', authMiddleware, createReferral);
referralRouter.get('/', getAllRerrals);
referralRouter.get('/:email', getReferralByEmail);
referralRouter.delete('/:email', authMiddleware, deleteReferral);