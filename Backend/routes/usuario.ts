import { Usuario } from './../models/usuario.model';
import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt'; 
import Token from '../classes/token';
import { checkToken } from '../middlewares/authentication';

const userRoutes = Router();

//Login user
userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err) throw err;

        if (!userDB){
            return res.json({
                success: false,
                message: 'User/password invalids'
            });
        }

        if(userDB.comparePassword(body.password)){
            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.json({
                success: true,
                data: tokenUser,
            });
        } else {
            res.json({
                success: false,
                message: 'User/password invalids*'
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

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            error: false,
            message: 'User created',
            data: tokenUser
        });
    }).catch(err => {
        res.json({
            error: true,
            message: err
        });
    });
});

// Update user
userRoutes.post('/update', checkToken, (req: any, res: Response) => {

    const user = {
        nombre: req.body.name   || req.usuario.nombre,
        email: req.body.email   || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    }

    Usuario.findByIdAndUpdate(req.usuario._id, user, {new: true}, (err, userDB) => {
        if(err) throw err;
        if(!userDB){
            return res.json({
                error: true,
                message: 'User does not exist.'
            });
        }
        console.log('userdb', userDB);
        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            error: false,
            message: 'User updated',
            data: tokenUser
        });
    });
});

export default userRoutes;