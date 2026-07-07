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
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_services_gender_lower ON services (LOWER(gender));
      CREATE INDEX IF NOT EXISTS idx_services_category_lower ON services (LOWER(category));
      CREATE INDEX IF NOT EXISTS idx_services_popularity_price ON services (popularity DESC, price ASC);
      CREATE INDEX IF NOT EXISTS idx_offers_valid_until ON offers (valid_until);
    `);
  } catch (error) {
    console.error('[ensureSchema]', error.message);
  }
};

module.exports = { ensureSchema };
