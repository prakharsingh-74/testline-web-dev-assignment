const express = require("express");
const { predictCollege } = require("../controllers/collegeController");
const router = express.Router();

router.post("/", predictCollege);

module.exports = router;
