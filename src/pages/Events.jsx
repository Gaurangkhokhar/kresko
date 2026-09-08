import React from 'react';

const events = [
  { year: '2026', type: 'Upcoming Expo', title: 'India International Chemical Expo 2026', location: 'New Delhi, India', image: '/images/f1.jpg', desc: 'Meet our team to explore hygiene concentrates, specialty chemicals and OEM manufacturing partnerships.' },
  { year: '2026', type: 'Trade Exhibition', title: 'Home & Personal Care Sourcing Meet', location: 'Ahmedabad, India', image: '/images/f2.jpg', desc: 'Connecting concentrate manufacturers with private-label brands, distributors and bulk buyers.' },
  { year: '2025', type: 'International Expo', title: 'Export Buyers Connect — Middle East & Africa', location: 'Mumbai, India', image: '/images/f3.jpg', desc: 'A meeting point for international distributors looking for export-ready formulations and technical support.' },
  { year: '2025', type: 'Technical Workshop', title: 'Herbal Formulation Workshop', location: 'Vadodara, India', image: '/images/f4.jpg', desc: 'A focused workshop on sustainable home-care formulations and innovative product development.' },
  { year: '2025', type: 'Industry Expo', title: 'Cleaning & Hygiene Solutions Expo', location: 'Gandhinagar, India', image: '/images/f5.jpg', desc: 'Discover high-performance concentrate solutions designed for modern cleaning and hygiene brands.' },
  { year: '2024', type: 'B2B Networking', title: 'Global Chemical Partners Meet', location: 'Ahmedabad, India', image: '/images/f6.jpg', desc: 'Building lasting partnerships with manufacturers, formulators and sourcing teams from global markets.' },
];

export default function Events() {
  return (
    <div className="events-reference-page">
      <section className="events-reference-hero">
        <div className="container">
          <span className="events-kicker">CONNECT • COLLABORATE • GROW</span>
          <h1>Events <em>/ Expo</em></h1>
          <p>Meet Swadesh International at leading industry events, exhibitions and technical forums across India and global markets.</p>
        </div>
      </section>

      <section className="section events-reference-list">
        <div className="container">
          <div className="events-reference-heading"><span className="events-kicker">OUR JOURNEY</span><h2>Events &amp; Expo</h2><p>From new product launches to global partnerships, our events are where ideas turn into meaningful business connections.</p></div>
          <div className="events-reference-grid">
            {events.map((event) => (
              <article className="event-reference-card" key={event.title}>
                <div className="event-reference-image"><img src={event.image} alt={event.title} /><span>{event.year}</span></div>
                <div className="event-reference-content"><span className="event-reference-type">{event.type}</span><h3>{event.title}</h3><div className="event-reference-location"><i className="fa-solid fa-location-dot" /> {event.location}</div><p>{event.desc}</p><a href="#event-contact">View Event Details <i className="fa-solid fa-arrow-right" /></a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="events-reference-cta" id="event-contact"><div className="container"><span className="events-kicker">PLAN A CONVERSATION</span><h2>Meet us at the next event.</h2><p>Want to discuss a product, formulation or distribution partnership? Schedule a meeting with our team.</p><a href="/contact" className="btn btn-primary">Contact Our Team <i className="fa-solid fa-arrow-right" /></a></div></section>
    </div>
  );
}
