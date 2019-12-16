"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    ;
    saveTempImage(file, userId) {
        return new Promise((resolve, reject) => {
            const path = this.createUserFolder(userId);
            const fileName = this.createUnicName(file.name);
            file.mv(`${path}/${fileName}`, (err) => {
                err ? reject(err) : resolve();
            });
        });
    }
    tempToPostImages(userId) {
        const tempPath = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        const postPath = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts');
        if (!fs_1.default.existsSync(tempPath)) {
            return [];
        }
        if (!fs_1.default.existsSync(postPath)) {
            fs_1.default.mkdirSync(postPath);
        }
        const tempImages = this.getTempImages(userId);
        tempImages.forEach(image => fs_1.default.renameSync(`${tempPath}/${image}`, `${postPath}/${image}`));
        return tempImages;
    }
    getPhotoUrl(userId, img) {
        const photoPath = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts', img);
        const exist = fs_1.default.existsSync(photoPath);
        if (!exist) {
            return path_1.default.resolve(__dirname, '../assets/default.jpg');
        }
        return photoPath;
    }
    createUnicName(originalName) {
        const arrayName = originalName.split('.');
        const extension = arrayName[arrayName.length - 1];
        const unicId = uniqid_1.default();
        return `${unicId}.${extension}`;
    }
    createUserFolder(userId) {
        const userPath = path_1.default.resolve(__dirname, '../uploads', userId);
        const tempUserPath = userPath + '/temp';
        const exist = fs_1.default.existsSync(userPath);
        if (!exist) {
            fs_1.default.mkdirSync(userPath);
            fs_1.default.mkdirSync(tempUserPath);
        }
        return tempUserPath;
    }
    getTempImages(userId) {
        const tempPath = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs_1.default.readdirSync(tempPath) || [];
    }
}
exports.default = FileSystem;
