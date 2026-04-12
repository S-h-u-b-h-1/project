const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const { ensureSchema } = require('./utils/ensureSchema');

// Load env vars
dotenv.config();

// Connect to database
connectDB();
ensureSchema();

const app = express();

const allowedOrigins = (
  process.env.FRONTEND_URLS ||
  'https://project-vqba.vercel.app,http://localhost:5173,http://localhost:3000'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const dynamicOriginMatchers = [
  /^https:\/\/.*\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  return dynamicOriginMatchers.some((pattern) => pattern.test(origin));
};

const corsOptions = {
  origin: function (origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(morgan('dev'));

// Task 3: Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Routes
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/offers', require('./routes/offerRoutes'));
app.use('/api', require('./routes/aggregationRoutes'));

app.get('/', (req, res) => {
  res.send('The Maxx Salon API is running...');
});

// Task 4: Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[Global Error]', err.stack);
  res.status(500).json({
    message: err.message || 'Internal Server Error',
    status: 'failed'
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
