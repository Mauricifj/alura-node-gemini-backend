import express from 'express';

const app = express();
app.use(express.json());
const port = 3000;

const handleListen = () => {
  console.log(`Server is running on http://localhost:${port}`);
};

const posts = [
  { id: 1, title: 'Post 1', description: 'This is post 1', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Post 2', description: 'This is post 2', image: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Post 3', description: 'This is post 3', image: 'https://via.placeholder.com/150' },
  { id: 4, title: 'Post 4', description: 'This is post 4', image: 'https://via.placeholder.com/150' },
  { id: 5, title: 'Post 5', description: 'This is post 5', image: 'https://via.placeholder.com/150' },
];

function getPostById(id) {
  return posts.findIndex((post) => post.id === Number(id));
}

app.listen(port, handleListen);

app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

app.get('/posts/:id', (req, res) => {
  const index = getPostById(req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    res.status(200).json(posts[index]);
  }
});