import { Router, Response } from 'express';
import { checkToken } from '../middlewares/authentication';
import { Post } from './../models/post.model';
import { FileUpload } from '../interfaces/file.interface';
import FileSystem from '../classes/file-system';

const postRoutes = Router();
const fileSystem = new FileSystem();

//Get POST
postRoutes.get('/', checkToken, async (req: any, res: Response) => {
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
postRoutes.post('/', checkToken, (req: any, res: Response) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    const images = fileSystem.tempToPostImages(req.usuario._id);
    body.imgs = images;

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

//Upload files
postRoutes.post('/upload', checkToken, async (req: any, res: Response) => {
    if (!req.files) {
        return res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
    }

    const file: FileUpload = req.files.image;


    if (!file) {
        return res.status(400).json({
            success: false,
            message: 'No file detected'
        });
    }

    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            success: false,
            message: 'No image detected'
        });
    }

    await fileSystem.saveTempImage(file, req.usuario._id);
    
    res.json({
        success: true,
        file: file.mimetype
    });
});

postRoutes.get('/image/:userId/:img', checkToken, (req: any, res: Response) => {
    const userId = req.params.userId;
    const img = req.params.img;
    const photoPath = fileSystem.getPhotoUrl(userId, img);

    res.sendFile(photoPath);
});

export default postRoutes;