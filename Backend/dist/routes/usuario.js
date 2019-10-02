"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_model_1 = require("./../models/usuario.model");
const express_1 = require("express");
const userRoutes = express_1.Router();
userRoutes.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
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
