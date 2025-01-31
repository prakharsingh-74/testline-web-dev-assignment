const express = require("express");
const { fetchQuiz, saveQuiz } = require("../controllers/quizController");
const router = express.Router();

router.get("/fetch", fetchQuiz);
router.post("/save", saveQuiz);

module.exports = router;