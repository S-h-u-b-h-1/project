import { useEffect, useRef } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { CheckCircle2, MessageCircle, CalendarDays, MapPin, Clock3 } from 'lucide-react';

const BookingConfirmation = () => {
  const { state } = useLocation();
  const hasOpenedWhatsApp = useRef(false);

  useEffect(() => {
    document.title = 'Appointment Confirmed | THE MAXX SALON';
  }, []);

  useEffect(() => {
    if (!state?.whatsAppUrl || hasOpenedWhatsApp.current) {
      return;
    }

    hasOpenedWhatsApp.current = true;
    window.open(state.whatsAppUrl, '_blank', 'noopener,noreferrer');
  }, [state]);

  if (!state?.bookingSummary) {
    return <Navigate to="/book" replace />;
  }

  const {
    customerName,
    locationName,
    locationAddress,
    date,
    timeSlot,
    cart,
    totalPrice,
    totalDuration,
  } = state.bookingSummary;

  return (
    <div className="min-h-screen bg-pearl">
      <div className="section-shell pt-32 pb-20">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[36px] border border-black/8 bg-white shadow-[0_24px_65px_rgba(33,34,35,0.08)]">
          <div className="bg-[linear-gradient(135deg,#212223,#2b2d2f)] px-8 py-12 text-center text-[#f8f5f2] md:px-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#af8855]/30 bg-[#af8855]/12">
              <CheckCircle2 size={40} className="text-[#d69c4a]" />
            </div>
            <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.38em] text-[#af8855]">
              Booking Confirmed
            </p>
            <h1 className="mt-4 font-serif text-4xl uppercase md:text-5xl">
              Your appointment request is now with THE MAXX SALON
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
              We have prepared your booking summary and opened WhatsApp so you can send the confirmation message directly to the salon team.
            </p>
          </div>

          <div className="grid gap-8 px-8 py-10 md:px-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#af8855]">
                Guest Details
              </p>
              <div className="mt-5 space-y-4 rounded-[28px] border border-black/8 bg-[#f8f5f2] p-6">
                <p className="text-2xl font-semibold text-charcoal">{customerName}</p>
                <div className="flex items-start gap-3 text-[#5f584d]">
                  <MapPin size={18} className="mt-1 text-[#af8855]" />
                  <div>
                    <p className="font-semibold text-charcoal">{locationName}</p>
                    <p>{locationAddress}</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 text-[#5f584d]">
                    <CalendarDays size={18} className="text-[#af8855]" />
                    <span>{date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#5f584d]">
                    <Clock3 size={18} className="text-[#af8855]" />
                    <span>{timeSlot}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#af8855]">
                Order Summary
              </p>
              <div className="mt-5 rounded-[28px] border border-black/8 bg-white p-6">
                <div className="space-y-4">
                  {cart.map((service) => (
                    <div key={service._id || service.id || service.slug} className="flex items-start justify-between gap-4 border-b border-black/6 pb-4 last:border-b-0 last:pb-0">
                      <div>
                        <p className="font-semibold text-charcoal">{service.name}</p>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#af8855]">
                          {service.category}
                        </p>
                      </div>
                      <p className="font-semibold text-charcoal">INR {service.displayPrice || service.price}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[22px] bg-[#212223] px-5 py-4 text-[#f8f5f2]">
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Price</span>
                    <span className="font-semibold">INR {totalPrice}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-white/70">
                    <span>Total Duration</span>
                    <span>{totalDuration} min</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <a
                    href={state.whatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="gold-button w-full justify-center rounded-full"
                  >
                    <MessageCircle size={16} />
                    Send on WhatsApp
                  </a>
                  <Link to="/book" className="outline-button w-full justify-center rounded-full">
                    Book another service
                  </Link>
                  <Link
                    to="/"
                    className="text-center text-[11px] font-bold uppercase tracking-[0.24em] text-[#6f6f6f] hover:text-charcoal"
                  >
                    Return to home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
