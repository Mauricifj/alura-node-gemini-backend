import 'dotenv/config';
import { ObjectId } from 'mongodb';
import connect from '../config/dbConfig.js';

const connection = await connect(process.env.MONGO_DB_CONNECTION_STRING);

export async function getAll() {
    const posts = await getPostsCollection();
    return posts.find().toArray();
}

export async function create(newPost) {
    const posts = await getPostsCollection();
    return posts.insertOne(newPost);
}

export async function update(id, newPost) {
    const posts = await getPostsCollection();
    const objectId = ObjectId.createFromHexString(id);
    return posts.updateOne( { _id: new ObjectId(id) }, { $set: newPost });
}

async function getPostsCollection() {
    const collectionName = process.env.MONGO_DB_POSTS_COLLECTION;
    const db = await getDb();
    return db.collection(collectionName);
}

async function getDb() {
    const dbName = process.env.MONGO_DB_NAME;
    const db = connection.db(dbName);
    return db;
}