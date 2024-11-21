import connect from '../config/dbConfig.js';

const connection = await connect(process.env.MONGO_DB_CONNECTION_STRING);

export default async function getAll() {
    const db = connection.db('alura-node-gemini');
    const posts = db.collection('posts');
    return posts.find().toArray();
}