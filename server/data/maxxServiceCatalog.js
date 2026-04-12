const DEFAULT_SERVICE_POSTER = '/assets/service-posters/1.png';

const serviceImages = {
  Hair: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
  'Hair Colour': 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80',
  'Hair Rituals': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80',
  'Texture Services': 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80',
  'Bleach / D-Tan': 'https://images.unsplash.com/photo-1512290923902-8a9f81dc206e?auto=format&fit=crop&w=900&q=80',
  Facials: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
  Threading: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80',
  'Face Wax': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80',
  'Body Wax': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
  'Body Services': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80',
  Makeup: 'https://images.unsplash.com/photo-1595152230460-503d744888be?auto=format&fit=crop&w=900&q=80',
  'Manicure & Pedicure':
    'https://images.unsplash.com/photo-1632345033849-54817028f04c?auto=format&fit=crop&w=900&q=80',
  'Nail Art': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80',
  default: DEFAULT_SERVICE_POSTER,
};

const categoryDurations = {
  Hair: 45,
  'Hair Colour': 120,
  'Hair Rituals': 60,
  'Texture Services': 150,
  'Bleach / D-Tan': 45,
  Facials: 75,
  Threading: 20,
  'Face Wax': 25,
  'Body Wax': 45,
  'Body Services': 60,
  Makeup: 120,
  'Manicure & Pedicure': 60,
  'Nail Art': 75,
};

const categoryDescriptions = {
  Hair: 'Precision cuts, styling, washes and finish work inspired by the live Maxx Salon menu.',
  'Hair Colour': 'Colour services and finish options mirrored from the Maxx Salon services page.',
  'Hair Rituals': 'Restorative hair spa and scalp ritual services from the current Maxx offering.',
  'Texture Services': 'Texture, smoothing and therapy services adapted from the live Maxx catalog.',
  'Bleach / D-Tan': 'D-tan, bleach and complexion refresh services listed on the live Maxx menu.',
  Facials: 'Facials and cleanup variants mapped directly from the Maxx Salon service menu.',
  Threading: 'Threading services mirrored from the women’s facial grooming section.',
  'Face Wax': 'Face waxing options imported from the current Maxx Salon menu.',
  'Body Wax': 'Body waxing options and tiered pricing pulled from the live Maxx catalog.',
  'Body Services': 'Massage, polishing and body care services currently offered by Maxx Salon.',
  Makeup: 'Event and bridal makeup services mirrored from the live women’s makeup menu.',
  'Manicure & Pedicure': 'Hand and foot care services imported from the Maxx Salon menu.',
  'Nail Art': 'Nail art menu entry mirrored from the live site.',
};

const rawCatalog = [
  {
    gender: 'Women',
    category: 'Hair',
    items: [
      ['Hair Trim', '300'],
      ['Hair Cut', '500 / 800'],
      ['Splitends', '500'],
      ['Shampoo & Conditioner', '350 / 400'],
      ['Blow Dry', '350 Onwards'],
      ['Curls/Ironing/Chrimping', '500 Onwards'],
      ['Hair Do', '800 Onwards'],
    ],
  },
  {
    gender: 'Women',
    category: 'Hair Colour',
    items: [
      ['Touch-Up', '1200 / 1500'],
      ['Highlights', '6000 Onwards'],
      ['Global Colour', '6000 Onwards'],
      ['Balayage/Ombre', '6000 Onwards'],
    ],
  },
  {
    gender: 'Women',
    category: 'Hair Rituals',
    items: [
      ['Hair Spa Loreal', '1200'],
      ['Hair Spa Schwarzkoph', '1500'],
      ['Scalp Treatment', '1500'],
      ['Keratin Hair Spa', '2000'],
    ],
  },
  {
    gender: 'Women',
    category: 'Texture Services',
    items: [
      ['Keratin', '5000 Onwards'],
      ['Botox', '6000 Onwards'],
      ['Smoothening', '6000 Onwards'],
      ['Kerasmooth', '8500 Onwards'],
    ],
  },
  {
    gender: 'Women',
    category: 'Bleach / D-Tan',
    items: [
      ['Face Premium', '500'],
      ['Face Luxury', '700'],
      ['Arms', '800'],
      ['Legs', '1000'],
      ['Front', '500'],
      ['Back', '500'],
      ['Regular Full Body', '2000'],
      ['Luxury Full Body', '3000'],
      ['Body Polishing', '4000'],
    ],
  },
  {
    gender: 'Women',
    category: 'Facials',
    items: [
      ['Lotus Facial', '1500'],
      ['Whitening Facial', '2000'],
      ['Wine Facial', '2500'],
      ['03+Facial', '3500'],
      ['Kenpeki', '4000'],
      ['Caslmara', '6000'],
      ['Peel Medi Spa', '4000'],
      ['Hydra Facial', '3000'],
    ],
  },
  {
    gender: 'Women',
    category: 'Threading',
    items: [
      ['Eye Brow', '50'],
      ['Chin/Upperlips/Forhead', '30 Each'],
      ['Side Licks', '100'],
    ],
  },
  {
    gender: 'Women',
    category: 'Face Wax',
    items: [
      ['Eye Brow', '120'],
      ['Chin/Upperlips/Forhead', '60 Each'],
      ['Side Locks', '200'],
      ['Full Face', '500'],
    ],
  },
  {
    gender: 'Women',
    category: 'Body Wax',
    items: [
      ['Under Arms', '100 / 150'],
      ['Full Arms', '350 / 500'],
      ['Half Legs', '350 / 500'],
      ['Front', '400 / 600'],
      ['Back', '400 / 600'],
      ['Bikni', '1500'],
      ['Full Body', '2000 / 3500'],
    ],
  },
  {
    gender: 'Women',
    category: 'Makeup',
    items: [
      ['Party Make-up', '2500 / 3500 / 4000'],
      ['Engagement Make-up', '8000 / 12000 / 15000'],
      ['Bridal Make-Up', '12000 / 16000 / 22000'],
      ['Reception Make-up', '10000 / 12000 / 16000'],
    ],
  },
  {
    gender: 'Women',
    category: 'Manicure & Pedicure',
    items: [
      ['Regular Mani/Pedi', '800 / 800'],
      ['Premium Mani/Pedi', '1200 / 1200'],
      ['Luxury Mani/Pedi', '1500 / 1500'],
      ['Naill Cut', '200'],
      ['Foot Massage', '400'],
      ['Head Massage', '400'],
      ['Body Massage', '1500'],
    ],
  },
  {
    gender: 'Women',
    category: 'Nail Art',
    items: [['Nail Art', '1500 Onwards']],
  },
  {
    gender: 'Men',
    category: 'Hair',
    items: [
      ['Hair Cut', '150'],
      ['O Hair Cut', '200'],
      ['Shave', '100'],
      ['Beard', '150'],
      ['Hair Style', '150'],
      ['Head Massage', '200/250'],
      ['Head Wash', '100'],
    ],
  },
  {
    gender: 'Men',
    category: 'Hair Colour',
    items: [
      ['Hair Colour', '800'],
      ['Beard Colour', '400'],
      ['Highlight', '2000 Onwards'],
    ],
  },
  {
    gender: 'Men',
    category: 'Hair Rituals',
    items: [
      ['Hair Spa Loreal', '1200'],
      ['Hair Spa Schwarzkoph', '1200'],
      ['Scalp Treatment', '1500'],
    ],
  },
  {
    gender: 'Men',
    category: 'Texture Services',
    items: [
      ['Straight Therapy', '3500'],
      ['Keratin', '2500'],
    ],
  },
  {
    gender: 'Men',
    category: 'Bleach / D-Tan',
    items: [
      ['03+D-Tan', '500'],
      ['Arms', '800'],
      ['Legs', '800'],
      ['Front/Back', '800'],
      ['Regular Full Body', '2000'],
      ['Luxury full Body', '3000'],
    ],
  },
  {
    gender: 'Men',
    category: 'Facials',
    items: [
      ['Lotus Facial', '1500'],
      ['Whitening Facial', '2000'],
      ['Raga/Red Wine', '2500'],
      ['03+Facial', '3500'],
      ['Kanpeki Facial', '4000'],
      ['Hydra Facial', '3000 Onwards'],
    ],
  },
  {
    gender: 'Men',
    category: 'Body Services',
    items: [
      ['Body Massage', '1500'],
      ['Body Polishing Premium', '2500'],
      ['Body Polishing Luxury', '4000'],
    ],
  },
  {
    gender: 'Men',
    category: 'Body Wax',
    items: [
      ['Under Arms', '100 / 200'],
      ['Full Arms', '300 / 600'],
      ['Half Legs', '300 / 600'],
      ['Chest', '400 / 900'],
      ['Back', '400 / 900'],
    ],
  },
  {
    gender: 'Men',
    category: 'Manicure & Pedicure',
    items: [
      ['Regular Mani/Pedi', '800 / 800'],
      ['Premium Mani/Pedi', '1200 / 1200'],
      ['Luxury Mani/Pedi', '1500 / 1500'],
      ['Naill Cut', '200'],
      ['Foot Massage', '400'],
    ],
  },
  {
    gender: 'Men',
    category: 'Makeup',
    items: [['Mekeup', '2000']],
  },
];

const extractNumericPrice = (displayPrice) => {
  const match = String(displayPrice).match(/\d+/);
  return match ? Number(match[0]) : 0;
};

const buildServiceRecord = (serviceName, displayPrice, gender, category, index) => ({
  name: serviceName,
  gender,
  category,
  price: extractNumericPrice(displayPrice),
  displayPrice,
  description: categoryDescriptions[category] || 'Premium salon service mirrored from the live Maxx Salon catalog.',
  image: serviceImages[category] || serviceImages.default,
  duration: categoryDurations[category] || 45,
  popularity: Math.max(30, 100 - index),
});

const maxxServiceCatalog = rawCatalog.flatMap((section) =>
  section.items.map(([serviceName, displayPrice], index) =>
    buildServiceRecord(serviceName, displayPrice, section.gender, section.category, index)
  )
);

module.exports = { maxxServiceCatalog };
