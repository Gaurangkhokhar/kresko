import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../utils/storage';

// ─────────────────────────────────────────────
// INDUSTRIES GRID — 12 cards (3 × 4 desktop)
// ─────────────────────────────────────────────
const INDUSTRY_GRID = [
  { icon: 'fa-house', title: 'Home Care', img: '/images/home_care_bg.png', desc: 'Floor, toilet, glass, dish wash and phenyl concentrates for brands and institutions.' },
  { icon: 'fa-pump-soap', title: 'Personal Care', img: '/images/personal_care_bg.png', desc: 'Hand wash, shampoo, shower gel and sanitizer bases with premium fragrance loads.' },
  { icon: 'fa-fill-drip', title: 'Paint & Coatings', img: '/images/specialty_products_bg.png', desc: 'Specialty chemicals, performance additives and industrial formulations.' },
  { icon: 'fa-car', title: 'Automotive', img: '/images/car_care_bg.png', desc: 'Car shampoos, polishes and wax formulations for showrooms and fleet care.' },
  { icon: 'fa-wheat-awn', title: 'Agriculture', img: '/images/ind_industrial.png', desc: 'Specialty chemical solutions and customized agro formulations.' },
  { icon: 'fa-kiwi-bird', title: 'Poultry & Veterinary', img: '/images/pest_control_bg.png', desc: 'Disinfection, hygiene chemicals and cleaning solutions for farms and hatcheries.' },
  { icon: 'fa-oil-well', title: 'Oil & Drilling', img: '/images/ind_industrial.png', desc: 'Industrial chemicals, cleaning solutions and specialty drilling formulations.' },
  { icon: 'fa-pills', title: 'Food • Nutraceutical • Pharma', img: '/images/kitchen_care_bg.png', desc: 'GMP-grade processing solutions and specialty chemicals for regulated industries.' },
  { icon: 'fa-droplet', title: 'Water Treatment', img: '/images/clo2_solutions_bg.png', desc: 'Chlorine Dioxide, water treatment chemicals and industrial water solutions.' },
  { icon: 'fa-hotel', title: 'Hospitality', img: '/images/hotel_amenities_bg.png', desc: 'Housekeeping, laundry and guest amenity concentrates for hotels and resorts.' },
  { icon: 'fa-industry', title: 'Industrial Cleaning', img: '/images/ind_industrial.png', desc: 'Heavy-duty degreasers, machinery cleaners and descaling chemistry.' },
  { icon: 'fa-box-open', title: 'OEM Manufacturing', img: '/images/oem_manufacturing_bg.png', desc: 'Custom formulation, private labeling and bulk supply for your brand.' },
];

// ─────────────────────────────────────────────
// DETAILED SECTIONS — alternating image/text
// ─────────────────────────────────────────────
const DETAILED_SECTIONS = [
  {
    tag: 'HOME CARE',
    title: 'Home Care & Institutional Cleaning',
    icon: 'fa-house',
    img: '/images/home_care_bg.png',
    desc: 'KRESKO Chemicals manufactures premium cleaning chemical concentrates for residential, commercial, institutional, and industrial applications. Our solutions are trusted by cleaning brands, OEM manufacturers, distributors, and facility management companies.',
    points: ['Floor Cleaners', 'Toilet Cleaners', 'Glass Cleaners', 'Multipurpose Cleaners', 'Dish Wash', 'Phenyl']
  },
  {
    tag: 'PERSONAL CARE',
    title: 'Personal Care',
    icon: 'fa-pump-soap',
    img: '/images/personal_care_bg.png',
    desc: 'Premium personal-care concentrate bases engineered with high fragrance loads, rich lather and skin-friendly pH — ready for dilution, private labeling and retail packaging under your brand.',
    points: ['Hand Wash', 'Shampoo', 'Shower Gel', 'Sanitizer']
  },
  {
    tag: 'AUTOMOTIVE',
    title: 'Automotive Care',
    icon: 'fa-car',
    img: '/images/car_care_bg.png',
    desc: 'High-foaming, pH-balanced vehicle-care concentrates formulated for showrooms, car wash centers, service stations and fleet operators who demand gloss, protection and economy.',
    points: ['Car Shampoo', 'Car Polish', 'Wax Polish']
  },
  {
    tag: 'PAINT & COATINGS',
    title: 'Paint & Coatings',
    icon: 'fa-fill-drip',
    img: '/images/specialty_products_bg.png',
    desc: 'Specialty chemistry for paint, coating and construction-material manufacturers — engineered for dispersion stability, film performance and process consistency at scale.',
    points: ['Specialty Chemicals', 'Performance Additives', 'Industrial Formulations']
  },
  {
    tag: 'AGRICULTURE',
    title: 'Agriculture',
    icon: 'fa-wheat-awn',
    img: '/images/ind_industrial.png',
    desc: 'Customized agricultural chemistry developed in partnership with agri-input brands — built around crop requirements, application methods and regulatory compliance.',
    points: ['Specialty Chemical Solutions', 'Customized Formulations']
  },
  {
    tag: 'POULTRY & VETERINARY',
    title: 'Poultry & Veterinary',
    icon: 'fa-kiwi-bird',
    img: '/images/pest_control_bg.png',
    desc: 'Broad-spectrum biosecurity programs for poultry farms, hatcheries, veterinary facilities and animal husbandry operations — effective against bacteria, viruses and fungi.',
    points: ['Disinfection', 'Hygiene Chemicals', 'Cleaning Solutions']
  },
  {
    tag: 'OIL & DRILLING',
    title: 'Oil & Drilling',
    icon: 'fa-oil-well',
    img: '/images/ind_industrial.png',
    desc: 'Rugged performance chemistry for demanding oilfield environments — degreasers, cleaners and specialty formulations engineered for reliability in extreme conditions.',
    points: ['Industrial Chemicals', 'Cleaning Solutions', 'Specialty Formulations']
  },
  {
    tag: 'FOOD • NUTRACEUTICAL • PHARMA',
    title: 'Food, Nutraceutical & Pharmaceutical',
    icon: 'fa-pills',
    img: '/images/kitchen_care_bg.png',
    desc: 'GMP-compliant specialty chemicals and processing aids manufactured under strict quality systems for food, nutraceutical and pharmaceutical production environments.',
    points: ['Specialty Chemicals', 'Processing Solutions']
  },
  {
    tag: 'WATER TREATMENT',
    title: 'Water Treatment',
    icon: 'fa-droplet',
    img: '/images/clo2_solutions_bg.png',
    desc: 'EN 12671-certified Chlorine Dioxide and complete water-treatment chemistry for drinking water, industrial water systems, sanitation and effluent applications.',
    points: ['Chlorine Dioxide', 'Water Treatment Chemicals', 'Industrial Water Solutions']
  },
];

const WHY_KRESKO = [
  { icon: 'fa-industry', title: 'Advanced Manufacturing', desc: 'Consistent, batch-verified concentrates engineered for scale.' },
  { icon: 'fa-flask-vial', title: 'Customized Formulations', desc: 'Product development tailored to your brand and application.' },
  { icon: 'fa-boxes-stacked', title: 'Bulk Supply', desc: 'Economical bulk packaging and reliable commercial supply.' },
  { icon: 'fa-globe', title: 'Export Ready', desc: 'Formulations and documentation built for domestic and export markets.' }
];

const CAPABILITIES = [
  { icon: 'fa-magnifying-glass', title: 'Research', desc: 'Market-driven chemistry research and raw-material sourcing.' },
  { icon: 'fa-flask', title: 'Development', desc: 'Lab-scale formulation development and sample iteration.' },
  { icon: 'fa-industry', title: 'Manufacturing', desc: 'Batch production under ISO 9001:2015 & WHO-GMP systems.' },
  { icon: 'fa-vial-circle-check', title: 'Testing', desc: 'In-house QC — viscosity, pH, density and stability checks.' },
  { icon: 'fa-box', title: 'Packaging', desc: 'Bulk, intermediate and retail-ready packing options.' },
  { icon: 'fa-truck-fast', title: 'Dispatch', desc: 'On-time domestic logistics and export documentation.' }
];

const STATS = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '+', label: 'Products' },
  { value: 500, suffix: '+', label: 'Customers' },
  { value: 25, suffix: '+', label: 'Industries Served' },
  { value: 100, suffix: '%', label: 'Quality Commitment' }
];

function StatItem({ stat }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let raf; const t0 = performance.now(); const dur = 1600;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        setVal(Math.round(stat.value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [stat.value]);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '1rem 0.5rem' }}>
      <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#38bdf8', lineHeight: 1 }}>{val}{stat.suffix}</div>
      <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '0.5rem' }}>{stat.label}</div>
    </div>
  );
}

const RELATED_IDS = ['floor-cleaner-20x', 'toilet-cleaner', 'hand-wash', 'dish-wash', 'metal-polish', 'chlorine-dioxide'];

export default function Industries() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const all = getProducts() || [];
      const picked = RELATED_IDS.map(id => all.find(p => p.id === id)).filter(Boolean);
      setProducts(picked.length ? picked : all.slice(0, 6));
    } catch {
      setProducts([]);
    }
  }, []);

  return (
    <div>
      <style>{`
        .ind-grid-card { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; border: 2px solid transparent; cursor: pointer; }
        .ind-grid-card:hover { transform: translateY(-8px); border-color: var(--color-primary); box-shadow: 0 16px 40px rgba(2,132,199,0.18); }
        .ind-grid-card:hover .ind-grid-icon i { transform: scale(1.2) rotate(-6deg); }
        .ind-grid-card:hover .ind-grid-more { opacity: 1; transform: translateX(0); }
        .ind-grid-icon i { transition: transform 0.3s ease; display: inline-block; }
        .ind-grid-more { opacity: 0; transform: translateX(-6px); transition: all 0.3s ease; }
      `}</style>

      {/* 1. HERO BANNER */}
      <section className="solution-banner" style={{
        backgroundImage: "linear-gradient(rgba(15,23,42,0.82), rgba(15,23,42,0.82)), url('/images/ind_industrial.png')",
        padding: '6rem 0'
      }}>
        <div className="container solution-content" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <span className="hero-tag" style={{ backgroundColor: 'var(--color-accent)', marginBottom: '1rem', display: 'inline-block' }}>
            INDUSTRIES WE SERVE
          </span>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1rem' }}>
            Industries We Serve
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
            Delivering high-performance chemical solutions across diverse industries with advanced formulations,
            OEM manufacturing, private labeling, and customized product development.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem', fontSize: '1.4rem', color: '#38bdf8' }}>
            {['fa-house', 'fa-pump-soap', 'fa-car', 'fa-industry', 'fa-droplet'].map((ic, i) => (
              <i key={i} className={`fa-solid ${ic}`} style={{ animation: `floatIcon 3s ease-in-out ${i * 0.25}s infinite` }}></i>
            ))}
          </div>
          <style>{`@keyframes floatIcon { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link to="/products" className="btn btn-primary" style={{ borderRadius: '30px', padding: '0.85rem 2rem' }}>Explore Products</Link>
            <Link to="/contact" className="btn btn-white" style={{ borderRadius: '30px', padding: '0.85rem 2rem', fontWeight: 800 }}>Request a Quote</Link>
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-accent)', padding: '0.35rem 0.85rem', borderRadius: '30px', fontWeight: 800, display: 'inline-block', marginBottom: '0.75rem' }}>
              TRUSTED BY BUSINESSES ACROSS MULTIPLE INDUSTRIES
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 900, color: 'var(--color-primary)' }}>
              Chemical Solutions Engineered for Every Sector
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', lineHeight: 1.75 }}>
              KRESKO Chemicals partners with manufacturers, distributors, private label brands, and industrial businesses by
              providing innovative chemical formulations, premium-quality concentrates, and customized manufacturing solutions.
              Our products are trusted across multiple industries for consistent quality, performance, and reliability.
            </p>
          </div>

          {/* 3. INDUSTRIES GRID (12 cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {INDUSTRY_GRID.map((ind) => (
              <div key={ind.title} className="industries-card ind-grid-card" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
                <img src={ind.img} alt={ind.title} loading="lazy" />
                <div className="industries-card-content" style={{ zIndex: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.6rem' }}>
                    <div className="ind-grid-icon" style={{ width: 36, height: 36, borderRadius: 6, backgroundColor: 'rgba(56,189,248,0.22)', color: '#7dd3fc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>
                      <i className={`fa-solid ${ind.icon}`}></i>
                    </div>
                    <h4 style={{ color: '#fff', fontSize: '1.02rem', margin: 0, fontWeight: 700 }}>{ind.title}</h4>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', lineHeight: 1.55, margin: 0, flexGrow: 1 }}>{ind.desc}</p>
                  <Link to="/products" className="ind-grid-more" style={{ color: '#7dd3fc', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    Learn More <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.7rem' }}></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DETAILED INDUSTRY SECTIONS */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 3.5rem auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 900, color: 'var(--color-primary)' }}>
              Industry-Specific Solutions
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem' }}>
              How KRESKO concentrates and specialty chemistry are applied across key sectors.
            </p>
          </div>

          {DETAILED_SECTIONS.map((sec, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <div key={sec.title} className="company-feature-row" style={{ marginBottom: '4rem' }}>
                {imageLeft && (
                  <div className="company-feature-img-card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={sec.img} alt={sec.title} loading="lazy" />
                  </div>
                )}
                <div>
                  <span className="hero-tag" style={{ marginBottom: '0.5rem', fontSize: '0.75rem', display: 'inline-block' }}>{sec.tag}</span>
                  <h3 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', margin: '0.5rem 0 1rem 0', fontWeight: 900, color: 'var(--color-primary)' }}>
                    <i className={`fa-solid ${sec.icon}`} style={{ color: 'var(--color-accent)', marginRight: '0.6rem' }}></i>
                    {sec.title}
                  </h3>
                  <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.92rem' }}>{sec.desc}</p>
                  <strong style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Applications</strong>
                  <ul className="company-feature-list">
                    {sec.points.map(pt => (
                      <li key={pt}><span className="check-icon"><i className="fa-solid fa-check"></i></span>{pt}</li>
                    ))}
                  </ul>
                  <Link to="/products" className="btn btn-primary" style={{ borderRadius: '8px', padding: '0.75rem 1.5rem', fontSize: '0.85rem', fontWeight: 800, marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    Explore Products <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
                {!imageLeft && (
                  <div className="company-feature-img-card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={sec.img} alt={sec.title} loading="lazy" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>


      {/* 5. WHY INDUSTRIES CHOOSE KRESKO */}
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#fff' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 3rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', display: 'block', marginBottom: '0.35rem' }}>
              WHY INDUSTRIES CHOOSE KRESKO
            </span>
            <h2 style={{ color: '#fff' }}>Built for B2B Demands</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {WHY_KRESKO.map((f) => (
              <div key={f.title} style={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(56,189,248,0.12)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto 1.25rem auto' }}>
                  <i className={`fa-solid ${f.icon}`}></i>
                </div>
                <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.5rem' }}>{f.title}</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR CAPABILITIES — TIMELINE */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 3rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-accent)', display: 'block', marginBottom: '0.35rem' }}>
              OUR CAPABILITIES
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 900, color: 'var(--color-primary)' }}>
              From Research to Dispatch
            </h2>
          </div>
          <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 27, top: 12, bottom: 12, width: 3, background: 'linear-gradient(to bottom, #38bdf8, var(--color-accent))', borderRadius: 3 }}></div>
            {CAPABILITIES.map((c, i) => (
              <div key={c.title} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: i === CAPABILITIES.length - 1 ? 0 : '2rem', position: 'relative' }}>
                <div style={{
                  width: 56, height: 56, flexShrink: 0, borderRadius: '50%', zIndex: 2,
                  backgroundColor: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.15rem', boxShadow: '0 0 0 6px #ffffff, 0 6px 18px rgba(2,132,199,0.25)'
                }}>
                  <i className={`fa-solid ${c.icon}`}></i>
                </div>
                <div style={{ paddingTop: '0.35rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-primary)' }}>{c.title}</h4>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.87rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 7. INDUSTRIES STATISTICS — COUNTERS */}
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {STATS.map(s => <StatItem key={s.label} stat={s} />)}
          </div>
        </div>
      </section>


      {/* 8. RELATED PRODUCTS — CAROUSEL */}
      {products.length > 0 && (
        <section className="section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 2.75rem auto' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 900, color: 'var(--color-primary)' }}>
                Related Products
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem' }}>
                High-demand formulations trusted across the industries we serve.
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'flex', gap: '1.5rem', overflowX: 'auto', scrollSnapType: 'x mandatory',
              padding: '0 max(1.5rem, calc((100vw - 1200px) / 2)) 1.5rem', scrollbarWidth: 'thin'
            }}
          >
            {products.map(p => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="industries-card"
                style={{ minWidth: '260px', width: '260px', height: '340px', flexShrink: 0, scrollSnapAlign: 'start' }}
              >
                <img src={p.image} alt={p.title} loading="lazy" />
                <div className="industries-card-content" style={{ zIndex: 3, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ color: '#fff', fontSize: '1.05rem', margin: 0, fontWeight: 700 }}>{p.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.78rem', marginTop: '0.4rem', textTransform: 'capitalize', flexGrow: 1 }}>
                    {(p.category || '').replace(/-/g, ' ')}
                  </p>
                  <span style={{ color: '#7dd3fc', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    View Product <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.65rem' }}></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 9. CTA */}
      <section className="section" style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '760px' }}>
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', fontWeight: 900, marginBottom: '1rem' }}>
            Looking for Customized Chemical Solutions?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Partner with KRESKO Chemicals for premium-quality formulations, OEM manufacturing, private labeling,
            and reliable bulk supply tailored to your industry.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-white" style={{ borderRadius: '30px', padding: '0.85rem 2rem', fontWeight: 800 }}>Get a Quote</Link>
            <Link to="/contact" className="btn" style={{ borderRadius: '30px', padding: '0.85rem 2rem', fontWeight: 800, border: '2px solid #fff', color: '#fff' }}>Contact Our Experts</Link>
          </div>
        </div>
      </section>
    </div>
  );
}


