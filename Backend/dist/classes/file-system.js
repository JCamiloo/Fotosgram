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
}
exports.default = FileSystem;