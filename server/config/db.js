import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;

dotenv.config();

// Constants
const DB_PORT = process.env.DB_PORT || 5432;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
});

export default pool;
