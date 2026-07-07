import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import { getBusinessInfo, getLocations } from '../services/api';

import maxxLogoMark from '../assets/maxx-logo-mark.svg';

const Footer = () => {
  const [business, setBusiness] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getBusinessInfo().then((res) => setBusiness(res.data)).catch(() => {});
    getLocations().then((res) => setLocations(res.data)).catch(() => {});
  }, []);

  const flagship = locations[0];

  return (
    <footer className="relative overflow-hidden border-t border-[#af8855]/15 bg-[#191a1b] text-[#f8f5f2]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,156,74,0.16),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(229,93,66,0.08),transparent_28%)]" />
      <div className="section-shell relative z-10 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-5 flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full border border-[#af8855]/30 bg-white/5">
                <img
                  src={business?.logo || maxxLogoMark}
                  alt={business?.name || 'THE MAXX SALON'}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="font-serif text-3xl uppercase tracking-[0.18em]">
                {business?.name || 'THE MAXX SALON'}
              </p>
            </div>
            <p className="max-w-md text-lg italic text-[#af8855]/85">
              Crafted to feel editorial, polished and a little indulgent, just like the Maxx-style
              reference experience.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="https://www.instagram.com/themaxxsalon.sonipat/" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white/60 hover:border-[#af8855]/40 hover:text-[#af8855]">
                IG
              </a>
              <a href="https://facebook.com/maxxsalon" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white/60 hover:border-[#af8855]/40 hover:text-[#af8855]">
                FB
              </a>
              <a href="https://youtube.com/@maxxsalon" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white/60 hover:border-[#af8855]/40 hover:text-[#af8855]">
                YT
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-6 text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#af8855]">
              Explore
            </p>
            <div className="flex flex-col gap-4 text-white/70">
              <Link to="/services">Services</Link>
              <Link to="/locations">Locations</Link>
              <Link to="/about">About</Link>
              <Link to="/book">Book</Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="mb-6 text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#af8855]">
              Get In Touch
            </p>
            <div className="grid gap-4 text-white/70 md:grid-cols-2">
              <div className="luxury-panel rounded-[28px] p-6">
                <div className="mb-3 flex items-center gap-3">
                  <Phone size={18} className="text-[#af8855]" />
                  <span>{business?.phone || '+91 7988023157'}</span>
                </div>
                <div className="mb-3 flex items-center gap-3">
                  <Mail size={18} className="text-[#af8855]" />
                  <span>{business?.email || 'hello@maxxsalon.in'}</span>
                </div>
                <a
                  href={business?.whatsapp || 'https://wa.me/917988023157'}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-400"
                >
                  <MessageCircle size={16} />
                  WhatsApp concierge
                </a>
              </div>
              <div className="luxury-panel rounded-[28px] p-6">
                <div className="mb-3 flex items-start gap-3">
                  <MapPin size={18} className="mt-1 text-[#af8855]" />
                  <span>{flagship?.fullAddress || business?.address || 'Parsavnath City, Sector 8, Sonipat, Haryana 131001'}</span>
                </div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/35">
                  {business?.hours || 'Mon-Sat: 10AM-9PM'}
                </p>
                <a
                  href={flagship?.mapUrl || 'https://maps.app.goo.gl/wyipAAG3RJmFGm1x5'}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-[11px] font-bold uppercase tracking-[0.24em] text-[#af8855]"
                >
                  Retrieve directions
                </a>
              </div>
            </div>
          </div>
        </div>

<div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.24em] text-white/35 md:flex-row md:items-center md:justify-between">
  <p>&copy; {new Date().getFullYear()} THE MAXX SALON. All rights reserved.</p>

  <p className="text-[11px] uppercase tracking-[0.24em] text-white/35">
  Crafted with premium cadence by{" "}
  <a
    href="https://github.com/S-h-u-b-h-1"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gradient-to-r from-[#d4af37] to-[#f5e6b3] bg-clip-text text-transparent hover:opacity-80 transition duration-300"
  >
    Shubhaang Kataruka
  </a>
</p>
</div>
      </div>
    </footer>
  );
};

export default Footer;
