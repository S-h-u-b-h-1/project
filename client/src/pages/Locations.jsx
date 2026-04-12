import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ArrowUpRight, Clock3, MessageCircle, CalendarDays } from 'lucide-react';
import { getLocations } from '../services/api';

const buildEmbedMapUrl = (location) =>
  `https://www.google.com/maps?q=${encodeURIComponent(`${location.address}, ${location.city}`)}&output=embed`;

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations().then((res) => setLocations(res.data)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-background pt-36 pb-24">
      <div className="section-shell space-y-12">
        <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(135deg,rgba(17,18,19,0.95),rgba(33,34,35,0.88))] px-8 py-12 shadow-[0_28px_80px_rgba(0,0,0,0.24)] md:px-12 md:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,156,74,0.22),transparent_30%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(229,93,66,0.12),transparent_24%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.42em] text-[#af8855]">
                Visit THE MAXX SALON
              </p>
              <h1 className="max-w-4xl font-serif text-5xl uppercase leading-[0.92] text-[#f8f5f2] md:text-6xl">
                Visit THE MAXX SALON studio where every beauty appointment begins with ease and elegance
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/62">
                Open directions, connect with the salon team and move into booking with a smooth, guest-first experience.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#af8855]">
                  Open Hours
                </p>
                <div className="mt-3 flex items-center gap-3 text-white/74">
                  <Clock3 size={18} className="text-[#af8855]" />
                  <span>Mon-Sat, 10 AM to 9 PM</span>
                </div>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#af8855]">
                  Assistance
                </p>
                <div className="mt-3 flex items-center gap-3 text-white/74">
                  <MessageCircle size={18} className="text-[#af8855]" />
                  <span>WhatsApp and call support</span>
                </div>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#af8855]">
                  Booking Flow
                </p>
                <div className="mt-3 flex items-center gap-3 text-white/74">
                  <CalendarDays size={18} className="text-[#af8855]" />
                  <span>Easy service-first booking</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8">
          {locations.map((location, index) => (
            <section
              key={location._id}
              className="overflow-hidden rounded-[38px] border border-white/10 bg-[rgba(20,21,22,0.9)] shadow-[0_24px_75px_rgba(0,0,0,0.2)]"
            >
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                <div className="relative min-h-[24rem] lg:min-h-[38rem]">
                  <div className="absolute left-6 top-6 z-10 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#f8f5f2] backdrop-blur-md">
                    {index === 0 ? 'Flagship Studio' : `Destination ${index + 1}`}
                  </div>
                  <div className="absolute inset-0">
                    <iframe
                      title={location.name}
                      src={buildEmbedMapUrl(location)}
                      className="h-full min-h-[24rem] w-full grayscale lg:min-h-[38rem]"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(16,17,18,0.82))] p-6 lg:p-8">
                    <div className="max-w-md rounded-[26px] border border-white/10 bg-[rgba(16,17,18,0.78)] p-5 backdrop-blur-xl">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#af8855]">
                        Easy Arrival
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white/70">
                        Preview the salon location here, then open full directions when you are ready to head over for your appointment.
                      </p>
                      <a
                        href={location.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#f8f5f2] hover:text-[#af8855]"
                      >
                        Open directions <ArrowUpRight size={14} className="text-[#af8855]" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between border-t border-white/8 p-8 lg:border-l lg:border-t-0 lg:p-12">
                  <div>
                    <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#af8855]">
                      Studio Details
                    </p>
                    <h2 className="max-w-md font-serif text-4xl uppercase leading-[0.94] text-[#f8f5f2] lg:text-5xl">
                      {location.name}
                    </h2>
                    <p className="mt-5 max-w-lg text-base leading-7 text-white/60 lg:text-lg">
                      Everything is arranged to make your salon visit feel smooth and well-planned, from easy directions to quick contact and instant booking.
                    </p>

                    <div className="mt-8 space-y-4">
                      <div className="rounded-[26px] border border-white/8 bg-white/5 p-5">
                        <div className="flex gap-3">
                          <MapPin size={18} className="mt-1 text-[#af8855]" />
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-white/38">
                              Address
                            </p>
                            <p className="mt-2 text-white/76">{location.address}, {location.city}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[26px] border border-white/8 bg-white/5 p-5">
                          <div className="flex gap-3">
                            <Phone size={18} className="mt-1 text-[#af8855]" />
                            <div>
                              <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-white/38">
                                Call The Desk
                              </p>
                              <a href={`tel:${location.phone}`} className="mt-2 block text-white/76 hover:text-white">
                                {location.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-[26px] border border-white/8 bg-white/5 p-5">
                          <div className="flex gap-3">
                            <Clock3 size={18} className="mt-1 text-[#af8855]" />
                            <div>
                              <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-white/38">
                                Best Time To Drop In
                              </p>
                              <p className="mt-2 text-white/76">Late morning or early evening is perfect for a calmer, more relaxed salon visit.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 border-t border-white/8 pt-6">
                    <div className="mb-6 grid gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-white/42 sm:grid-cols-3">
                      <span>Easy to locate</span>
                      <span>Quick call support</span>
                      <span>Booking ready</span>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                      <a
                        href={location.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="gold-button rounded-full"
                      >
                        Get Directions <ArrowUpRight size={14} />
                      </a>
                      <a
                        href={`tel:${location.phone}`}
                        className="outline-button rounded-full !border-white/12 !text-white"
                      >
                        Call Studio
                      </a>
                      <Link
                        to="/book"
                        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#e55d42] hover:text-[#f8f5f2]"
                      >
                        Book this location <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Locations;
