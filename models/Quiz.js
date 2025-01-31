const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  userId: String,
  quizzes: Array,
});

module.exports = mongoose.model("Quiz", QuizSchema);
