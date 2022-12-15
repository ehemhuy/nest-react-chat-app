import { verifyJwtToken } from './../utils/jwt.util';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JWTMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (!req.cookies['Authorization']) return res.status(401).end()
        const token = verifyJwtToken(req.cookies['Authorization'])
        if (Date.now() > token.exp * 1000) return res.status(401).end()
        next();
    }
}
