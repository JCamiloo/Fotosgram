import { Router, Response } from 'express';
import { checkToken } from '../middlewares/authentication';
import { Post } from './../models/post.model';

const postRoutes = Router();

//Get POST
postRoutes.get('/', [checkToken], async (req: any, res: Response) => {

    const pagina = Number(req.query.pagina) || 1;
    const skip = (pagina - 1) * 10;

    const post = await Post.find()
                           .sort({ _id: -1})
                           .skip(skip)
                           .limit(10)
                           .populate('usuario', '-password')
                           .exec();
    res.json({
        success: true,
        data: {
            page: pagina,
            posts: post
        }
    });
});

//Create POST
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