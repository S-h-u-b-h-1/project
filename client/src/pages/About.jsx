const stats = [
  { value: '500+', label: 'Happy Clients' },
  { value: '10+', label: 'Team Members' },
  { value: '15', label: 'Years' },
];

const principles = [
  {
    symbol: '✦',
    title: 'Precision',
    description: 'Every cut, color, and treatment is executed with meticulous attention to detail.',
  },
  {
    symbol: '◆',
    title: 'Premium Products',
    description: 'We exclusively use international brands to ensure the best results for your hair and skin.',
  },
  {
    symbol: '★',
    title: 'Expert Team',
    description: 'Our stylists are academy-trained professionals with years of premium salon experience.',
  },
  {
    symbol: '◇',
    title: 'Hygiene First',
    description: 'ISO-compliant sanitization protocols. Every tool is sterilized. Every surface is spotless.',
  },
];

const experts = [
  ['MK', 'Meera Kapoor', 'Creative Director', 'Bridal & Color', '12 years'],
  ['RM', 'Raj Malhotra', 'Senior Stylist', 'Hair Architecture', '10 years'],
  ['AS', 'Anita Singh', 'Skin Expert', 'Advanced Facials', '8 years'],
  ['VP', 'Vikram Patel', 'Style Director', "Men's Grooming", '9 years'],
  ['PN', 'Priya Nair', 'Nail Artist', 'Nail Art & Extensions', '6 years'],
  ['SM', 'Dr. Sneha Mehta', 'Trichologist', 'Scalp & Hair Health', '15 years'],
];

const sectionEyebrowClass =
  'text-[11px] font-extrabold uppercase tracking-[0.42em] text-[#af8855]';

const About = () => {
  return (
    <div className="bg-background text-[#f8f5f2]">
      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,156,74,0.22),transparent_32%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(229,93,66,0.12),transparent_25%)]" />
        <div className="section-shell relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className={sectionEyebrowClass}>Our Story</p>
            <h1 className="mt-5 font-serif text-5xl uppercase leading-[0.92] text-[#f8f5f2] md:text-7xl">
              Where Beauty
              <br />
              Meets <span className="italic text-[#af8855]">Artistry</span>
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/68">
              Since 2010, Maxx Salon has been redefining the salon experience in India. What started as a single outlet in Delhi has grown into the country&apos;s most trusted premium salon chain.
            </p>
          </div>
        </div>
      </section>

      <section className="paper-section py-24 text-[#1b161c]">
        <div className="section-shell">
          <div className="mx-auto max-w-5xl text-center">
            <p className={sectionEyebrowClass}>Our Mission</p>
            <h2 className="mt-5 font-serif text-4xl uppercase leading-tight md:text-6xl">
              To make world-class beauty services accessible to every Indian.
            </h2>
            <div className="mx-auto mt-8 max-w-4xl space-y-5 text-lg leading-relaxed text-[#5f584d]">
              <p>
                We believe that everyone deserves to feel confident, beautiful, and pampered — not just on special occasions, but as part of their everyday self-care routine.
              </p>
              <p>
                At Maxx Salon, we combine international techniques with deep understanding of Indian beauty, creating experiences that are aspirational yet approachable, luxurious yet familiar.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[28px] border border-black/10 bg-white/60 px-6 py-8 text-center shadow-[0_20px_40px_rgba(33,34,35,0.06)]"
              >
                <p className="font-serif text-5xl text-[#1b161c]">{stat.value}</p>
                <p className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.26em] text-[#af8855]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-section pb-24 text-[#1b161c]">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className={sectionEyebrowClass}>What Drives Us</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((item) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-black/10 bg-white/65 p-8 text-center shadow-[0_18px_36px_rgba(33,34,35,0.06)]"
              >
                <p className="text-3xl text-[#af8855]">{item.symbol}</p>
                <h3 className="mt-5 font-serif text-3xl uppercase text-[#1b161c]">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#5f584d]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-section pb-24 text-[#1b161c]">
        <div className="section-shell">
          <div className="mx-auto max-w-4xl text-center">
            <p className={sectionEyebrowClass}>Meet Our Experts</p>
            <h2 className="mt-5 font-serif text-4xl uppercase md:text-5xl">
              The talented people behind your Maxx experience
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {experts.map(([initials, name, role, specialty, experience]) => (
              <article
                key={name}
                className="rounded-[28px] border border-black/10 bg-white/65 p-6 text-center shadow-[0_18px_36px_rgba(33,34,35,0.06)]"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#af8855]/25 bg-[#212223] font-serif text-2xl text-[#af8855]">
                  {initials}
                </div>
                <h3 className="mt-5 text-base font-semibold text-[#1b161c]">{name}</h3>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#af8855]">
                  {role}
                </p>
                <p className="mt-4 text-sm text-[#5f584d]">{specialty}</p>
                <p className="mt-1 text-sm text-[#5f584d]">{experience}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
