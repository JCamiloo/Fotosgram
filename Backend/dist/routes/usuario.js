"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_model_1 = require("./../models/usuario.model");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const authentication_1 = require("../middlewares/authentication");
const userRoutes = express_1.Router();
//Check user
userRoutes.get('/', authentication_1.checkToken, (req, res) => {
    const user = req.usuario;
    res.json({
        success: true,
        data: { user }
    });
});
//Login user
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                success: false,
                message: 'User/password invalids'
            });
        }
        if (userDB.comparePassword(body.password)) {
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
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
                message: 'User/password invalids*'
            });
        }
    });
});
//Create user
userRoutes.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    usuario_model_1.Usuario.create(user).then(userDB => {
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            success: true,
            message: 'User created',
            data: { token: tokenUser }
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
        nombre: req.body.name || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                success: false,
                message: 'User does not exist.'
            });
        }
        res.json({
            success: true,
            message: 'User updated'
        });
    });
});
exports.default = userRoutes;
