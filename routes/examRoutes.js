const express = require("express");
const router = express.Router();
const { getExamResults } = require("../controllers/examController");

router.get("/exam-results/:studentId", getExamResults);

module.exports = router;
