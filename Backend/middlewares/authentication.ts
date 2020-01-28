import { Response, NextFunction } from 'express';
import Token from '../classes/token';

export const checkToken = (req: any, res: Response, next: NextFunction) => {
    const userToken = req.get('x-token') || '';
    Token.verifyToken(userToken).then((decoded: any) => {
        req.user = decoded.user;
        next();
    }).catch(err => {
        res.status(401);
        res.json({
            success: false,
            message: 'Token inválido'
        });
    });
};