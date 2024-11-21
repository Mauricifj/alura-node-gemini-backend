import fs from 'fs';

import { getAll, create } from '../models/postsModel.js';

export async function getAllPosts(req, res) {
    try {
        const posts = await getAll();
        res.status(200).json(posts);
    } catch (error) {
        handleError(error, res);
    }
}

export async function createPost(req, res) {
    const newPost = req.body;

    try {
        const post = await create(newPost);
        res.status(201).json(post);
    } catch (error) {
        handleError(error, res);
    }
}

export async function uploadImage(req, res) {
    const newPost = {
        description: 'This is a post to test uploading images',
        image: req.file.originalname,
        alt: 'Image description',
    };

    try {
        const post = await create(newPost);
        const postId = post.insertedId;
        const fileExtension = req.file.originalname.split('.').pop();

        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
            throw new Error('Invalid file extension');
        }

        const fileName = `uploads/${postId}.${fileExtension}`;
        fs.renameSync(req.file.path, fileName);
        res.status(201).json(post);
    } catch (error) {
        handleError(error, res);
    }
}

function handleError(error, res) {
    console.error(error.message);
    res.status(500).json({ message: 'Something went wrong' });
}