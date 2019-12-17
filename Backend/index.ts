import Server from "./classes/server";
import mongoose from 'mongoose';
import cors from 'cors';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from "./routes/usuario";
import postRoutes from "./routes/post";

const server = new Server();

// Middleware
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());
server.app.use(fileUpload({ useTempFiles: true}));

//CORS
server.app.use(cors({ origin: true, credentials: true }));

// App routes
server.app.use('/user', userRoutes);
server.app.use('/post', postRoutes);

// Connection
mongoose.connect('mongodb://localhost:27017/fotosgram',
                 {useNewUrlParser: true, useCreateIndex: true}, err => {
                    if (err) throw err;
                    console.log('DB Online');
                });

// Starting server
server.start();