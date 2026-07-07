import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { getBusinessInfo } from '../services/api';

import maxxLogoMark from '../assets/maxx-logo-mark.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Locations', path: '/locations' },
  { name: 'About', path: '/about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [business, setBusiness] = useState(null);
  const location = useLocation();
  const isBookingPage = location.pathname === '/book' || location.pathname.startsWith('/book/');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);

    getBusinessInfo().then((res) => setBusiness(res.data)).catch(() => {});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  const isActivePath = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  const shellClass = scrolled
    ? 'border-white/10 bg-[rgba(17,18,19,0.85)] shadow-[0_22px_55px_rgba(0,0,0,0.28)] backdrop-blur-md'
    : 'border-white/12 bg-[rgba(21,22,23,0.75)] shadow-[0_22px_55px_rgba(0,0,0,0.22)] backdrop-blur-md';

  const brandTextClass = 'text-[#f8f5f2]';
  const navShellClass = 'border-white/10 bg-black/10';
  const inactiveNavClass = 'text-white/74 hover:bg-[#af8855]/10 hover:text-white transition-all duration-300';
  const mobileButtonClass = 'border-white/10 bg-white/5 text-white';
  const mobilePanelClass = 'border-white/10 bg-[rgba(18,19,20,0.96)] shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl';
  const mobileTextClass = 'text-[#f8f5f2]';
  const mobileActiveClass = 'bg-[linear-gradient(90deg,rgba(175,136,85,0.22),rgba(214,156,74,0.16))] text-[#f8f5f2]';
  const mobileInactiveClass = 'text-[#f8f5f2] hover:bg-white/5';

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${scrolled || isBookingPage ? 'py-3' : 'py-5'}`}>
      <div className="section-shell">
        <div className={`rounded-[24px] border px-4 sm:px-6 lg:px-8 ${shellClass}`}>
          <div className={`flex items-center justify-between gap-4 ${isBookingPage ? 'h-14 lg:h-16' : 'h-16 lg:h-20'}`}>
            <Link to="/" className="group flex min-w-0 items-center gap-3">
              <div className={`overflow-hidden rounded-full border border-[#af8855]/35 bg-white/5 transition-transform duration-500 group-hover:scale-105 ${isBookingPage ? 'h-10 w-10 lg:h-11 lg:w-11' : 'h-11 w-11 lg:h-12 lg:w-12'}`}>
                    <img
                      src={business?.logo || maxxLogoMark}
                      alt={business?.name || 'THE MAXX SALON'}
                      className="h-full w-full object-cover"
                    />
              </div>
              <div className="min-w-0">
                <p className={`truncate font-serif uppercase tracking-[0.16em] ${brandTextClass} transition-colors duration-300 group-hover:text-[#af8855] ${isBookingPage ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'}`}>
                  {business?.name || 'THE MAXX SALON'}
                </p>
                {isBookingPage && (
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#af8855]">
                    Booking Desk
                  </p>
                )}
              </div>
            </Link>

            <div className={`hidden items-center rounded-full border p-1 lg:flex ${navShellClass} ${isBookingPage ? 'gap-1' : 'gap-2'}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`rounded-full px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.24em] transition-all ${
                    isActivePath(link.path)
                      ? 'bg-[linear-gradient(90deg,#af8855,#d69c4a,#af8855)] text-[#1b150d] shadow-[0_10px_25px_rgba(175,136,85,0.26)]'
                      : inactiveNavClass
                  } ${isBookingPage ? 'px-3 py-2.5 tracking-[0.2em]' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex">
              <Link to="/book" className={`gold-button rounded-full ${isBookingPage ? 'px-6 py-2.5' : ''}`}>
                {isBookingPage ? 'Continue Booking' : 'Book Now'}
              </Link>
            </div>

            <button
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${mobileButtonClass}`}
              onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="section-shell mt-3 lg:hidden"
          >
            <div className={`overflow-hidden rounded-[24px] border ${mobilePanelClass}`}>
              <div className="flex flex-col gap-2 p-4">
                {isBookingPage && (
                  <div className="rounded-2xl border border-[#af8855]/20 bg-[#af8855]/8 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#af8855]">
                    Booking navigation
                  </div>
                )}
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-serif uppercase tracking-[0.12em] ${
                      isActivePath(link.path) ? mobileActiveClass : mobileInactiveClass
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
              <div className={`px-4 pb-4 ${mobileTextClass}`}>
                <Link to="/book" className="gold-button w-full rounded-full">
                  {isBookingPage ? 'Continue Booking' : 'Book Now'}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
