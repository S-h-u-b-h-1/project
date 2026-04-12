require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log(`PostgreSQL Connected: ${res.rows[0].now}`);
    client.release();
  } catch (err) {
    console.error(`Database Connection Error: ${err.message}`);
    console.warn('Server running — verify DATABASE_URL is set correctly.');
  }
};

module.exports = { pool, connectDB };
