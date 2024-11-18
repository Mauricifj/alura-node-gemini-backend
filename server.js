import express from 'express';

const app = express();
const port = 3000;

const handleListen = () => {
    console.log(`Server is running on http://localhost:${port}`);
};

app.listen(port, handleListen);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});