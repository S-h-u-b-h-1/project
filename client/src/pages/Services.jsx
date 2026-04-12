import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getServices } from '../services/api';
import ServiceCard from '../components/ServiceCard';

const genderOptions = [
  { label: 'Women', slug: 'women' },
  { label: 'Men', slug: 'men' },
];

const titleFromSlug = (slug = '') =>
  slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const Services = () => {
  const navigate = useNavigate();
  const { genderSlug, categorySlug } = useParams();

  const activeGender = genderOptions.find((option) => option.slug === genderSlug)?.label || 'Women';

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    getServices({
      gender: activeGender,
      sort: 'price_asc',
      ...(categorySlug ? { categorySlug } : {}),
    })
      .then((res) => setServices(res.data))
      .finally(() => setLoading(false));
  }, [activeGender, categorySlug]);

  const categories = useMemo(
    () => ['All', ...new Set(services.map((service) => service.category))],
    [services]
  );

  useEffect(() => {
    if (!categorySlug) {
      setActiveCategory('All');
      return;
    }

    const categoryMatch = services.find((service) => service.categorySlug === categorySlug);
    setActiveCategory(categoryMatch?.category || titleFromSlug(categorySlug));
  }, [categorySlug, services]);

  const displayedServices = useMemo(() => {
    if (activeCategory === 'All') return services;
    return services.filter((service) => service.category === activeCategory);
  }, [activeCategory, services]);

  const handleGenderChange = (gender) => {
    const nextGenderSlug = gender.toLowerCase();
    navigate(`/services/${nextGenderSlug}`);
  };

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      navigate(`/services/${activeGender.toLowerCase()}`);
      return;
    }

    const matchingCategory = services.find((service) => service.category === category);
    if (matchingCategory) {
      navigate(`/services/${activeGender.toLowerCase()}/${matchingCategory.categorySlug}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-36 pb-24">
      <div className="section-shell">
        <div className="luxury-panel rounded-[36px] p-10 lg:p-14">
          <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.42em] text-[#af8855]">
            Service Portfolio
          </p>
          <h1 className="max-w-4xl font-serif text-5xl uppercase text-[#f8f5f2] md:text-6xl">
            Discover the salon services made to match your style, mood and moment
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-white/62">
            From everyday grooming to event-ready glamour, explore every service in one place and choose the category that fits what you are booking today.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {genderOptions.map((gender) => (
            <button
              key={gender.slug}
              onClick={() => handleGenderChange(gender.label)}
              className={`px-8 py-4 text-[11px] font-extrabold uppercase tracking-[0.28em] ${
                activeGender === gender.label
                  ? 'bg-[linear-gradient(90deg,#af8855,#d69c4a,#af8855)] text-[#212223]'
                  : 'border border-white/15 text-white/72'
              }`}
            >
              {gender.label}&apos;s Services
            </button>
          ))}
        </div>

        {!loading && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2 text-[11px] font-bold uppercase tracking-[0.24em] ${
                  activeCategory === category
                    ? 'bg-white text-[#212223]'
                    : 'border border-white/10 text-white/56'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-[430px] animate-pulse bg-white/5" />
              ))
            : displayedServices.map((service) => <ServiceCard key={service._id} service={service} />)}
        </div>

        {!loading && displayedServices.length === 0 && (
          <p className="mt-12 text-center text-lg text-white/60">
            No services are showing in this category yet. Try another beauty menu from above.
          </p>
        )}
      </div>
    </div>
  );
};

export default Services;
