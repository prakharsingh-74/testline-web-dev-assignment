const axios = require("axios");
const Quiz = require("../models/Quiz");

exports.predictRank = async (req, res) => {
  try {
    const { userId } = req.body;
    const userQuiz = await Quiz.findOne({ userId });

    if (!userQuiz) return res.status(404).json({ error: "User not found" });

    const response = await axios.post("http://127.0.0.1:5000/predict-rank", {
      quizzes: userQuiz.quizzes,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error predicting rank" });
  }
};
