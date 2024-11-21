import { MongoClient } from 'mongodb';

export default async function connect(connectionString) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(connectionString);

        console.log('Connecting to the database cluster...');
        await mongoClient.connect();

        console.log('Successfully connected to database!');
        return mongoClient;
    } catch (err) {
        console.error('Failed to connect to the database!', err);
        process.exit();
    }
}