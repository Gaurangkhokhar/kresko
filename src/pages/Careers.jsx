import React from 'react';
import { Link } from 'react-router-dom';

const openings = [
  {
    title: 'Production / Compounding Chemist',
    type: 'Full-time',
    location: 'Vadodara, Gujarat',
    desc: 'Handle batch compounding, dilution ratios, and QC checks for our range of cleaning concentrates and disinfectants.'
  },
  {
    title: 'Quality Control Executive',
    type: 'Full-time',
    location: 'Vadodara, Gujarat',
    desc: 'Own lab testing — pH, viscosity, specific gravity, and stability studies — with complete COA and documentation support.'
  },
  {
    title: 'Sales & Business Development Manager (B2B)',
    type: 'Full-time',
    location: 'Pan India',
    desc: 'Develop OEM, private label, and distributor relationships for domestic and export markets across our product categories.'
  },
  {
    title: 'Plant Supervisor',
    type: 'Full-time',
    location: 'Vadodara, Gujarat',
    desc: 'Supervise daily plant operations, raw material planning, safety compliance, and dispatch coordination.'
  }
];

export default function Careers() {
  return (
    <div>
      <section className="solution-banner" style={{ backgroundImage: "url('/images/photo-1527398317618-b3da8a79e0ca.jpeg')", padding: '5rem 0' }}>
        <div className="container solution-content">
          <h2>Careers at KRESKO Chemicals</h2>
          <p>Join a fast-growing chemical manufacturing team building products trusted across India and export markets.</p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '3.5rem', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--navy)' }}>Current Openings</h2>
            <p>
              We are always looking for passionate chemists, engineers, and business professionals.
              Apply by sending your resume to our HR team or through the contact form below.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {openings.map((job) => (
              <div key={job.title} className="gallery-item-card" style={{ padding: '1.75rem', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
                <h3 style={{ color: 'var(--navy)', marginTop: 0 }}>{job.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#5b6572', margin: '0 0 0.6rem' }}>
                  {job.type} &nbsp;•&nbsp; 📍 {job.location}
                </p>
                <p style={{ fontSize: '0.92rem', marginBottom: 0 }}>{job.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/contact" className="btn btn-primary">Apply Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
