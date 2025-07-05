const { sql, getConnection } = require("../config/db");

const addUser = async (req, res) => {
  const {
    Username,
    FirstName,
    LastName,
    Salary,
    Email,
    DateOfBirth,
    Gender,
    PasswordHash,
    BranchID,
    Address,
    Role,
    Major,
    GPA,
    IntakeID,
    TrackID,
    ExpertiseArea,
    InstructorHiringDate,
    ContractType,
    InstructorDegree,
    AdminPosition,
    AdminHiringDate,
  } = req.body;

  try {
    const pool = await getConnection();
    const request = pool.request();

    // We can find that in everything
    request.input("Username", sql.VarChar(30), Username);
    request.input("FirstName", sql.VarChar(30), FirstName);
    request.input("LastName", sql.VarChar(30), LastName);
    request.input("Salary", sql.Decimal(10, 2), Salary);
    request.input("Email", sql.VarChar(100), Email);
    request.input("DateOfBirth", sql.Date, DateOfBirth);
    request.input("Gender", sql.Char(1), Gender);
    request.input("PasswordHash", sql.VarChar(255), PasswordHash);
    request.input("BranchID", sql.Int, BranchID);
    request.input("Address", sql.VarChar(200), Address);

    // Role
    request.input("Role", sql.VarChar(30), Role);

    // Student
    request.input("Major", sql.VarChar(100), Major || null);
    request.input("GPA", sql.Decimal(3, 2), GPA || null);
    request.input("IntakeID", sql.VarChar(20), IntakeID || null);
    request.input("TrackID", sql.Int, TrackID || null);

    // Instructor
    request.input("ExpertiseArea", sql.VarChar(100), ExpertiseArea || null);
    request.input(
      "InstructorHiringDate",
      sql.Date,
      InstructorHiringDate || null
    );
    request.input("ContractType", sql.VarChar(20), ContractType || null);
    request.input(
      "InstructorDegree",
      sql.VarChar(20),
      InstructorDegree || null
    );

    // Admin
    request.input("AdminPosition", sql.VarChar(50), AdminPosition || null);
    request.input("AdminHiringDate", sql.Date, AdminHiringDate || null);

    // excution
    await request.execute("AddNewUserWithRole");

    return res
      .status(201)
      .json({ message: `✅ ${Role} created successfully.` });
  } catch (error) {
    console.error("🔥 Error creating user:", error.message);

    // Error Handling
    if (error.message.includes("Username already exists")) {
      return res.status(400).json({ error: "❌ Username already exists." });
    }
    if (error.message.includes("Email already exists")) {
      return res.status(400).json({ error: "❌ Email already exists." });
    }
    if (error.message.includes("Invalid IntakeID")) {
      return res.status(400).json({ error: "❌ IntakeID is not valid." });
    }
    if (error.message.includes("Invalid TrackID")) {
      return res.status(400).json({ error: "❌ TrackID is not valid." });
    }
    if (error.message.includes("Invalid role provided")) {
      return res
        .status(400)
        .json({
          error: "❌ Invalid role. Must be Student, Instructor, or Admin.",
        });
    }
    if (error.message.includes("Cannot insert the value NULL")) {
      return res
        .status(400)
        .json({ error: "❌ One or more required fields are missing." });
    }

    // fallback error
    return res.status(500).json({ error: "❌ Server error: " + error.message });
  }
};

module.exports = {
  addUser,
};
