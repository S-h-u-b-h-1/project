const { pool } = require('../config/db');
const { slugify } = require('../utils/serializers');

const createAppointment = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      serviceId,
      serviceIds,
      serviceSlug,
      serviceSlugs,
      serviceName,
      serviceNames,
      cartItems,
      totalPrice,
      totalDuration,
      location,
      date,
      timeSlot,
    } = req.body;

    const requestedIds = Array.isArray(serviceIds)
      ? serviceIds.filter(Boolean)
      : serviceId
        ? [serviceId]
        : [];

    const requestedSlugs = Array.isArray(serviceSlugs)
      ? serviceSlugs.filter(Boolean)
      : serviceSlug
        ? [serviceSlug]
        : [];

    const requestedNames = Array.isArray(serviceNames)
      ? serviceNames.filter(Boolean)
      : serviceName
        ? [serviceName]
        : [];

    const { rows: serviceRows } = await pool.query(
      'SELECT id, name, category, gender, price, display_price, duration FROM services WHERE display_price IS NOT NULL ORDER BY price ASC, popularity DESC'
    );

    const selectedServices = [];

    for (const id of requestedIds) {
      const matched = serviceRows.find((service) => String(service.id) === String(id));
      if (matched && !selectedServices.some((service) => service.id === matched.id)) {
        selectedServices.push(matched);
      }
    }

    for (const slug of requestedSlugs) {
      const matched = serviceRows.find((service) => slugify(service.name) === slugify(slug));
      if (matched && !selectedServices.some((service) => service.id === matched.id)) {
        selectedServices.push(matched);
      }
    }

    for (const name of requestedNames) {
      const matched = serviceRows.find(
        (service) => service.name.toLowerCase() === String(name).toLowerCase()
      );
      if (matched && !selectedServices.some((service) => service.id === matched.id)) {
        selectedServices.push(matched);
      }
    }

    if (selectedServices.length === 0) {
      return res.status(400).json({ error: 'At least one valid service is required.' });
    }

    const primaryServiceId = selectedServices[0].id;
    const normalizedCartItems = selectedServices.map((service) => ({
      id: service.id,
      slug: slugify(service.name),
      name: service.name,
      category: service.category,
      gender: service.gender,
      price: service.price,
      displayPrice: service.display_price || String(service.price),
      duration: service.duration,
    }));

    const computedTotalPrice = normalizedCartItems.reduce((sum, service) => sum + Number(service.price || 0), 0);
    const computedTotalDuration = normalizedCartItems.reduce(
      (sum, service) => sum + Number(service.duration || 0),
      0
    );

    const query = `
      INSERT INTO appointments (
        customer_name,
        customer_phone,
        customer_email,
        service_id,
        cart_items,
        total_price,
        total_duration,
        service_count,
        location,
        appointment_date,
        time_slot
      )
      VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, $8, $9, $10, $11) RETURNING *
    `;
    const { rows } = await pool.query(query, [
      customerName,
      customerPhone,
      customerEmail,
      primaryServiceId,
      JSON.stringify(Array.isArray(cartItems) && cartItems.length ? normalizedCartItems : normalizedCartItems),
      computedTotalPrice || Number(totalPrice) || 0,
      computedTotalDuration || Number(totalDuration) || 0,
      normalizedCartItems.length,
      location,
      date,
      timeSlot,
    ]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createAppointment };
