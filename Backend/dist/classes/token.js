"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    static getJwtToken(payload) {
        return jsonwebtoken_1.default.sign({ usuario: payload }, this.seed, { expiresIn: this.expiration });
    }
    static verifyToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    reject();
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
Token.seed = 'app-secret';
Token.expiration = '1d';
exports.default = Token;
