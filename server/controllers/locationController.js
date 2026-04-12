const { pool } = require('../config/db');
const { serializeLocation } = require('../utils/serializers');

const getLocations = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM locations ORDER BY id ASC');
    res.json(rows.map(serializeLocation));
  } catch (error) {
    console.error('[getLocations]', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getLocations };
