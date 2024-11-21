import express from 'express';
import multer from 'multer';

import { getAllPosts, createPost, uploadImage } from '../controllers/postsController.js';

const upload = multer({ dest: "./uploads" })

const postsEndpoint = '/posts';
const uploadEndpoint = '/upload';

const routes = (app) => {
    app.use(express.json());
    app.get(postsEndpoint, getAllPosts);
    app.post(postsEndpoint, createPost)
    app.post(uploadEndpoint, upload.single('image'), uploadImage);
};

export default routes;
