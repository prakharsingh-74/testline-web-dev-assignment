const express = require("express");
const { predictRank } = require("../controllers/rankController");
const router = express.Router();

router.post("/", predictRank);

module.exports = router;