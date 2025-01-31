const axios = require("axios");
const Quiz = require("../models/Quiz");

exports.fetchQuiz = async (req, res) => {
  try {
    const quizData = await axios.get("https://www.jsonkeeper.com/b/LLQT");
    const submissionData = await axios.get("https://api.jsonserve.com/rJvd7g");
    const historicalData = await axios.get("https://api.jsonserve.com/XgAgFJ");

    res.json({
      currentQuiz: quizData.data,
      submissions: submissionData.data,
      history: historicalData.data,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching quiz data" });
  }
};

exports.saveQuiz = async (req, res) => {
  try {
    const { userId, quizzes } = req.body;
    let userQuiz = await Quiz.findOne({ userId });

    if (!userQuiz) {
      userQuiz = new Quiz({ userId, quizzes });
    } else {
      userQuiz.quizzes.push(...quizzes);
    }

    await userQuiz.save();
    res.json({ message: "Quiz data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving quiz data" });
  }
};