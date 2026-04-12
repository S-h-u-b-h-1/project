import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialSlider = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {testimonials.map((test, index) => (
        <motion.div
          key={test._id || index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          className="luxury-panel relative rounded-[28px] p-8"
        >
          <div className="absolute right-5 top-3 font-serif text-6xl text-[#af8855]/18">&quot;</div>
          <div className="mb-5 flex items-center space-x-1">
            {[...Array(test.rating || 5)].map((_, i) => (
              <Star key={i} size={16} className="fill-[#af8855] text-[#af8855]" />
            ))}
          </div>
          <p className="relative z-10 mb-8 min-h-32 text-lg italic leading-relaxed text-white/76">
            &quot;{test.review}&quot;
          </p>
          <div className="flex items-center space-x-4">
            {test.avatarUrl ? (
              <img
                src={test.avatarUrl}
                alt={test.customerName || 'Salon Guest'}
                className="h-12 w-12 rounded-full border border-[#af8855]/25 object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#af8855]/25 bg-[#af8855]/10 font-serif text-lg text-[#af8855]">
                {test.customerName?.[0] || 'G'}
              </div>
            )}
            <div>
              <h4 className="font-semibold text-white">{test.customerName}</h4>
              <p className="text-sm uppercase tracking-[0.22em] text-white/35">Verified Client</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TestimonialSlider;
