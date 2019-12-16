"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const post_model_1 = require("./../models/post.model");
const file_system_1 = __importDefault(require("../classes/file-system"));
const postRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
//Get POST
postRoutes.get('/', [authentication_1.checkToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
    const pagina = Number(req.query.pagina) || 1;
    const skip = (pagina - 1) * 10;
    const post = yield post_model_1.Post.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    res.json({
        success: true,
        data: {
            page: pagina,
            posts: post
        }
    });
}));
//Create POST
postRoutes.post('/', [authentication_1.checkToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    post_model_1.Post.create(body).then((postDB) => __awaiter(this, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password').execPopulate();
        res.json({
            success: true,
            data: postDB
        });
    })).catch(err => {
        res.json({
            success: false,
            message: err
        });
    });
});
//Upload files
postRoutes.post('/upload', [authentication_1.checkToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
    }
    const file = req.files.image;
    if (!file) {
        return res.status(400).json({
            success: false,
            message: 'No file detected'
        });
    }
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            success: false,
            message: 'No image detected'
        });
    }
    yield fileSystem.saveTempImage(file, req.usuario._id);
    res.json({
        success: true,
        file: file.mimetype
    });
}));
exports.default = postRoutes;
