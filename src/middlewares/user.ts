import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    userId?: string;
    userEmail?: string;
}

type jwtDecodedSchema=  {
    id: string,
    email: string,
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET as string);
        const decodedSchema = decoded as jwtDecodedSchema;
        req.userId = decodedSchema.id;
        req.userEmail = decodedSchema.email;
        next();
    } catch (error) {
        console.log('Invalid token');
        return res.status(401).json({ message: 'Invalid token' });
    }
};
