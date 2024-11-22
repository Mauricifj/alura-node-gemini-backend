import fs from 'fs';

import { getAll, create, update } from '../models/postsModel.js';
import { createImageDescription, createImageAlt } from '../services/geminiService.js';

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

export async function updatePostImage(req, res) {
    const postId = req.params.id;
    const imageUrl = `http://localhost:3000/${postId}.png`;

    try {
        const imageBuffer = fs.readFileSync(`uploads/${postId}.png`);
        const description = await createImageDescription(imageBuffer);
        const alt = await createImageAlt(imageBuffer);

        const post = {
            image: imageUrl,
            description: description,
            alt: alt,
        }

        const updatedPost = await update(postId, post);
        res.status(200).json(updatedPost);
    } catch (error) {
        handleError(error, res);
    }
}

function handleError(error, res) {
    console.error(error.message);
    res.status(500).json({ message: 'Something went wrong' });
}