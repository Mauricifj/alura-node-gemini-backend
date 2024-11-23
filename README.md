# Alura Node Gemini

Backend project to learn Node.js and Gemini with Alura.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [License](#license)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/Mauricifj/alura-node-gemini-backend
cd alura-node-gemini-backend
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```env
GEMINI_API_KEY="your-gemini-api-key"
MONGO_DB_NAME="your-mongo-db-name"
MONGO_DB_POSTS_COLLECTION="your-mongo-db-posts-collection"
MONGO_DB_CONNECTION_STRING="your-mongo-db-connection-string"
```

## Usage

1. Start the server:

```sh
npm run dev
```

2. The server will be running on `http://localhost:3000`.

## API Endpoints

### Get All Posts

- **URL:** `/posts`
- **Method:** `GET`
- **Response:**

```json
[
    {
        "_id": "post-id",
        "imageUrl": "image-url",
        "description": "image-description",
        "alt": "image-alt"
    },
    ...
]
```

### Create Post

- **URL:** `/posts`
- **Method:** `POST`
- **Request Body:**

```json
{
    "imageEncoded": "base64-encoded-image",
    "isAIEnabled": true, // Will replace image description and alt text for AI generated content
    "description": "image-description",
    "alt": "image-alt"
}
```

- **Response:**

```json
{
    "_id": "post-id",
    "imageUrl": "image-url",
    "description": "image-description",
    "alt": "image-alt"
}
```

## Environment Variables

- `GEMINI_API_KEY`: Your Gemini API key.
- `MONGO_DB_NAME`: The name of your MongoDB database.
- `MONGO_DB_POSTS_COLLECTION`: The name of your MongoDB posts collection.
- `MONGO_DB_CONNECTION_STRING`: Your MongoDB connection string.

## Project Structure

```plaintext
.
├── .env
├── .gitignore
├── package.json
├── server.js
├── services.sh
├── src
│   ├── config
│   │   └── dbConfig.js
│   ├── controllers
│   │   └── postsController.js
│   ├── models
│   │   └── postsModel.js
│   ├── routes
│   │   └── postsRoutes.js
│   ├── services
│   │   └── geminiService.js
│   └── utils
│       └── file_helper.js
└── images
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
