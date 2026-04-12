require('dotenv').config();
const { pool } = require('../config/db');
const { maxxServiceCatalog } = require('./maxxServiceCatalog');

const syncServicesCatalog = async () => {
  try {
    const catalogKeys = new Set(
      maxxServiceCatalog.map((service) => `${service.name}:::${service.gender}:::${service.category}`)
    );

    await pool.query(`
      ALTER TABLE services
      ADD COLUMN IF NOT EXISTS display_price VARCHAR(100)
    `);

    for (const service of maxxServiceCatalog) {
      const existing = await pool.query(
        `
          SELECT id
          FROM services
          WHERE name = $1 AND gender = $2 AND category = $3
          LIMIT 1
        `,
        [service.name, service.gender, service.category]
      );

      if (existing.rows.length > 0) {
        await pool.query(
          `
            UPDATE services
            SET price = $1,
                display_price = $2,
                description = $3,
                image = $4,
                duration = $5,
                popularity = $6
            WHERE id = $7
          `,
          [
            service.price,
            service.displayPrice,
            service.description,
            service.image,
            service.duration,
            service.popularity,
            existing.rows[0].id,
          ]
        );
      } else {
        await pool.query(
          `
            INSERT INTO services (name, gender, category, price, display_price, description, image, duration, popularity)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          `,
          [
            service.name,
            service.gender,
            service.category,
            service.price,
            service.displayPrice,
            service.description,
            service.image,
            service.duration,
            service.popularity,
          ]
        );
      }
    }

    const staleServices = await pool.query(`
      SELECT id, name, gender, category
      FROM services
    `);

    for (const service of staleServices.rows) {
      const key = `${service.name}:::${service.gender}:::${service.category}`;

      if (catalogKeys.has(key)) continue;

      const appointmentRef = await pool.query(
        `
          SELECT 1
          FROM appointments
          WHERE service_id = $1
          LIMIT 1
        `,
        [service.id]
      );

      if (appointmentRef.rows.length === 0) {
        await pool.query('DELETE FROM services WHERE id = $1', [service.id]);
      }
    }

    console.log(`Synced ${maxxServiceCatalog.length} Maxx services into PostgreSQL.`);
    process.exit(0);
  } catch (error) {
    console.error('Service sync failed:', error.message);
    process.exit(1);
  }
};

syncServicesCatalog();
