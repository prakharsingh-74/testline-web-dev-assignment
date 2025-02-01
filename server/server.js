const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

// Enable CORS for the client
app.use(cors());

// Route to fetch quiz data from the proxy
app.get('/api/quiz', async (req, res) => {
  try {
    const apiResponse = await fetch('https://api.jsonserve.com/Uw5CrX');
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
