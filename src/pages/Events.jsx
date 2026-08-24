import React from 'react';

const events = [
  {
    date: 'Upcoming',
    title: 'India International Chemical Expo 2026',
    location: 'New Delhi, India',
    desc: 'Visit the KRESKO Chemicals stall to explore our full range of cleaning concentrates, chlorine dioxide products, and OEM partnership opportunities.'
  },
  {
    date: 'Upcoming',
    title: 'Home & Personal Care Sourcing Meet',
    location: 'Ahmedabad, India',
    desc: 'A B2B networking event connecting concentrate manufacturers with private label brands and bulk buyers from across India.'
  },
  {
    date: 'Past Event',
    title: 'Export Buyers Connect — Middle East & Africa',
    location: 'Mumbai, India',
    desc: 'KRESKO hosted international distributors to showcase export-ready formulations, documentation support, and customized packaging capabilities.'
  },
  {
    date: 'Past Event',
    title: 'Herbal Formulation Workshop',
    location: 'Vadodara, India',
    desc: 'A hands-on technical workshop on herbal floor cleaners, hand washes, and botanical actives for our OEM partners.'
  }
];

export default function Events() {
  return (
    <div>
      <section className="solution-banner" style={{ backgroundImage: "url('/images/photo-1519668963014-2308b08e5e9b.jpeg')", padding: '5rem 0' }}>
        <div className="container solution-content">
          <h2>Events</h2>
          <p>Trade shows, sourcing meets, and technical workshops where you can meet the KRESKO team.</p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '3.5rem', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--navy)' }}>Where We&apos;ll Be Next</h2>
            <p>
              We regularly exhibit at chemical and FMCG trade events across India and abroad. Reach out to
              schedule a meeting with our team at any upcoming event.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {events.map((e) => (
              <div key={e.title} className="gallery-item-card" style={{ padding: '1.75rem', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    backgroundColor: e.date === 'Upcoming' ? 'var(--color-accent, #1a9c6b)' : '#8a94a6',
                    color: '#fff',
                    marginBottom: '0.9rem'
                  }}
                >
                  {e.date}
                </span>
                <h3 style={{ color: 'var(--navy)', marginTop: 0 }}>{e.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#5b6572', margin: '0 0 0.6rem' }}>📍 {e.location}</p>
                <p style={{ fontSize: '0.92rem', marginBottom: 0 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
