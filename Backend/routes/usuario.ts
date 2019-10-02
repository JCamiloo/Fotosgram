import { Usuario } from './../models/usuario.model';
import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt'; 

const userRoutes = Router();

userRoutes.post('/create', (req: Request, res: Response) => {

    const user = {
        nombre: req.body.nombre, 
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    }

    Usuario.create(user).then(userDB => {
        res.json({
            error: false,
            message: 'User created',
            data: userDB
        });
    }).catch(err => {
        res.json({
            error: true,
            message: err
        });
    });
});

export default userRoutes;