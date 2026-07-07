import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  buildWhatsAppBookingLink,
  createAppointment,
  getLocations,
  getServices,
} from '../services/api';
import { resolveServiceImage } from '../data/serviceImages';

const bookingFilters = [
  { id: 'all', label: 'All Services' },
  { id: 'hair', label: 'Hair & Styling' },
  { id: 'skin', label: 'Skin & Facials' },
  { id: 'body', label: 'Body & Nails' },
  { id: 'makeup', label: 'Makeup' },
];

const timeSlots = ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'];

const categoryBucket = (service) => {
  const source = `${service.category} ${service.mainCategory || ''}`.toLowerCase();
  if (source.includes('hair') || source.includes('texture')) return 'hair';
  if (
    source.includes('facial') ||
    source.includes('thread') ||
    source.includes('face wax') ||
    source.includes('d-tan') ||
    source.includes('bleach') ||
    source.includes('skin')
  ) {
    return 'skin';
  }
  if (
    source.includes('body') ||
    source.includes('mani') ||
    source.includes('pedi') ||
    source.includes('nail')
  ) {
    return 'body';
  }
  if (source.includes('makeup')) return 'makeup';
  return 'all';
};

const BookAppointment = () => {
  const navigate = useNavigate();
  const { serviceSlug } = useParams();
  const [searchParams] = useSearchParams();

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    location: '',
    date: '',
    timeSlot: '',
  });

  useEffect(() => {
    Promise.all([getServices({ sort: 'price_asc' }), getLocations()]).then(([serviceRes, locationRes]) => {
      setServices(serviceRes.data);
      setLocations(locationRes.data);
    });
  }, []);

  useEffect(() => {
    if (services.length === 0) return;

    const queryService = searchParams.get('service');
    const target = serviceSlug || queryService || '';

    if (!target) {
      return;
    }

    const matched = services.find(
      (service) =>
        service.slug === target ||
        String(service._id) === target ||
        service.name.toLowerCase() === target.toLowerCase()
    );

    if (matched) {
      setCart((current) =>
        current.some((service) => service._id === matched._id) ? current : [...current, matched]
      );
    }
  }, [serviceSlug, searchParams, services]);

  const visibleServices = useMemo(() => {
    return services.filter((service) => {
      const matchesFilter = filter === 'all' || categoryBucket(service) === filter;
      const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search, services]);

  const subtotal = useMemo(
    () => cart.reduce((sum, service) => sum + Number(service.price || 0), 0),
    [cart]
  );

  const totalDuration = useMemo(
    () => cart.reduce((sum, service) => sum + Number(service.duration || 0), 0),
    [cart]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSelectService = (service) => {
    setCart((current) =>
      current.some((entry) => entry._id === service._id) ? current : [...current, service]
    );
    navigate(`/book/${service.slug}`, { replace: false });
  };

  const handleRemoveService = (serviceId) => {
    setCart((current) => current.filter((service) => service._id !== serviceId));
    if (serviceSlug && cart.length <= 1) {
      navigate('/book', { replace: true });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      window.alert('Please add at least one service before submitting the booking.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        serviceId: cart[0]._id,
        serviceIds: cart.map((service) => service._id),
        serviceSlug: cart[0].slug,
        serviceSlugs: cart.map((service) => service.slug),
        serviceName: cart[0].name,
        serviceNames: cart.map((service) => service.name),
        cartItems: cart.map((service) => ({
          id: service._id,
          slug: service.slug,
          name: service.name,
          category: service.category,
          price: service.price,
          displayPrice: service.displayPrice,
          duration: service.duration,
        })),
        totalPrice: subtotal,
        totalDuration,
      };

      const response = await createAppointment(payload);
      const selectedLocation =
        locations.find((entry) => String(entry._id) === String(formData.location)) || null;
      const bookingSummary = {
        bookingId: response.data?.id || response.data?._id || null,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        locationName: selectedLocation?.name || 'THE MAXX SALON',
        locationAddress:
          selectedLocation?.fullAddress ||
          [selectedLocation?.address, selectedLocation?.city].filter(Boolean).join(', '),
        date: formData.date,
        timeSlot: formData.timeSlot,
        cart,
        totalPrice: subtotal,
        totalDuration,
      };
      const whatsAppUrl = buildWhatsAppBookingLink(bookingSummary);

      setCart([]);
      setFormData({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        location: '',
        date: '',
        timeSlot: '',
      });
      navigate('/booking-confirmation', {
        replace: true,
        state: {
          bookingSummary,
          whatsAppUrl,
        },
      });
    } catch {
      window.alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pearl">
      <div className="section-shell pt-28 pb-8 lg:pt-32 lg:pb-12">
        <div className="mb-8 overflow-hidden rounded-[24px] border border-black/8 bg-white/60 shadow-[0_18px_45px_rgba(33,34,35,0.08)]">
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#af8855]">
                Booking Flow
              </p>
              <p className="mt-2 text-sm text-[#6f6f6f]">
                {cart.length > 0 ? (
                  <>
                    Your salon plan includes <span className="font-bold text-charcoal">{cart.length} service{cart.length > 1 ? 's' : ''}</span>
                  </>
                ) : (
                  <>
                    Step 1 of 2 <span className="font-bold text-charcoal">Choose Your Services</span>
                  </>
                )}
              </p>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#6f6f6f]">
              {cart.length > 0 ? 'Details' : 'Selection'}
            </p>
          </div>
          <div className="h-1 bg-black/5">
            <div className={`h-full bg-primary transition-all duration-500 ${cart.length > 0 ? 'w-full' : 'w-1/2'}`} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="order-2 lg:order-1 lg:col-span-2">
            <div className="lg:sticky lg:top-24 soft-panel rounded-[24px] p-6">
              <h3 className="mb-4 font-serif text-2xl uppercase text-charcoal">Your Beauty Cart</h3>
              <p className="mb-6 text-sm text-[#6f6f6f]">Add every service you want to enjoy, then confirm one smooth salon appointment for the full experience.</p>

              {cart.length === 0 ? (
                <p className="rounded-xl bg-white/70 px-4 py-8 text-center text-sm text-[#6f6f6f]">
                  Choose from the service menu to begin building your appointment.
                </p>
              ) : (
                <div className="mb-6 space-y-4 rounded-xl bg-white/70 p-4">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={resolveServiceImage(cart[0])}
                      alt={cart[0].name}
                      className="h-44 w-full object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    {cart.map((service) => (
                      <div key={service._id} className="flex items-start justify-between gap-3 border-b border-black/5 pb-3 last:border-b-0 last:pb-0">
                        <div>
                          <p className="text-sm font-semibold text-charcoal">{service.name}</p>
                          <p className="text-[11px] uppercase tracking-[0.24em] text-primary">{service.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-charcoal">₹{service.displayPrice}</p>
                          <button
                            type="button"
                            onClick={() => handleRemoveService(service._id)}
                            className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#e55d42]"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-[#212223] px-4 py-4 text-[#f8f5f2]">
                    <div className="flex items-center justify-between text-sm">
                      <span>Subtotal</span>
                      <span className="font-semibold">₹{subtotal}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-white/70">
                      <span>Total duration</span>
                      <span>{totalDuration} min</span>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-charcoal outline-none focus:border-primary"
                />
                <input
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  title="Please enter a 10-digit mobile number"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-charcoal outline-none focus:border-primary"
                />
                <input
                  name="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-charcoal outline-none focus:border-primary"
                />
                <select
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-charcoal outline-none focus:border-primary"
                >
                  <option value="">Choose your salon location</option>
                  {locations.map((entry) => (
                    <option key={entry._id} value={entry._id}>
                      {entry.name}
                    </option>
                  ))}
                </select>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    required
                    name="date"
                    type="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-charcoal outline-none focus:border-primary"
                  />
                  <select
                    required
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-charcoal outline-none focus:border-primary"
                  >
                    <option value="">Choose your time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" disabled={loading || cart.length === 0} className="gold-button w-full rounded-xl">
                  {loading ? 'Submitting...' : 'Confirm My Appointment'}
                </button>
              </form>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-3">
            <div className="mb-6">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search for the service you want to book..."
                className="w-full rounded-xl border border-black/10 bg-white px-5 py-3.5 text-sm text-charcoal outline-none focus:border-primary"
              />
            </div>

            <div className="mb-8 flex gap-2 overflow-x-auto">
              {bookingFilters.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all ${
                    filter === item.id
                      ? 'bg-primary text-charcoal'
                      : 'border border-black/10 bg-white text-[#6f6f6f]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="book-services-scroll max-h-[72vh] overflow-y-auto pr-2 lg:max-h-[calc(100vh-14rem)]">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {visibleServices.map((service) => (
                <div
                  key={service._id}
                  className={`overflow-hidden rounded-[18px] border bg-white transition-all ${
                    cart.some((entry) => entry._id === service._id)
                      ? 'border-primary shadow-lg'
                      : 'border-black/10 hover:border-primary/40'
                  }`}
                >
                  <img
                    src={resolveServiceImage(service)}
                    alt={service.name}
                    className="h-44 w-full object-cover"
                  />
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                        <h4 className="font-serif text-2xl text-charcoal">{service.name}</h4>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-primary">
                          {service.gender} / {service.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-charcoal">₹{service.price}</p>
                        {service.displayPrice !== String(service.price) && (
                          <p className="text-[10px] font-bold text-[#6f6f6f]">{service.displayPrice}</p>
                        )}
                      </div>
                      </div>
                      <p className="mt-3 text-sm text-[#6f6f6f]">
                        {service.description || 'A salon favourite designed to leave you polished, confident and beautifully finished.'}
                      </p>
                      <button
                        onClick={() => handleSelectService(service)}
                        className={`mt-4 w-full rounded-lg py-2.5 text-sm font-semibold transition-all ${
                        cart.some((entry) => entry._id === service._id)
                          ? 'bg-primary text-charcoal'
                          : 'border border-primary/40 text-primary hover:bg-primary hover:text-charcoal'
                        }`}
                      >
                        {cart.some((entry) => entry._id === service._id) ? 'Added to your plan' : 'Add to appointment'}
                      </button>
                    </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
