const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db");
require("dotenv").config();

const quizRoutes = require("./routes/quizRoutes");
const rankRoutes = require("./routes/rankRoutes");
const collegeRoutes = require("./routes/collegeRoutes");

const app = express();  
app.use(express.json());
app.use(cors());

app.use("/quiz", quizRoutes);
app.use("/rank", rankRoutes);
app.use("/college", collegeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
