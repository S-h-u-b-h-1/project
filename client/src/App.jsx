import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const BookAppointment = lazy(() => import('./pages/BookAppointment'));
const BookingConfirmation = lazy(() => import('./pages/BookingConfirmation'));
const Locations = lazy(() => import('./pages/Locations'));
const About = lazy(() => import('./pages/About'));

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  return null;
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={
          <div className="flex min-h-[60vh] items-center justify-center bg-background">
            <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-[#af8855]"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:genderSlug" element={<Services />} />
            <Route path="/services/:genderSlug/:categorySlug" element={<Services />} />
            <Route path="/book" element={<BookAppointment />} />
            <Route path="/book/:serviceSlug" element={<BookAppointment />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
