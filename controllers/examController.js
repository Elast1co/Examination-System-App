const { poolConnect, pool, sql } = require("../config/db");

const getExamResults = async (req, res) => {
  try {
    await poolConnect;
    const { studentId } = req.params;

    const result = await pool
      .request()
      .input("StudentID", sql.Int, studentId)
      .execute("GetExamResults");

    res.json(result.recordset);
  } catch (err) {
    console.error("Stored Procedure Error:", err);
    res.status(500).send("Error executing stored procedure");
  }
};

module.exports = { getExamResults };
