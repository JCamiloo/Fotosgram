import { Router, Response } from 'express';
import { checkToken } from '../middlewares/authentication';
import { Post } from './../models/post.model';

const postRoutes = Router();

postRoutes.post('/', [checkToken], (req: any, res: Response) => {
    const body = req.body;
    body.usuario = req.usuario._id;

    Post.create(body).then(async postDB => {
        await postDB.populate('usuario', '-password').execPopulate();
        res.json({
            success: true,
            data: postDB 
        });
    }).catch(err => {
        res.json({
            success: false,
            message: err
        });
    });
});


export default postRoutes;