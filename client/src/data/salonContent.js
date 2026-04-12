import { serviceImageLibrary } from './serviceImages';

export const heroSlides = [
  {
    title: 'Luxury Hair, Skin And Bridal Experiences',
    eyebrow: 'Maxx Signature',
    description:
      'Discover hair artistry, radiant skin rituals, bridal finishing and indulgent salon care designed to make every appearance feel elevated.',
    image: serviceImageLibrary.hairCut,
  },
  {
    title: 'Bridal Glamour With An Editorial Finish',
    eyebrow: 'Bridal Maxx',
    description:
      'From glowing skin prep to signature bridal hair and makeup, every detail is tailored for your most unforgettable celebrations.',
    image: serviceImageLibrary.makeup,
  },
  {
    title: 'Colour, Texture And Hair Revival Rituals',
    eyebrow: 'Hair Therapy',
    description:
      'Choose transformative colour, smoothening, keratin care and restorative hair therapies guided by expert consultation.',
    image: serviceImageLibrary.texture,
  },
];

export const exploreCards = [
  {
    title: "Men's Grooming",
    subtitle: 'Explore menu',
    to: '/services/men',
    image: serviceImageLibrary.menGrooming,
  },
  {
    title: "Women's Styling",
    subtitle: 'Explore menu',
    to: '/services/women',
    image: serviceImageLibrary.hairColor,
  },
];

export const curatedCategories = [
  {
    title: 'Skin & Facial',
    to: '/services/women/facials',
    image: serviceImageLibrary.facial,
  },
  {
    title: 'Bridal Maxx',
    to: '/about',
    image: serviceImageLibrary.makeup,
  },
  {
    title: 'Nail Art',
    to: '/services/women/nail-art',
    image: serviceImageLibrary.nail,
  },
  {
    title: 'Body Rituals',
    to: '/services/men/body-services',
    image: serviceImageLibrary.body,
  },
];

export const stats = [
  { value: '500+', label: 'Looks beautifully completed' },
  { value: '12', label: 'Signature beauty categories' },
  { value: '4.1/5', label: 'Client-loved salon experience' },
  { value: '7 days', label: 'Concierge support available' },
];

export const blogTeasers = [
  {
    title: 'How to prep glowing skin before party makeup',
    blurb: 'Learn the salon-prep ritual that helps makeup sit beautifully and stay fresh for hours.',
  },
  {
    title: 'Choosing between keratin, botox and smoothening',
    blurb: 'Find the right treatment for your texture, frizz level and everyday styling routine.',
  },
  {
    title: 'What to bring for your bridal trial appointment',
    blurb: 'Reference images, outfit tones and beauty goals help your final bridal look come together faster.',
  },
];

export const contactHighlights = [
  'Consultation-led beauty planning before every service',
  'Quick WhatsApp support for bookings and style questions',
  'Premium appointments tailored around your time and beauty goals',
];
