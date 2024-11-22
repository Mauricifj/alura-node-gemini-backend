import express from 'express';

import routes from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static('uploads'));
routes(app);

const port = 3000;

const handleListen = () => {
  console.log(`Server is running on http://localhost:${port}`);
};

app.listen(port, handleListen);
