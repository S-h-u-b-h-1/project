import axios from 'axios';

const PRIMARY_LOCATION_MAP_URL = 'https://maps.app.goo.gl/wyipAAG3RJmFGm1x5';
const DEFAULT_WHATSAPP_NUMBER = '917988023157';
const DEFAULT_SERVICE_POSTER = '/assets/service-posters/1.png';

// Central API instance — points to production Render backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://project-1uqw.onrender.com/api',
  timeout: 60000, // 60s — covers Render cold-start (typically 30–50s on free tier)
});

// Retry interceptor: retries on timeout or network error, max 2 attempts
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;

    if (!config) return Promise.reject(error);

    config._retryCount = config._retryCount || 0;
    const isTimeout = error.code === 'ECONNABORTED';

    if (config._retryCount < 2 && isTimeout) {
      config._retryCount += 1;
      const delay = config._retryCount * 2000; // 2s, then 4s
      console.warn(`[API] Retry ${config._retryCount}/2 in ${delay}ms for ${config.url}`);
      await new Promise((r) => setTimeout(r, delay));
      return api(config);
    }

    return Promise.reject(error);
  }
);

const normalizeServices = (services = []) =>
  services.map((service) => ({
    ...service,
    imageUrl: service.imageUrl || service.image || DEFAULT_SERVICE_POSTER,
    displayPrice: service.displayPrice || service.display_price || String(service.price ?? ''),
  }));

const normalizeTestimonials = (testimonials = []) =>
  testimonials.map((testimonial) => ({
    ...testimonial,
    customerName: testimonial.customerName || testimonial.customername,
    avatarUrl: testimonial.avatarUrl || testimonial.avatarurl || null,
  }));

const normalizeLocations = (locations = []) =>
  locations.map((location) => ({
    ...location,
    mapUrl:
      location.mapUrl ||
      location.googleMapsLink ||
      location.googlemapslink ||
      PRIMARY_LOCATION_MAP_URL,
  }));

const normalizeOffers = (offers = []) =>
  offers.map((offer) => ({
    ...offer,
    discountPercentage: offer.discountPercentage || offer.discountpercentage || 0,
    bannerUrl: offer.bannerUrl || offer.bannerurl || DEFAULT_SERVICE_POSTER,
  }));

const normalizeBusiness = (business) =>
  business
    ? {
        ...business,
        logo: business.logo || null,
      }
    : null;

export const getServices        = (params = { sort: 'price_asc' }) => {
  const query = new URLSearchParams(params).toString();
  return api
    .get(query ? `/services?${query}` : '/services')
    .then((response) => ({
      ...response,
      data: normalizeServices(response.data),
    }));
};
export const getServiceById     = (id)    => api.get(`/services/${id}`);
export const getServiceBySlug   = (slug)  => api.get(`/services/slug/${slug}`);
export const getAppointments    = ()      => api.get('/appointments');
export const createAppointment  = (data)  => api.post('/appointments', data);
export const getTestimonials    = ()      =>
  api.get('/testimonials').then((response) => ({
    ...response,
    data: normalizeTestimonials(response.data),
  }));
export const createTestimonial  = (data)  =>
  api.post('/testimonials', data).then((response) => ({
    ...response,
    data: {
      ...response.data,
      customerName: response.data.customerName || response.data.customername,
      avatarUrl: response.data.avatarUrl || response.data.avatarurl || null,
    },
  }));
export const getLocations       = ()      =>
  api.get('/locations').then((response) => ({
    ...response,
    data: normalizeLocations(response.data),
  }));
export const getOffers          = ()      =>
  api.get('/offers').then((response) => ({
    ...response,
    data: normalizeOffers(response.data),
  }));
export const getHomepageData    = ()      =>
  api.get('/homepage-data').then((response) => ({
    ...response,
    data: {
      ...response.data,
      featuredServices: normalizeServices(response.data.featuredServices || []),
      offers: normalizeOffers(response.data.offers || []),
      testimonials: normalizeTestimonials(response.data.testimonials || []),
      business: normalizeBusiness(response.data.business),
    },
  }));
export const getBusinessInfo    = ()      =>
  api.get('/business-info').then((response) => ({
    ...response,
    data: normalizeBusiness(response.data),
  }));

export const buildWhatsAppBookingLink = ({
  customerName,
  customerPhone,
  customerEmail,
  locationName,
  locationAddress,
  date,
  timeSlot,
  cart = [],
  totalPrice = 0,
  totalDuration = 0,
}) => {
  const serviceLines = cart.length
    ? cart.map(
        (service, index) =>
          `${index + 1}. ${service.name} (${service.displayPrice || service.price})`
      )
    : ['No services selected'];

  const message = [
    'Hello THE MAXX SALON,',
    '',
    'I have just placed a booking request. Please confirm my appointment.',
    '',
    `Name: ${customerName || '-'}`,
    `Phone: ${customerPhone || '-'}`,
    `Email: ${customerEmail || '-'}`,
    `Location: ${locationName || '-'}`,
    `Address: ${locationAddress || '-'}`,
    `Date: ${date || '-'}`,
    `Time Slot: ${timeSlot || '-'}`,
    '',
    'Order Summary:',
    ...serviceLines,
    '',
    `Total Price: INR ${totalPrice || 0}`,
    `Total Duration: ${totalDuration || 0} min`,
  ].join('\n');

  return `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export default api;
