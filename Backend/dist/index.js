"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = new server_1.default();
// Middleware
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use('/user', usuario_1.default);
// Connection
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true }, err => {
    if (err)
        throw err;
    console.log('DB Online');
});
// Starting server
server.start();
