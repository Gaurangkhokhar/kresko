import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import EditableText from '../components/EditableText';
import { INDUSTRIES_SERVED } from '../data/industries';

const aboutHighlights = [
  ['fa-bullseye', 'Our Mission', 'To be a trusted global partner in the chemical industry by delivering innovative, high-performance, and sustainable concentrate solutions. We aim to create value for our customers through quality, reliability, and continuous improvement.'],
  ['fa-eye', 'Our Vision', 'To become a globally recognized leader in cleaning and hygiene concentrate manufacturing, known for innovation, sustainability, and long-term partnerships.'],
  ['fa-people-group', 'Our Team', 'Our team of experienced professionals is dedicated to innovation, quality, and customer satisfaction. With strong industry knowledge and technical expertise, we ensure that every solution meets the specific needs of our clients.'],
  ['fa-city', 'Our Infrastructure', 'Our company is equipped with in-house manufacturing facilities spread over 30,000 sq. ft. area. Our advanced customization and product R&D facilities aid us in developing innovative and unique products to match the ever-changing demands of the market.'],
  ['fa-award', 'Our Quality', 'Quality is an attitude for Swadesh International. We maintain the highest quality standards of the products starting from procurement to dispatching. We test every product for effectiveness, purity, chemical concentration and stability.'],
];

const aboutTestimonials = [
  ['Consistent quality and responsive technical support have made Swadesh a dependable partner for our growing product range.', 'Global Brand Partner', 'Manufacturing & Distribution'],
  ['Their concentrate formulations help us reduce logistics costs while maintaining excellent finished-product performance.', 'Private Label Customer', 'Home Care Brand'],
  ['From documentation to delivery, the team understands export requirements and keeps every order on track.', 'Export Customer', 'International Trade Partner'],
];

const aboutCertificates = [
  ['ISO 9001:2015', '/certificates/iso9001-2015.png'],
  ['ISO 14001:2015', '/certificates/iso14001-2015.png'],
  ['WHO-GMP Compliance', '/certificates/who-gmp-compliance.png'],
  ['FDA Compliance', '/certificates/fda-compliance.png'],
  ['OHSAS 18001:2007', '/certificates/ohsas18001-2007.png'],
];

export default function About() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');

  // Navigate to the Industries We Serve page
  const goToIndustries = () => navigate('/industries');

  // Allow deep-linking to a tab via /about?tab=<id> (used by the navbar menu)
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabs.some(t => t.id === tabParam)) {
      setActiveSection(tabParam);
    }
  }, [searchParams]);

  const tabs = [
    { id: 'profile', label: 'Company Profile', icon: 'fa-building' },
    { id: 'vision', label: 'Vision & Mission', icon: 'fa-eye' },
    { id: 'infrastructure', label: 'Infrastructure', icon: 'fa-industry' },
    { id: 'quality', label: 'Quality Policy', icon: 'fa-shield-halved' },
    { id: 'industries', label: 'Industries We Serve', icon: 'fa-globe' }
  ];

  return (
    <div>
      {/* Page Banner */}
      <section className="about-reference-hero">
        <div className="container about-reference-hero-inner">
          <h1><span>About</span> <em>Us</em></h1>
          <p><EditableText id="about_banner_desc" defaultText="Have questions about our products or services? Our expert team is ready to assist you with technical support, product inquiries, and long-term partnership opportunities in hygiene and cleaning concentrate solutions." /></p>
        </div>
      </section>

      {/* Tabbed Interactive Section */}
      <section className="section about-reference-content" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveSection(tab.id); setSearchParams(tab.id === 'profile' ? {} : { tab: tab.id }, { replace: true }); }}
                className={`btn ${activeSection === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '30px', padding: '0.75rem 1.5rem' }}
              >
                <i className={`fa-solid ${tab.icon}`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="about-content-card" style={{ backgroundColor: 'var(--color-bg-white)', padding: '3rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)', minHeight: '400px', transition: 'all 0.3s ease' }}>
            
            {/* 1. Company Profile */}
            {activeSection === 'profile' && (
              <div className="fade-in">
                <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                  Company Profile
                </h3>
                <div className="about-profile-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
                  <div className="about-profile-copy">
                    <p style={{ marginBottom: '1rem', fontSize: '1.05rem', lineHeight: '1.8' }}>
                      At <strong>Swadesh International</strong>, we are a leading manufacturer and exporter of hygiene and cleaning product concentrates in India, delivering innovative, cost-effective, and high-performance solutions to global markets.
                    </p>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                      With years of industry expertise, we specialize in developing advanced concentrate formulations for home care, personal care, automotive care, disinfectants, and specialty cleaning applications. Our strength lies in combining technical knowledge, modern manufacturing, and customer-centric customization.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
                      <div style={{ padding: '1rem', borderLeft: '3px solid var(--color-accent)', backgroundColor: 'var(--color-bg-light)' }}>
                        <h4 style={{ color: 'var(--color-primary)', margin: '0' }}>15+ Years</h4>
                        <small style={{ color: 'var(--color-text-muted)' }}>Chemical Formulation R&D</small>
                      </div>
                      <div style={{ padding: '1rem', borderLeft: '3px solid var(--color-accent)', backgroundColor: 'var(--color-bg-light)' }}>
                        <h4 style={{ color: 'var(--color-primary)', margin: '0' }}>50+ Products</h4>
                        <small style={{ color: 'var(--color-text-muted)' }}>Dilutable Concentrates</small>
                      </div>
                    </div>
                  </div>
                  <div className="about-profile-image">
                    <img src="/images/abutus.jpeg" alt="Swadesh International manufacturing facility" style={{ width: '100%', borderRadius: '6px', boxShadow: 'var(--shadow-lg)' }} />
                  </div>
                </div>
              </div>
            )}

            {/* 2. Vision & Mission */}
            {activeSection === 'vision' && (
              <div className="fade-in">
                <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                  Vision & Mission
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                  {/* Our Vision */}
                  <div className="bg-image-card">
                    <img src="/images/photo-1528218609959-006f98e6b79e.jpeg" alt="Our Vision" className="bg-image-card-img" />
                    <div className="bg-image-card-overlay"></div>
                    <div className="bg-image-card-content">
                      <div className="bg-image-card-icon-wrapper">
                        <div className="bg-image-card-icon">
                          <i className="fa-solid fa-eye"></i>
                        </div>
                      </div>
                      <h4 className="bg-image-card-title">Our Vision</h4>
                      <p className="bg-image-card-desc">To revolutionize the global cleaning chemical supply chain by establishing high-dilution concentrate technologies as the industry standard. We envision a sustainable market where water isn't shipped unnecessarily, reducing fuel emissions, single-use plastic waste, and product costs.</p>
                    </div>
                  </div>

                  {/* Our Mission */}
                  <div className="bg-image-card">
                    <img src="/images/photo-1561383621-d109918107aa.jpeg" alt="Our Mission" className="bg-image-card-img" />
                    <div className="bg-image-card-overlay"></div>
                    <div className="bg-image-card-content">
                      <div className="bg-image-card-icon-wrapper">
                        <div className="bg-image-card-icon">
                          <i className="fa-solid fa-bullseye"></i>
                        </div>
                      </div>
                      <h4 className="bg-image-card-title">Our Mission</h4>
                      <p className="bg-image-card-desc">To develop and manufacture premium, stable, and highly-dilutable cleaning formulations for B2B distributors and OEM brands. We commit to supplying consistent batches backed by rigorous quality validation (COA, TDS, SDS) and providing complete formulation customization support.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Infrastructure */}
            {activeSection === 'infrastructure' && (
              <div className="fade-in">
                <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                  Our Infrastructure
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
                  <div>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                      Our modern manufacturing unit in Ahmedabad, Gujarat, is fully equipped with state-of-the-art chemical engineering systems. We utilize high-capacity jacketed reactors, blending vessels, and precise testing chambers.
                    </p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                      <li><i className="fa-solid fa-circle-check" style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}></i> Stainless Steel Jacketed Blending Reactors (up to 5,000L capacity)</li>
                      <li><i className="fa-solid fa-circle-check" style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}></i> High-shear homogenizers for stable phenyl emulsion bases</li>
                      <li><i className="fa-solid fa-circle-check" style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}></i> Semi-automatic bulk drum filling lines with precise mass flowmeters</li>
                      <li><i className="fa-solid fa-circle-check" style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}></i> Integrated powder compounding, blending, and pouch packing assemblies</li>
                    </ul>
                    <div style={{ marginTop: '2rem' }}>
                      <Link to="/facility" className="btn btn-primary">Tour Manufacturing Facility</Link>
                    </div>
                  </div>
                  <div>
                    <img src="/images/photo-1503547490235-0d6d87990308.jpeg" alt="Reactor vessel systems" style={{ width: '100%', borderRadius: '6px', boxShadow: 'var(--shadow-lg)' }} />
                  </div>
                </div>
              </div>
            )}

            {/* 4. Quality Policy */}
            {activeSection === 'quality' && (
              <div className="fade-in">
                <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                  Quality Policy & Compliance
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'center' }}>
                  <div>
                    <img src="/images/photo-1528218609959-006f98e6b79e.jpeg" alt="QC Laboratory Testing" style={{ width: '100%', borderRadius: '6px', boxShadow: 'var(--shadow-lg)' }} />
                  </div>
                  <div>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                      At Kresko Chemicals, quality control is integrated into every step of our formulation process. Each batch of concentrates is tested in our in-house lab before container packing.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                      <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-light)', borderRadius: '4px' }}>
                        <h5 style={{ color: 'var(--color-primary)', margin: '0 0 0.5rem 0' }}>pH & Viscosity</h5>
                        <small style={{ color: 'var(--color-text-muted)' }}>Tested using digital meters and viscometers to match dilutability standards.</small>
                      </div>
                      <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-light)', borderRadius: '4px' }}>
                        <h5 style={{ color: 'var(--color-primary)', margin: '0 0 0.5rem 0' }}>Thermal Stability</h5>
                        <small style={{ color: 'var(--color-text-muted)' }}>Accelerated thermal trials ensure bases won't separate in transit or hot storage.</small>
                      </div>
                      <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-light)', borderRadius: '4px' }}>
                        <h5 style={{ color: 'var(--color-primary)', margin: '0 0 0.5rem 0' }}>Full TDS / SDS</h5>
                        <small style={{ color: 'var(--color-text-muted)' }}>Complete technical sheets and safety data certificates provided for every SKU.</small>
                      </div>
                      <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-light)', borderRadius: '4px' }}>
                        <h5 style={{ color: 'var(--color-primary)', margin: '0 0 0.5rem 0' }}>Batch Traceability</h5>
                        <small style={{ color: 'var(--color-text-muted)' }}>Retention samples kept for 2 years to trace quality parameters.</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Industries We Serve */}
            {activeSection === 'industries' && (
              <div className="fade-in">
                <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                  Industries We Serve
                </h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>
                  KRESKO Chemicals supplies premium concentrates and formulations trusted across a wide range of
                  industries — from household cleaning brands to large industrial and institutional facilities.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {INDUSTRIES_SERVED.map(ind => (
                    <div
                      key={ind.id}
                      className="industries-card"
                      onClick={goToIndustries}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') goToIndustries(); }}
                      style={{ height: '300px', cursor: 'pointer', transition: 'transform 0.25s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
                    >
                      {/* Background image */}
                      <img src={ind.image} alt={ind.name} />

                      {/* Content Container */}
                      <div className="industries-card-content" style={{ zIndex: 3 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1rem'
                          }}>
                            <i className={`fa-solid ${ind.icon}`}></i>
                          </div>
                          <h4 style={{ color: '#ffffff', fontSize: '1.15rem', margin: 0, fontWeight: 700 }}>{ind.name}</h4>
                        </div>
                        <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{ind.desc}</p>
                        <span style={{ color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, marginTop: '0.6rem', display: 'inline-block', opacity: 0.9 }}>
                          View Details <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.7rem', marginLeft: '0.25rem' }}></i>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button type="button" onClick={goToIndustries} className="btn btn-primary">
                    Explore All Served Sectors <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.4rem' }}></i>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <section className="about-highlights-section">
        <div className="container">
          <div className="about-highlights-grid">
            {aboutHighlights.map(([icon, title, description]) => (
              <article className="about-highlight-card" key={title}>
                <i className={`fa-solid ${icon}`} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-testimonials-section"><div className="container"><div className="about-section-heading"><h2>What Our Clients Say</h2><p>Trusted by leading businesses worldwide for quality, reliability, and exceptional service</p></div><div className="about-testimonial-grid">{aboutTestimonials.map(([quote, name, role]) => <article className="about-testimonial-card" key={name}><div className="about-stars">★★★★★</div><p>“{quote}”</p><strong>{name}</strong><span>{role}</span></article>)}</div></div></section>

      <section className="about-partner-banner"><div className="container"><h2>Join 500+ Satisfied Customers</h2><p>Experience The Difference of Working with A Trusted Industry Leader</p><Link to="/contact" className="btn btn-white">Become a Partner</Link></div></section>

      <section className="about-certifications-section"><div className="container"><div className="about-section-heading"><h2>Certifications &amp; Accreditations</h2><p>Our commitment to excellence validated by international quality standards and certifications</p></div><div className="certificate-grid">{aboutCertificates.map(([title, image]) => <Link to="/certifications" className="certificate-card" key={title}><img src={image} alt={title} /><span>{title}</span></Link>)}</div></div></section>
    </div>
  );
}
