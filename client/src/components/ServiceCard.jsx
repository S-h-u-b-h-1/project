import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { resolveServiceImage } from '../data/serviceImages';

const ServiceCard = ({ service }) => {
  const image = resolveServiceImage(service);
  const displayPrice = service.displayPrice || service.display_price || service.price;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group overflow-hidden border border-[#af8855]/15 bg-[#212223]"
    >
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#212223] via-transparent to-black/10" />
        <img
          src={image}
          alt={service.name}
          className="h-full w-full object-cover transition-transform duration-[1800ms] group-hover:scale-110"
        />
        <div className="absolute right-4 top-4 z-20 border border-[#af8855]/30 bg-[#f8f5f2] px-3 py-1 text-xs font-bold text-[#212223]">
          ₹{displayPrice}
        </div>
      </div>
      <div className="space-y-4 p-7">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#af8855]">
          {service.category} • {service.duration} min
        </div>
        <h3 className="text-3xl uppercase tracking-[0.08em] text-[#f8f5f2]">{service.name}</h3>
        <p className="min-h-12 text-white/58">
          {service.description || 'Luxury consultation, premium finish and a polished salon-floor result.'}
        </p>
        <Link
          to={`/book/${service.slug || service._id}`}
          className="inline-flex text-[11px] font-bold uppercase tracking-[0.26em] text-[#f8f5f2] hover:text-[#e55d42]"
        >
          Reserve this service
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
