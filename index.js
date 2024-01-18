import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const PORT = 8000;
const app = express();

const accessToken = process.env.VITE_TMDB_ACCESS_TOKEN;

app.use(cors());

app.get('/', (req, res) => {
    res.json('Hello World!');
});

app.get('/data', (req, res) => {
    const searchTerm = req.query.query;

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    };

    axios
        .request(options)
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
