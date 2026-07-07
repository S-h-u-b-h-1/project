const { pool } = require('../config/db');
const {
  serializeBusiness,
  serializeOffer,
  serializeService,
  serializeTestimonial,
} = require('../utils/serializers');

const getHomepageData = async (req, res) => {
  try {
    const [businessRes, servicesRes, offersRes, testimonialsRes] = await Promise.all([
      pool.query('SELECT * FROM business_info LIMIT 1'),
      pool.query('SELECT * FROM services WHERE display_price IS NOT NULL ORDER BY popularity DESC LIMIT 3'),
      pool.query('SELECT * FROM offers WHERE valid_until >= NOW()'),
      pool.query('SELECT * FROM testimonials LIMIT 5'),
    ]);

    res.json({
      business: businessRes.rows[0] ? serializeBusiness(businessRes.rows[0]) : null,
      featuredServices: servicesRes.rows.map(serializeService),
      offers: offersRes.rows.map(serializeOffer),
      testimonials: testimonialsRes.rows.map(serializeTestimonial),
    });
  } catch (error) {
    console.error('[getHomepageData]', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBusinessInfo = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM business_info LIMIT 1');
    if (rows.length > 0) {
      res.json(serializeBusiness(rows[0]));
    } else {
      res.status(404).json({ message: 'Business info not found' });
    }
  } catch (error) {
    console.error('[getBusinessInfo]', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getHomepageData, getBusinessInfo };
