import getAll from '../models/postsModel.js';

export default async function getAllPosts(req, res) {
    const posts = await getAll();
    res.status(200).json(posts);
}