import React from 'react';
import { Link } from 'react-router-dom';

const rawMaterials = [
  {
    title: 'Surfactants & Actives',
    desc: 'LAS Acid Slurry, SLES, Alpha Olefin Sulphonate (AOS), and non-ionic surfactants — the core cleaning actives behind every concentrate we manufacture.'
  },
  {
    title: 'Pine Oil & Fragrances',
    desc: 'Premium-grade pine oil, perfume compounds, and fragrance oils for phenyls, floor cleaners, and air care products in a wide range of notes.'
  },
  {
    title: 'Thickeners & Builders',
    desc: 'Sodium chloride, CAB polymers, phenyl thickeners, and hand wash thickeners to achieve precise viscosity and product stability.'
  },
  {
    title: 'Acids & Specialty Chemicals',
    desc: 'Hydrochloric acid, sulphamic acid, citric acid, and organic descaling actives for toilet cleaners and scale remover formulations.'
  },
  {
    title: 'Solvents & Emulsifiers',
    desc: 'TPA (Tripropylene Glycol), emulsifiers, and solvents used in glass cleaners, degreasers, and polish concentrates.'
  },
  {
    title: 'Herbal & Botanical Extracts',
    desc: 'Neem, citronella, lemongrass, and other botanical extracts and essential oils supporting our herbal product range.'
  }
];

export default function RawMaterial() {
  return (
    <div>
      <section className="solution-banner" style={{ backgroundImage: "url('/images/photo-1561383621-d109918107aa.jpeg')", padding: '5rem 0' }}>
        <div className="container solution-content">
          <h2>Raw Material Supply</h2>
          <p>Quality raw materials and chemical actives sourced and supplied for concentrate manufacturing.</p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ color: 'var(--navy)' }}>Backward Integration You Can Trust</h2>
            <p>
              KRESKO Chemicals supplies premium-quality raw materials to manufacturers, OEM units, and private
              label brands. Every lot is quality-checked with COA documentation so your production batches stay
              consistent from start to finish.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {rawMaterials.map((r) => (
              <div key={r.title} className="gallery-item-card" style={{ padding: '1.75rem', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
                <h3 style={{ color: 'var(--navy)', marginTop: 0 }}>{r.title}</h3>
                <p style={{ fontSize: '0.92rem', marginBottom: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/contact" className="btn btn-primary">Request Raw Material Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
