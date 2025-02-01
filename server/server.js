import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());

app.get('/api/quiz', async (req, res) => {
  try {
    const apiResponse = await fetch('process.env.API_URL');
    if (!apiResponse.ok) {
      throw new Error('Failed to fetch from external API');
    }
    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching quiz data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
