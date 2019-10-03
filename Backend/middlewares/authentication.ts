import { Response, NextFunction } from 'express';
import Token from '../classes/token';

export const checkToken = (req: any, res: Response, next: NextFunction) => {
    const userToken = req.get('x-token') || '';
    Token.verifyToken(userToken).then((decoded: any) => {
        req.usuario = decoded.usuario;
        next();
    }).catch(err => {
        res.json({
            error: true,
            message: 'Invalid token'
        });
    });
};