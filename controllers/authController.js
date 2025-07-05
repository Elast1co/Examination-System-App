const { sql, getConnection } = require("../config/db");

const loginUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const pool = await getConnection(); 
    const request = pool.request();

    request.input("Username", sql.VarChar(30), username);
    request.input("Password", sql.VarChar(255), password);
    request.input("Role", sql.VarChar(30), role || null);

    const result = await request.execute("SP_LoginUser");
    const response = result.recordset[0];

    if (!response) {
      return res.status(401).json({ message: "Unknown error occurred." });
    }

    if (response.ErrorMessage === "InvalidUsernameOrPassword") {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    if (response.ErrorMessage === "InvalidRoleForUser") {
      return res.status(401).json({ message: "This role is not valid for the user." });
    }

    return res.status(200).json({ user: response });

  } catch (error) {
    console.error("🔥 Login error:", error.message);
    return res.status(500).json({ message: "Server error: " + error.message });
  }
};

module.exports = { loginUser };
