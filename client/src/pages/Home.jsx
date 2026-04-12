import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, MessageCircle, Star } from 'lucide-react';
import { createTestimonial, getHomepageData } from '../services/api';
import ServiceCard from '../components/ServiceCard';
import TestimonialSlider from '../components/TestimonialSlider';
import {
  heroSlides,
  exploreCards,
  curatedCategories,
  stats,
  blogTeasers,
  contactHighlights,
} from '../data/salonContent';

const HeroSkeleton = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#af8855]/20 border-t-[#af8855]" />
    <p className="font-serif text-3xl text-[#f8f5f2]">Preparing your beauty experience...</p>
    <p className="max-w-md text-white/55">
      We are getting everything ready so your salon journey opens beautifully.
    </p>
  </div>
);

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewForm, setReviewForm] = useState({
    customerName: '',
    rating: 5,
    review: '',
  });
  const hasFetched = useRef(false);
  const reviewSectionRef = useRef(null);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    getHomepageData()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const featuredServices = useMemo(() => data?.featuredServices || [], [data]);
  const offers = data?.offers || [];
  const testimonials = data?.testimonials || [];
  const business = data?.business || {};

  const serviceCategories = useMemo(() => {
    const names = [...new Set(featuredServices.map((service) => service.category))];
    return names.slice(0, 4);
  }, [featuredServices]);

  const handleReviewChange = (event) => {
    const { name, value } = event.target;
    setReviewForm((current) => ({
      ...current,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    setReviewSubmitting(true);
    setReviewSuccess(false);
    setReviewError('');

    try {
      const response = await createTestimonial(reviewForm);
      setData((current) => ({
        ...current,
        testimonials: [response.data, ...(current?.testimonials || [])],
      }));
      setReviewForm({
        customerName: '',
        rating: 5,
        review: '',
      });
      setReviewSuccess(true);
    } catch {
      setReviewError('We could not submit your review right now. Please try again.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const scrollToReviewForm = () => {
    reviewSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) return <HeroSkeleton />;

  if (error || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-serif text-4xl text-[#f8f5f2]">We could not load the salon experience just yet.</p>
        <p className="max-w-md text-white/55">
          Please refresh in a moment and we will bring the latest services, offers and reviews back into view.
        </p>
        <button onClick={() => window.location.reload()} className="gold-button">
          Refresh experience
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-background">
      <section className="relative pt-24">
        <div className="relative">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,23,0.54),rgba(23,23,23,0.84))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(214,156,74,0.18),transparent_30%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_bottom,rgba(229,93,66,0.12),transparent_25%)]" />

          <div className="section-shell relative z-10 flex min-h-[88vh] items-center">
            <div className="max-w-3xl py-20">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.42em] text-[#af8855]"
              >
                {heroSlides[activeSlide].eyebrow}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 font-serif text-5xl uppercase leading-[0.92] text-[#f8f5f2] md:text-7xl"
              >
                {heroSlides[activeSlide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 max-w-2xl text-lg leading-relaxed text-white/72"
              >
                {heroSlides[activeSlide].description}
              </motion.p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/book" className="gold-button">
                  Book your appointment <ArrowRight size={14} />
                </Link>
                <Link to="/services" className="outline-button">
                  Explore services
                </Link>
                <button type="button" onClick={scrollToReviewForm} className="outline-button">
                  Leave a review
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex justify-center gap-2 bg-[#212223] py-4">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-[3px] rounded-full transition-all ${
                  index === activeSlide ? 'w-12 bg-[#d69c4a]' : 'w-6 bg-white/25'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="paper-section py-20 text-[#1b161c]">
        <div className="section-shell">
          <div className="mb-14">
            <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.42em] text-[#af8855]">
              The Experience Hubs
            </p>
            <h2 className="font-serif text-4xl uppercase md:text-5xl">
              Explore <span className="italic text-[#e55d42]">By</span> Beauty Need
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {exploreCards.map((card) => (
              <Link
                key={card.title}
                to={card.to}
                className="group relative block min-h-[420px] overflow-hidden bg-[#212223]"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[1800ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#212223] via-[#212223]/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                  <h3 className="font-serif text-4xl uppercase text-[#f8f5f2]">
                    {card.title.split(' ')[0]}{' '}
                    <span className="italic text-[#af8855]">{card.title.split(' ').slice(1).join(' ')}</span>
                  </h3>
                  <span className="mt-6 inline-flex bg-[linear-gradient(90deg,#af8855,#d69c4a,#af8855)] px-8 py-3 text-[11px] font-black uppercase tracking-[0.28em] text-[#212223]">
                    {card.subtitle}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-section pb-20 text-[#1b161c]">
        <div className="section-shell">
          <div className="mb-12">
            <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.42em] text-[#af8855]">
              Our Portfolio
            </p>
            <h2 className="font-serif text-4xl uppercase md:text-5xl">
              Curated <span className="italic text-[#e55d42]">Salon Rituals</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-[#5f584d]">
              Explore the beauty services guests return for most, from luminous facials and bridal styling to nails, grooming and body care.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {curatedCategories.map((category, index) => (
              <Link
                key={category.title}
                to={category.to}
                className="group relative block aspect-[3/4] overflow-hidden border border-black/5"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#212223] via-[#212223]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#af8855]">
                    {serviceCategories[index] || 'Salon Favourite'}
                  </p>
                  <h3 className="font-serif text-3xl uppercase text-[#f8f5f2]">{category.title}</h3>
                  <span className="mt-5 inline-flex text-[11px] font-bold uppercase tracking-[0.26em] text-[#f8f5f2] group-hover:text-[#e55d42]">
                    View details
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f5f2] py-20 text-[#212223]">
        <div className="section-shell">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 inline-flex coral-badge px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em]">
                Limited Time
              </p>
              <h2 className="font-serif text-4xl uppercase md:text-5xl">Maxx Exclusive Offers</h2>
            </div>
            <Link to="/book" className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#212223] hover:text-[#e55d42]">
              Book this offer
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {offers.map((offer, index) => (
              <article key={`${offer.title}-${index}`} className="flex flex-col">
                <div className="relative mb-6 aspect-square overflow-hidden bg-[#ede3d3]">
                  <img
                    src={offer.bannerUrl || curatedCategories[index % curatedCategories.length].image}
                    alt={offer.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-0 top-0 bg-[#212223] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f8f5f2]">
                    -{offer.discountPercentage}% off
                  </div>
                </div>
                <h3 className="font-serif text-2xl uppercase">{offer.title}</h3>
                <p className="mt-3 flex-1 text-[#5f584d]">
                  {offer.description || 'A limited-time salon indulgence created to give you more glow, more polish and more value in one visit.'}
                </p>
                <Link to="/book" className="mt-8 gold-button w-full">
                  Reserve this offer
                </Link>
              </article>
            ))}
          </div>
          {offers.length === 0 && (
            <p className="mt-8 text-sm text-[#5f584d]">
              Fresh offers will appear here as soon as they are published in the salon database.
            </p>
          )}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#212223] py-10">
        <div className="section-shell grid gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-5xl text-[#f8f5f2]">{stat.value}</p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#af8855]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="section-shell">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.42em] text-[#af8855]">
                Signature Services
              </p>
              <h2 className="font-serif text-4xl uppercase text-[#f8f5f2] md:text-5xl">
                Signature services our guests love to book
              </h2>
            </div>
            <Link to="/services" className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/65">
              View full service menu
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="paper-section py-24 text-[#1b161c]">
        <div className="section-shell">
          <div className="mb-12">
            <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.42em] text-[#af8855]">
              Journal Preview
            </p>
            <h2 className="font-serif text-4xl uppercase md:text-5xl">Beauty Notes & Ritual Guides</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {blogTeasers.map((item) => (
              <article key={item.title} className="border border-black/5 bg-white/50 p-8">
                <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#e55d42]">
                  <Sparkles size={14} />
                  Beauty journal
                </p>
                <h3 className="font-serif text-3xl uppercase">{item.title}</h3>
                <p className="mt-4 text-[#5f584d]">{item.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={reviewSectionRef} className="bg-background py-24">
        <div className="section-shell">
          <div className="mb-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.42em] text-[#af8855]">
                Testimonials
              </p>
              <h2 className="max-w-2xl font-serif text-4xl uppercase text-[#f8f5f2] md:text-5xl">
                Word of mouth with the premium Maxx cadence
              </h2>
              <p className="mt-5 max-w-xl text-white/60">
                Guests can now leave reviews directly from the homepage, and new testimonials are added to the same testimonial stream that helps new guests discover the salon.
              </p>
              <button type="button" onClick={scrollToReviewForm} className="mt-6 gold-button rounded-full">
                Add your review
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="luxury-panel rounded-[30px] p-6 lg:p-8">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#af8855]">
                Add Your Review
              </p>
              <div className="mt-5 space-y-4">
                <input
                  required
                  name="customerName"
                  value={reviewForm.customerName}
                  onChange={handleReviewChange}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#af8855]"
                />
                <select
                  name="rating"
                  value={reviewForm.rating}
                  onChange={handleReviewChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#af8855]"
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value} className="bg-[#212223]">
                      {value} Star{value > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
                <textarea
                  required
                  name="review"
                  value={reviewForm.review}
                  onChange={handleReviewChange}
                  placeholder="Share your salon experience"
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#af8855]"
                />
                <button type="submit" disabled={reviewSubmitting} className="gold-button w-full rounded-full">
                  {reviewSubmitting ? 'Submitting Review...' : 'Share Your Review'}
                </button>
                {reviewSuccess && (
                  <p className="text-sm text-emerald-400">Thank you. Your review is now part of our client love wall.</p>
                )}
                {reviewError && (
                  <p className="text-sm text-[#f29180]">{reviewError}</p>
                )}
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/40">
                  <Star size={14} className="text-[#af8855]" />
                  Your feedback helps future guests choose with confidence
                </div>
              </div>
            </form>
          </div>
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      <section className="pb-24">
        <div className="section-shell">
          <div className="luxury-panel grid gap-10 rounded-[36px] p-10 lg:grid-cols-[1.2fr_0.8fr] lg:p-14">
            <div>
              <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.42em] text-[#af8855]">
                Book The Experience
              </p>
              <h2 className="font-serif text-4xl uppercase text-[#f8f5f2] md:text-5xl">
                Book the look you have been waiting for
              </h2>
              <p className="mt-6 max-w-2xl text-white/65">
                Whether you are planning a bridal appointment, colour refresh, facial ritual or grooming session, our team is ready to shape a service around your moment.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/book" className="gold-button">
                  Book now
                </Link>
                <a
                  href={business.whatsapp || 'https://wa.me/917988023157'}
                  target="_blank"
                  rel="noreferrer"
                  className="outline-button"
                >
                  <MessageCircle size={14} />
                  Talk to our team
                </a>
              </div>
            </div>
            <div className="space-y-4">
              {contactHighlights.map((item) => (
                <div key={item} className="rounded-[24px] border border-white/10 bg-black/10 p-5">
                  <p className="text-white/78">{item}</p>
                </div>
              ))}
              <div className="rounded-[24px] border border-[#af8855]/20 bg-[#af8855]/8 p-5">
                <div className="mb-3 flex items-center gap-3 text-[#af8855]">
                  <MapPin size={16} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em]">Visit Our Flagship</span>
                </div>
                <p className="text-white/74">{business.address || 'Parsavnath City, Sector 8, Sonipat, Haryana 131001'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
