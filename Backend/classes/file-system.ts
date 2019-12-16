import { FileUpload } from "../interfaces/file.interface";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {

    constructor() {};

    saveTempImage(file: FileUpload, userId: string) {
        return new Promise((resolve, reject) => {
            const path = this.createUserFolder(userId);
            const fileName = this.createUnicName(file.name);
            file.mv(`${path}/${fileName}`, (err: any) => {
                err ? reject(err) : resolve();
            });
        });
    }

    tempToPostImages(userId: string) {
        const tempPath = path.resolve(__dirname, '../uploads/', userId, 'temp');
        const postPath = path.resolve(__dirname, '../uploads/', userId, 'post');

        if (!fs.existsSync(tempPath)) {
            return [];
        }

        if (!fs.existsSync(postPath)) {
            fs.mkdirSync(postPath);
        }

        const tempImages = this.getTempImages(userId);
        tempImages.forEach(image => fs.renameSync(`${tempPath}/${image}`, `${postPath}/${image}`));

        return tempImages;
    }

    private createUnicName(originalName: string) {
        const arrayName = originalName.split('.');
        const extension = arrayName[ arrayName.length - 1 ];
        const unicId = uniqid();
        return `${unicId}.${extension}`
    }

    private createUserFolder(userId: string) {
        const userPath = path.resolve(__dirname, '../uploads', userId);
        const tempUserPath = userPath + '/temp';
        const exist = fs.existsSync(userPath);

        if (!exist) {
            fs.mkdirSync(userPath);
            fs.mkdirSync(tempUserPath);
        }

        return tempUserPath;
    }

    private getTempImages(userId: string) {
        const tempPath = path.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs.readdirSync(tempPath) || [];
    }
}