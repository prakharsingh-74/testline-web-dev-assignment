const axios = require("axios");

exports.predictCollege = async (req, res) => {
  try {
    const { rank } = req.body;
    const response = await axios.post("http://127.0.0.1:5000/predict-college", { rank });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error predicting college" });
  }
};
