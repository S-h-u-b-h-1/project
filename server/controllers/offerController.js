const { pool } = require('../config/db');
const { serializeOffer } = require('../utils/serializers');

const getOffers = async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM offers WHERE valid_until >= NOW() ORDER BY valid_until ASC'
    );
    res.json(rows.map(serializeOffer));
  } catch (error) {
    console.error('[getOffers]', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getOffers };
