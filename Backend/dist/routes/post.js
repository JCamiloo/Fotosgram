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
postRoutes.get('/', authentication_1.checkToken, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * 10;
    const posts = yield post_model_1.Post.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('user', '-password')
        .exec();
    res.json({
        success: true,
        data: { page, posts }
    });
}));
//Create POST
postRoutes.post('/', authentication_1.checkToken, (req, res) => {
    const body = req.body;
    body.user = req.user._id;
    const images = fileSystem.tempToPostImages(req.user._id);
    body.imgs = images;
    post_model_1.Post.create(body).then((postDB) => __awaiter(this, void 0, void 0, function* () {
        yield postDB.populate('user', '-password').execPopulate();
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
postRoutes.post('/upload', authentication_1.checkToken, (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).json({
            success: false,
            message: 'No se cargó la imagen'
        });
    }
    const file = req.files.image;
    if (!file) {
        return res.status(400).json({
            success: false,
            message: 'Imagen no detectada'
        });
    }
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            success: false,
            message: 'Imagen no detectada'
        });
    }
    yield fileSystem.saveTempImage(file, req.user._id);
    res.json({
        success: true,
        file: file.mimetype
    });
}));
postRoutes.get('/image/:userId/:img', (req, res) => {
    const userId = req.params.userId;
    const img = req.params.img;
    const photoPath = fileSystem.getPhotoUrl(userId, img);
    res.sendFile(photoPath);
});
exports.default = postRoutes;
