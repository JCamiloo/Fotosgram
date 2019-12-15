import Server from "./classes/server";
import userRoutes from "./routes/usuario";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRoutes from "./routes/post";

const server = new Server();

// Middleware
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

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