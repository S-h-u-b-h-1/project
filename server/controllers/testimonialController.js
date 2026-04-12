const { pool } = require('../config/db');
const { serializeTestimonial } = require('../utils/serializers');

const getTestimonials = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM testimonials ORDER BY id DESC');
    res.json(rows.map(serializeTestimonial));
  } catch (error) {
    console.error('[getTestimonials]', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const { customerName, rating, review } = req.body;

    if (!customerName || !review) {
      return res.status(400).json({ error: 'Customer name and review are required.' });
    }

    const normalizedRating = Math.max(1, Math.min(5, Number(rating) || 5));

    const { rows } = await pool.query(
      `
      INSERT INTO testimonials (customerName, rating, review)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [String(customerName).trim(), normalizedRating, String(review).trim()]
    );

    res.status(201).json(serializeTestimonial(rows[0]));
  } catch (error) {
    console.error('[createTestimonial]', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getTestimonials, createTestimonial };
