"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_model_1 = require("./../models/usuario.model");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRoutes = express_1.Router();
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                error: true,
                message: 'User/password invalids'
            });
        }
        if (userDB.comparePassword(body.password)) {
            res.json({
                error: false,
                data: 'asdaskldas',
            });
        }
        else {
            res.json({
                error: true,
                mensaje: 'User/password invalids*'
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
exports.default = userRoutes;
