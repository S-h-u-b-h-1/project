const { pool } = require('../config/db');

const ensureSchema = async () => {
  try {
    await pool.query(`
      ALTER TABLE appointments
      ADD COLUMN IF NOT EXISTS cart_items JSONB DEFAULT '[]'::jsonb,
      ADD COLUMN IF NOT EXISTS total_price INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS total_duration INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS service_count INTEGER DEFAULT 1
    `);
  } catch (error) {
    console.error('[ensureSchema]', error.message);
  }
};

module.exports = { ensureSchema };
