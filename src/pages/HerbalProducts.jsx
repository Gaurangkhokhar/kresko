import React from 'react';
import { Link } from 'react-router-dom';

const herbalProducts = [
  {
    title: 'Herbal Floor Cleaner',
    desc: 'Herbal-based floor cleaning formulation made with carefully selected natural ingredients, delivering effective dirt removal with a refreshing natural fragrance.'
  },
  {
    title: 'Herbal Hand Wash',
    desc: 'Gentle herbal hand cleansing formulation enriched with natural extracts — effective germ removal while keeping hands soft and refreshed.'
  },
  {
    title: 'Herbal Dish Wash',
    desc: 'Plant-powered grease-cutting formulation that removes oil and food residue effectively while being mild on hands.'
  },
  {
    title: 'Herbal Toilet Cleaner',
    desc: 'Naturally derived toilet cleaning formulation offering effective stain removal and hygiene without harsh acidic fumes.'
  },
  {
    title: 'Herbal Mosquito Repellent',
    desc: 'Citronella and essential-oil based mosquito repellent formulations providing dependable, DEET-free personal and ambient protection.'
  },
  {
    title: 'Herbal Air Freshener',
    desc: 'Natural fragrance concentrates for air care applications, delivering long-lasting freshness derived from botanical extracts.'
  }
];

export default function HerbalProducts() {
  return (
    <div>
      <section className="solution-banner" style={{ backgroundImage: "url('/images/photo-1503547490235-0d6d87990308.jpeg')", padding: '5rem 0' }}>
        <div className="container solution-content">
          <h2>Herbal Products</h2>
          <p>Nature-inspired cleaning and personal care formulations manufactured for modern herbal brands.</p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ color: 'var(--navy)' }}>Effective Cleaning, Naturally</h2>
            <p>
              KRESKO Chemicals develops and manufactures premium-quality herbal formulations using plant-derived
              actives and essential oils. All products are available for OEM manufacturing, private label brands,
              distributors, and bulk buyers with customized packaging and documentation support.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {herbalProducts.map((p) => (
              <div key={p.title} className="gallery-item-card" style={{ padding: '1.75rem', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
                <h3 style={{ color: 'var(--navy)', marginTop: 0 }}>{p.title}</h3>
                <p style={{ fontSize: '0.92rem', marginBottom: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/contact" className="btn btn-primary">Enquire About Herbal Range</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
