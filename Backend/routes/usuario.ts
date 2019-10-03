import { Usuario } from './../models/usuario.model';
import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt'; 

const userRoutes = Router();

userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err) throw err;

        if (!userDB){
            return res.json({
                error: true,
                message: 'User/password invalids'
            });
        }

        if(userDB.comparePassword(body.password)){
            res.json({
                error: false,
                data: 'asdaskldas',
            });
        } else {
            res.json({
                error: true,
                mensaje: 'User/password invalids*'
            });
        }



    });
});

//Create user
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