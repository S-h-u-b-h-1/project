require('dotenv').config();
const { pool } = require('../config/db');
const { maxxServiceCatalog } = require('./maxxServiceCatalog');

const seedData = async () => {
  try {
    console.log('Dropping existing tables...');
    await pool.query(`
      DROP TABLE IF EXISTS appointments;
      DROP TABLE IF EXISTS services;
      DROP TABLE IF EXISTS business_info;
      DROP TABLE IF EXISTS testimonials;
      DROP TABLE IF EXISTS offers;
      DROP TABLE IF EXISTS locations;
    `);

    console.log('Creating tables...');
    await pool.query(`
      CREATE TABLE business_info (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        email VARCHAR(255),
        whatsapp VARCHAR(255),
        hours VARCHAR(255),
        address TEXT,
        logo VARCHAR(500)
      );

      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT,
        city VARCHAR(100),
        phone VARCHAR(50),
        googleMapsLink VARCHAR(500),
        lat DECIMAL(10, 8),
        lng DECIMAL(11, 8)
      );

      CREATE TABLE services (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        gender VARCHAR(50) DEFAULT 'Unisex',
        category VARCHAR(100) NOT NULL,
        price INTEGER NOT NULL,
        display_price VARCHAR(100),
        description TEXT,
        image VARCHAR(500),
        popularity INTEGER DEFAULT 0,
        duration INTEGER NOT NULL
      );

      CREATE TABLE testimonials (
        id SERIAL PRIMARY KEY,
        customerName VARCHAR(255) NOT NULL,
        rating INTEGER,
        review TEXT,
        avatarUrl VARCHAR(500)
      );

      CREATE TABLE offers (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        discountPercentage INTEGER,
        valid_until TIMESTAMP,
        bannerUrl VARCHAR(500)
      );

      CREATE TABLE appointments (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_email VARCHAR(255),
        service_id INTEGER REFERENCES services(id),
        cart_items JSONB DEFAULT '[]'::jsonb,
        total_price INTEGER DEFAULT 0,
        total_duration INTEGER DEFAULT 0,
        service_count INTEGER DEFAULT 1,
        location VARCHAR(100),
        appointment_date DATE,
        time_slot VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Inserting initial records...');
    
    // 1. Business Info
    await pool.query(`
      INSERT INTO business_info (name, logo, phone, email, whatsapp, hours, address)
      VALUES ('THE MAXX SALON', NULL, '+91 7988023157', 'hello@maxxsalon.in', 'https://wa.me/917988023157', 'Mon-Sat: 10AM-9PM', 'Parsavnath City, Sector 8, Sonipat, Haryana 131001')
    `);

    // 2. Locations
    await pool.query(
      `
      INSERT INTO locations (name, address, city, phone, googleMapsLink)
      VALUES ($1, $2, $3, $4, $5)
    `,
      ['THE MAXX SALON SONIPAT', 'Parsavnath City, Sector 8', 'Sonipat, Haryana 131001', '+91 7988023157', 'https://maps.app.goo.gl/wyipAAG3RJmFGm1x5']
    );

    // 3. Offers
    await pool.query(`
      INSERT INTO offers (title, description, discountPercentage, valid_until)
      VALUES ('The Maxx Glow Combo', 'Facial + Hair Spa', 15, '2026-12-31 23:59:59')
    `);

    // 4. Testimonials
    await pool.query(`
      INSERT INTO testimonials (customerName, rating, review)
      VALUES ('Priya Sharma', 5, 'The makeup and hair styling was flawless.')
    `);

    // 5. Services
    for (const service of maxxServiceCatalog) {
      await pool.query(`
        INSERT INTO services (name, gender, category, price, display_price, description, image, duration, popularity)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        service.name,
        service.gender,
        service.category,
        service.price,
        service.displayPrice,
        service.description,
        service.image,
        service.duration,
        service.popularity
      ]);
    }

    console.log('PostgreSQL DB structure created and seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Seed Error:', err);
    process.exit(1);
  }
};

seedData();
