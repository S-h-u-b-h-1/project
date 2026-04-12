const { pool } = require('../config/db');
const { serializeService } = require('../utils/serializers');

const getServices = async (req, res) => {
  try {
    let query = 'SELECT * FROM services WHERE display_price IS NOT NULL';
    const params = [];
    const conditions = [];

    if (req.query.gender) {
      conditions.push(`(gender = $${params.length + 1} OR gender = 'Unisex')`);
      params.push(req.query.gender);
    }
    if (req.query.category) {
      conditions.push(`category = $${params.length + 1}`);
      params.push(req.query.category);
    }
    if (req.query.search) {
      conditions.push(`LOWER(name) LIKE LOWER($${params.length + 1})`);
      params.push(`%${req.query.search}%`);
    }
    if (conditions.length > 0) {
      query += ' AND ' + conditions.join(' AND ');
    }
    const sort = req.query.sort || 'price_asc';
    if (sort === 'price_desc') {
      query += ' ORDER BY price DESC, popularity DESC';
    } else if (sort === 'popularity') {
      query += ' ORDER BY popularity DESC, price ASC';
    } else {
      query += ' ORDER BY price ASC, popularity DESC';
    }

    const { rows } = await pool.query(query, params);

    let services = rows.map(serializeService);

    if (req.query.service) {
      const serviceFilter = String(req.query.service).toLowerCase();
      services = services.filter(
        (service) =>
          service.slug === serviceFilter ||
          service.name.toLowerCase() === serviceFilter
      );
    }
    if (req.query.categorySlug) {
      services = services.filter(
        (service) => service.categorySlug === String(req.query.categorySlug).toLowerCase()
      );
    }
    if (req.query.genderSlug) {
      services = services.filter(
        (service) => service.genderSlug === String(req.query.genderSlug).toLowerCase()
      );
    }

    res.json(services);
  } catch (error) {
    console.error('[getServices]', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM services WHERE id = $1 AND display_price IS NOT NULL',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Service not found' });
    res.json(serializeService(rows[0]));
  } catch (error) {
    console.error('[getServiceById]', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getServiceBySlug = async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM services WHERE display_price IS NOT NULL ORDER BY price ASC, popularity DESC'
    );
    const service = rows.map(serializeService).find((entry) => entry.slug === req.params.slug);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('[getServiceBySlug]', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getServices, getServiceById, getServiceBySlug };
