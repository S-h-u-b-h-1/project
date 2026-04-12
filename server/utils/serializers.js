const slugify = (value = '') =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const serializeBusiness = (row) => ({
  _id: row.id,
  name: row.name,
  phone: row.phone,
  email: row.email,
  whatsapp: row.whatsapp,
  hours: row.hours,
  address: row.address,
  logo: row.logo,
});

const serializeLocation = (row) => ({
  _id: row.id,
  name: row.name,
  address: row.address,
  city: row.city,
  phone: row.phone,
  googleMapsLink: row.googlemapslink,
  mapUrl: row.googlemapslink,
  lat: row.lat,
  lng: row.lng,
  fullAddress: [row.address, row.city].filter(Boolean).join(', '),
});

const serializeOffer = (row) => ({
  _id: row.id,
  title: row.title,
  description: row.description,
  discountPercentage: row.discountpercentage,
  bannerUrl: row.bannerurl,
  validUntil: row.valid_until,
  valid_until: row.valid_until,
});

const serializeTestimonial = (row) => ({
  _id: row.id,
  customerName: row.customername,
  rating: row.rating,
  review: row.review,
  avatarUrl: row.avatarurl,
});

const serializeService = (row) => ({
  ...row,
  _id: row.id,
  imageUrl: row.image,
  displayPrice: row.display_price || String(row.price),
  slug: slugify(row.name),
  categorySlug: slugify(row.category),
  genderSlug: slugify(row.gender),
});

module.exports = {
  serializeBusiness,
  serializeLocation,
  serializeOffer,
  serializeService,
  serializeTestimonial,
  slugify,
};
