import dotenv from "dotenv";

dotenv.config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  pasword: process.env.DB_PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT || 3001,
  database: process.env.DB_NAME,
});

module.exports = pool;
