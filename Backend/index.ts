import Server from "./classes/server";
import userRoutes from "./routes/usuario";
import mongoose from 'mongoose';

const server = new Server();

// Middleware
server.app.use('/user', userRoutes)

// Connection
mongoose.connect('mongodb://localhost:27017/fotosgram',
                 {useNewUrlParser: true, useCreateIndex: true}, err => {
                    if (err) throw err;
                    console.log('DB Online');
                });

// Starting server
server.start();