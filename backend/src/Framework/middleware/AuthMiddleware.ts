import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
declare module 'express-serve-static-core' {
    interface Request {
      user?: { id: string };
    }
  }
  
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token; 
  console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey') as { id: string };
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
