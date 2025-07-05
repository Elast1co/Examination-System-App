const sql = require('mssql');

const config = {
  user: 'reda',
  password: 'reda13001322',
  server: 'localhost',
  port: 1433, 
  database: 'LearningManagementSystem',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

let pool;

const getConnection = async () => {
  if (pool) return pool;
  try {
    pool = await sql.connect(config);
    console.log('✅ Connected to SQL Server');
    return pool;
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    throw new Error('❌ Database connection failed');
  }
};

module.exports = {
  sql,
  getConnection
};
