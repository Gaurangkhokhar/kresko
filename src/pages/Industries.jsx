import React from 'react';
import { Link } from 'react-router-dom';

// Real Kresko industries/applications (from official content source).
const INDUSTRY_GRID = [
  { icon: 'fa-hotel', title: 'Hotels & Hospitality', img: '/images/ind_hospitality.png', desc: 'Housekeeping, bathroom and laundry concentrates for hotels, resorts, restaurants, banquet halls and clubs.' },
  { icon: 'fa-hospital-user', title: 'Hospitals & Healthcare', img: '/images/ind_healthcare.png', desc: 'Sanitizers, floor sanitizers and GMP-grade hand hygiene formulations for hospitals, clinics and labs.' },
  { icon: 'fa-industry', title: 'Industrial Manufacturing', img: '/images/ind_industrial.png', desc: 'Heavy-duty degreasers, machinery cleaners and descaling solutions for plants, warehouses and engineering units.' },
  { icon: 'fa-soap', title: 'Commercial Laundry', img: '/images/ind_laundry.png', desc: 'Concentrated detergent liquids (4X, 6X), fabric softeners and oxygen whiteners for commercial laundries and textiles.' },
  { icon: 'fa-building-shield', title: 'Facility Management', img: '/images/ind_facilities.png', desc: 'Multipurpose cleaners, glass shiners and restroom blocks for facility and property management companies.' },
  { icon: 'fa-utensils', title: 'Food Processing', img: '/images/kitchen_care_bg.png', desc: 'Kitchen degreasers, dishwash gels and sanitation products for bakeries, dairies and food plants.' },
  { icon: 'fa-graduation-cap', title: 'Educational Institutions', img: '/images/floor_care_bg.png', desc: 'Safe, economical cleaning and hygiene concentrates for schools, colleges, universities and hostels.' },
  { icon: 'fa-building', title: 'Corporate Offices & IT Parks', img: '/images/glass_care_bg.png', desc: 'Streak-free glass, floor and washroom care for offices, business centers and commercial complexes.' },
  { icon: 'fa-cart-shopping', title: 'Shopping Malls & Retail', img: '/images/bathroom_care_bg.png', desc: 'High-traffic floor, glass and restroom formulations for malls, supermarkets and retail chains.' },
  { icon: 'fa-house-chimney', title: 'Residential Communities', img: '/images/home_care_bg.png', desc: 'Apartment and township cleaning solutions for builders, societies and property developers.' },
  { icon: 'fa-car', title: 'Automotive & Car Care', img: '/images/car_care_bg.png', desc: 'Car shampoo, polish and wax concentrates for showrooms, wash centers and fleet operators.' },
  { icon: 'fa-hand-holding-box', title: 'OEM & Private Label', img: '/images/oem_manufacturing_bg.png', desc: 'Custom formulation and bulk supply for cleaning-chemical brands, FMCG and distributors.' },
];

const DETAILED_SECTIONS = [
  {
    tag: 'HOSPITALITY & COMMERCIAL',
    title: 'Hotels, Restaurants & High-Traffic Commercial Spaces',
    icon: 'fa-hotel',
    img: '/images/ind_hospitality.png',
    desc: 'KRESKO formulates premium personal-hygiene, bathroom and laundry concentrates that raise guest-satisfaction and cut operating costs for hotels, resorts, restaurants, banquet halls, clubs and food courts.',
    points: ['Bathroom & housekeeping cleaning concentrates', 'Hand wash, shampoo, shower gel & fabric softeners', 'Dishwash and kitchen sanitation for F&B']
  },
  {
    tag: 'HEALTHCARE',
    title: 'Hospitals, Clinics & Diagnostic Laboratories',
    icon: 'fa-hospital-user',
    img: '/images/ind_healthcare.png',
    desc: 'Infection-control begins with reliable surfaces. KRESKO provides sterilizing sanitizers, floor sanitizers and GMP-grade hand hygiene soaps that support clean clinical environments.',
    points: ['Floor & surface sanitizers for hospitals and clinics', 'GMP-grade hand wash and hand sanitizer concentrates', 'Hygiene solutions for nursing homes and medical colleges']
  },
  {
    tag: 'INDUSTRIAL & ENGINEERING',
    title: 'Manufacturing Plants, Warehouses & Engineering Units',
    icon: 'fa-industry',
    img: '/images/ind_industrial.png',
    desc: 'Heavy-duty industrial chemistry for machinery, boilers and large-scale facilities — engineered for performance and process safety in demanding production environments.',
    points: ['Heavy-duty degreasers & machinery cleaners', 'Bulk descaling solutions for boilers & heat exchangers', 'Floor care for factories, warehouses & automotive plants']
  },
  {
    tag: 'LAUNDRY & TEXTILE',
    title: 'Commercial Laundry, Textile & Linen Services',
    icon: 'fa-soap',
    img: '/images/ind_laundry.png',
    desc: 'High-load laundry concentrates keep commercial laundries, textile units and linen-rental companies running efficiently with consistent, cost-effective results.',
    points: ['Concentrated detergent liquids (4X / 6X)', 'Fabric comfort softeners & active-oxygen whiteners', 'Solutions for dry-cleaning and linen rental services']
  },
  {
    tag: 'FACILITY SERVICES',
    title: 'Facility Management & Housekeeping Providers',
    icon: 'fa-building-shield',
    img: '/images/ind_facilities.png',
    desc: 'Facility-management and housekeeping contractors rely on KRESKO concentrates to deliver clean, hygienic environments at a fraction of the delivered-product cost.',
    points: ['Multipurpose cleaners & glass shiners', 'Restroom and washroom care blocks', 'Dilutable concentrates that cut logistics cost']
  }
];


export default function Industries() {
  return (
    <div>
      {/* Hero */}
      <section className="solution-banner" style={{
        backgroundImage: "linear-gradient(rgba(15,23,42,0.82), rgba(15,23,42,0.82)), url('/images/ind_industrial.png')",
        padding: '6rem 0'
      }}>
        <div className="container solution-content" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <span className="hero-tag" style={{ backgroundColor: 'var(--color-accent)', marginBottom: '1rem', display: 'inline-block' }}>
            INDUSTRIES WE SERVE
          </span>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1rem' }}>
            Delivering high-performance chemical solutions across diverse industries
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
            Advanced formulations, OEM manufacturing, private labeling, and customized product development for
            manufacturers, distributors, private-label brands, and industrial businesses.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link to="/products" className="btn btn-primary" style={{ borderRadius: '30px', padding: '0.85rem 2rem' }}>
              Explore Products
            </Link>
            <Link to="/contact" className="btn btn-white" style={{ borderRadius: '30px', padding: '0.85rem 2rem', fontWeight: 800 }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
      {/* Intro + industries grid */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-accent)', padding: '0.35rem 0.85rem', borderRadius: '30px', fontWeight: 800, display: 'inline-block', marginBottom: '0.75rem' }}>
              TRUSTED BY BUSINESSES ACROSS INDUSTRIES
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 900, color: 'var(--color-primary)' }}>
              One Concentrate Partner for Every Sector
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', lineHeight: '1.75' }}>
              KRESKO Chemicals partners with manufacturers, distributors, private-label brands, and industrial businesses
              by providing innovative chemical formulations, premium-quality concentrates, and customized manufacturing
              solutions. Our products are trusted across multiple industries for consistent quality, performance, and reliability.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {INDUSTRY_GRID.map((ind) => (
              <div key={ind.title} className="industries-card" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
                <img src={ind.img} alt={ind.title} loading="lazy" />
                <div className="industries-card-content" style={{ zIndex: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.6rem' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.15)',
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0
                    }}>
                      <i className={`fa-solid ${ind.icon}`}></i>
                    </div>
                    <h4 style={{ color: '#fff', fontSize: '1.02rem', margin: 0, fontWeight: 700 }}>{ind.title}</h4>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', lineHeight: 1.55, margin: 0, flexGrow: 1 }}>{ind.desc}</p>
                  <Link to="/products" style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    Explore Products <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.7rem' }}></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* Detailed alternating sections */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 3.5rem auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 900, color: 'var(--color-primary)' }}>
              Industry-Specific Solutions
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem' }}>
              How KRESKO concentrates are applied across key commercial and industrial sectors.
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
                  <span className="hero-tag" style={{ marginBottom: '0.5rem', fontSize: '0.75rem', display: 'inline-block' }}>
                    {sec.tag}
                  </span>
                  <h3 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', margin: '0.5rem 0 1rem 0', fontWeight: 900, color: 'var(--color-primary)' }}>
                    <i className={`fa-solid ${sec.icon}`} style={{ color: 'var(--color-accent)', marginRight: '0.6rem' }}></i>
                    {sec.title}
                  </h3>
                  <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.92rem' }}>{sec.desc}</p>
                  <ul className="company-feature-list">
                    {sec.points.map(pt => (
                      <li key={pt}><span className="check-icon"><i className="fa-solid fa-check"></i></span>{pt}</li>
                    ))}
                  </ul>
                  <Link to="/products" className="btn btn-primary" style={{ borderRadius: '8px', padding: '0.75rem 1.5rem', fontSize: '0.85rem', fontWeight: 800, marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>Explore Products</span><i className="fa-solid fa-arrow-right"></i>
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
      {/* Why Kresko */}
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#fff' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 3rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', display: 'block', marginBottom: '0.35rem' }}>
              WHY INDUSTRIES CHOOSE KRESKO
            </span>
            <h2 style={{ color: '#fff' }}>Built for B2B Demands</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: 'fa-industry', title: 'Advanced Manufacturing', desc: 'Consistent, batch-verified concentrates engineered for scale.' },
              { icon: 'fa-flask-vial', title: 'Customized Formulations', desc: 'Product development tailored to your brand and application.' },
              { icon: 'fa-boxes-stacked', title: 'Bulk Supply', desc: 'Economical bulk packaging and reliable commercial supply.' },
              { icon: 'fa-globe', title: 'Export Ready', desc: 'Formulations and documentation built for domestic and export markets.' }
            ].map((f) => (
              <div key={f.title} style={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(56,189,248,0.12)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto 1.25rem auto' }}>
                  <i className={`fa-solid ${f.icon}`}></i>
                </div>
                <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.5rem' }}>{f.title}</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
            <Link to="/oem" className="btn" style={{ borderRadius: '30px', padding: '0.85rem 2rem', fontWeight: 800, border: '2px solid #fff', color: '#fff' }}>OEM & Private Label</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
