"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const authentication_1 = require("../middlewares/authentication");
const userRoutes = express_1.Router();
//Check user
userRoutes.get('/', authentication_1.checkToken, (req, res) => {
    const user = req.user;
    res.json({
        success: true,
        data: user
    });
});
//Login user
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    user_model_1.User.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                success: false,
                message: 'Usuario/Contraseña inválidas'
            });
        }
        if (userDB.comparePassword(body.password)) {
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                success: true,
                data: { token: tokenUser },
            });
        }
        else {
            res.json({
                success: false,
                message: 'Usuario/Contraseña inválidas'
            });
        }
    });
});
//Create user
userRoutes.post('/create', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    user_model_1.User.create(user).then(userDB => {
        const tokenUser = token_1.default.getJwtToken({
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
userRoutes.post('/update', authentication_1.checkToken, (req, res) => {
    const user = {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email,
        avatar: req.body.avatar || req.user.avatar
    };
    user_model_1.User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                success: false,
                message: 'El usuario no existe'
            });
        }
        const tokenUser = token_1.default.getJwtToken({
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
exports.default = userRoutes;
