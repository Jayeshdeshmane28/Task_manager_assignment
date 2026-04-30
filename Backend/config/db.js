import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// PostgreSQL connection pool — reuses connections instead of creating new ones each request
const pool = new Pool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port:     parseInt(process.env.DB_PORT) || 5432,
});

pool.on('connect', () => console.log(' Connected to PostgreSQL'));
pool.on('error', (err) => console.error('PostgreSQL pool error:', err.message));

export default pool;
