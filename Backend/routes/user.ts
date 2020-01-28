import { User } from '../models/user.model';
import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt'; 
import Token from '../classes/token';
import { checkToken } from '../middlewares/authentication';

const userRoutes = Router();

//Check user
userRoutes.get('/', checkToken, (req: any, res: Response) => {
    const user = req.user;
    res.json({
        success: true,
        data: user 
    });
});

//Login user
userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) throw err;

        if (!userDB){
            return res.json({
                success: false,
                message: 'Usuario/Contraseña inválidas'
            });
        }

        if(userDB.comparePassword(body.password)){
            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.json({
                success: true,
                data: { token: tokenUser },
            });
        } else {
            res.json({
                success: false,
                message: 'Usuario/Contraseña inválidas'
            });
        }
    });
});

//Create user
userRoutes.post('/create', (req: Request, res: Response) => {
    const user = {
        name: req.body.name, 
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    }

    User.create(user).then(userDB => {
        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.name,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            success: true,
            message: 'Usuario creado',
            data: tokenUser
        });
    }).catch(err => {
        res.json({
            success: false,
            message: err
        });
    });
});

// Update user
userRoutes.post('/update', checkToken, (req: any, res: Response) => {

    const user = {
        name: req.body.name   || req.user.name,
        email: req.body.email   || req.user.email,
        avatar: req.body.avatar || req.user.avatar
    }

    User.findByIdAndUpdate(req.user._id, user, {new: true}, (err, userDB) => {
        if(err) throw err;

        if(!userDB){
            return res.json({
                success: false,
                message: 'El usuario no existe'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            success: true,
            data: tokenUser,
            message: 'Usuario actualizado'
        });
    });
});

export default userRoutes;