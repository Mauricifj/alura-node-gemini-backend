import express from 'express';
import multer from 'multer';
import cors from 'cors';

import { getAllPosts, createPost, uploadImage, updatePostImage } from '../controllers/postsController.js';

const corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
};

const upload = multer({ dest: "./uploads" })

const postsEndpoint = '/posts';
const uploadEndpoint = '/upload';

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get(postsEndpoint, getAllPosts);
    app.post(postsEndpoint, createPost)
    app.post(uploadEndpoint, upload.single('image'), uploadImage);
    app.put(`${uploadEndpoint}/:id`, updatePostImage);
};

export default routes;
