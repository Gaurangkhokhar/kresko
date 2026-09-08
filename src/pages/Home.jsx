import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductCategories, getReviews } from '../utils/storage';
import QuoteModal from '../components/QuoteModal';

const categoryFallbacks = [
  { key: 'home-care', name: 'Home Cleaning Liquids', image: '/images/home_care_bg.png', icon: 'fa-house', desc: 'Powerful concentrates for toilet, floor, kitchen and everyday home care formulations.' },
  { key: 'personal-care', name: 'Personal Care Concentrate', image: '/images/personal_care_bg.png', icon: 'fa-pump-soap', desc: 'Gentle, stable bases for shampoos, shower gels, lotions and cosmetic applications.' },
  { key: 'car-care', name: 'Automobile Care Base', image: '/images/car_care_bg.png', icon: 'fa-car', desc: 'High-performance bases for vehicle cleaning, polishing and surface protection.' },
  { key: 'eco-friendly', name: 'Eco Friendly Cleaning', image: '/images/floor_care_bg.png', icon: 'fa-leaf', desc: 'Biodegradable home-care concentrates designed for safer, more sustainable cleaning.' },
  { key: 'disinfectant', name: 'Disinfectant Concentrate', image: '/images/ind_healthcare.png', icon: 'fa-shield-virus', desc: 'Reliable antiseptic and surface hygiene concentrates for commercial and industrial use.' },
  { key: 'specialty-products', name: 'Specialty Cleaners Base', image: '/images/specialty_products_bg.png', icon: 'fa-flask', desc: 'Specialty raw chemicals and formulations for scalable manufacturing operations.' },
];

const promises = [
  ['fa-certificate', 'ISO Certified', 'Quality Management'],
  ['fa-truck-fast', 'Fast Delivery', 'Worldwide Shipping'],
  ['fa-headset', '24/7 Support', 'Expert Assistance'],
  ['fa-leaf', 'Eco-Friendly', 'Sustainable Practices'],
  ['fa-lightbulb', 'R&D Excellence', 'Innovation Driven'],
];

const reasons = [
  ['fa-industry', 'Bulk Manufacturing Expertise', 'Purpose-built facilities designed for high-volume concentrate production with consistent batch-to-batch performance.'],
  ['fa-globe', 'Export-Ready Compliance', 'Products manufactured in line with international quality, safety and regulatory standards for global markets.'],
  ['fa-handshake', 'Long-Term Partnership', 'We work as an extension of your team, supporting growth, innovation and market expansion.'],
  ['fa-tags', 'Competitive Bulk Pricing', 'Optimized production and sourcing deliver cost-effective solutions without compromising quality.'],
  ['fa-flask-vial', 'Custom Formulation Support', 'Tailored concentrate development to match your performance, cost and market-specific requirements.'],
  ['fa-award', 'Consistent Quality', 'Rigorous checks and dependable documentation keep every batch ready for your production line.'],
];

const certificates = [
  ['ISO 9001:2015', '/certificates/iso9001-2015.png'],
  ['ISO 14001:2015', '/certificates/iso14001-2015.png'],
  ['WHO-GMP Compliance', '/certificates/who-gmp-compliance.png'],
  ['FDA Compliance', '/certificates/fda-compliance.png'],
  ['OHSAS 18001:2007', '/certificates/ohsas18001-2007.png'],
];

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const load = () => {
      const stored = Object.entries(getProductCategories()).slice(0, 6).map(([key, value]) => ({ key, ...value }));
      setCategories(stored.length ? stored : categoryFallbacks);
      setReviews(getReviews().slice(0, 3));
    };
    load();
    window.addEventListener('categoriesUpdated', load);
    return () => window.removeEventListener('categoriesUpdated', load);
  }, []);

  const visibleCategories = categories.length ? categories : categoryFallbacks;

  return (
    <main className="swadesh-home">
      <section className="swadesh-hero">
        <div className="container swadesh-hero-inner">
          <div className="swadesh-hero-copy">
            <span className="eyebrow">HYGIENE PRODUCTS CONCENTRATE / BASE MANUFACTURER</span>
            <h1>Clean. Safe. Sustainable.</h1>
            <p>Leading manufacturer and exporter of premium hygiene product concentrates and specialty cleaning chemicals, trusted by 500+ businesses worldwide.</p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">Explore Products <i className="fa-solid fa-arrow-right" /></Link>
              <button type="button" className="btn btn-light-outline" onClick={() => setIsQuoteOpen(true)}>Request a Quote</button>
            </div>
            <div className="hero-proof"><i className="fa-solid fa-location-dot" /> Ahmedabad, Gujarat, India <span /> <i className="fa-solid fa-calendar-check" /> 12+ years of expertise</div>
          </div>
          <div className="swadesh-hero-visual">
            <div className="hero-visual-label"><strong>500+</strong><span>Businesses served</span></div>
            <img src="/images/photo-1528218609959-006f98e6b79e.jpeg" alt="Chemical manufacturing and hygiene products" />
          </div>
        </div>
      </section>

      <section className="promise-strip"><div className="container promise-grid">{promises.map(([icon, title, detail]) => <div className="promise-item" key={title}><i className={`fa-solid ${icon}`} /><div><strong>{title}</strong><span>{detail}</span></div></div>)}</div></section>

      <section className="section swadesh-intro"><div className="container intro-grid"><div className="intro-image"><img src="/images/abutus.jpeg" alt="Chemical production facility" /><div className="intro-stamp"><strong>12+</strong><span>Years of<br />excellence</span></div></div><div className="intro-copy"><span className="eyebrow">ABOUT SWADESH INTERNATIONAL</span><h2>Hygiene and cleaning concentrates made for growing brands.</h2><p>Based in Ahmedabad, Gujarat, India, we manufacture and export premium cleaning product concentrates, personal care bases, specialty cleaners and industrial cleaning chemicals.</p><p>From private-label manufacturing to bulk supply and custom formulations, our team delivers reliable, scalable and cost-effective solutions with consistent quality.</p><div className="check-list"><span><i className="fa-solid fa-circle-check" /> Advanced chemical technology</span><span><i className="fa-solid fa-circle-check" /> Custom formulation support</span><span><i className="fa-solid fa-circle-check" /> Global export readiness</span><span><i className="fa-solid fa-circle-check" /> Eco-conscious processes</span></div><Link to="/about" className="text-link">Discover our company <i className="fa-solid fa-arrow-right" /></Link></div></div></section>

      <section className="section categories-showcase"><div className="container"><div className="section-heading"><span className="eyebrow">WHAT WE MANUFACTURE</span><h2>Our Product Categories</h2><p>Comprehensive hygiene and cleaning concentrates for modern brands, distributors and industrial applications.</p></div><div className="swadesh-category-grid">{visibleCategories.map((category, index) => <Link to={`/products/${category.key}`} className="swadesh-category-card" key={category.key || index}><img src={category.image || categoryFallbacks[index % categoryFallbacks.length].image} alt={category.name} onError={(event) => { event.currentTarget.src = categoryFallbacks[index % categoryFallbacks.length].image; }} /><div className="category-overlay"><span className="category-icon"><i className={`fa-solid ${category.icon || categoryFallbacks[index % categoryFallbacks.length].icon}`} /></span><h3>{category.name}</h3><p>{category.desc || categoryFallbacks[index % categoryFallbacks.length].desc}</p><span className="card-link">View Products <i className="fa-solid fa-arrow-right" /></span></div></Link>)}</div></div></section>

      <section className="section why-section"><div className="container"><div className="section-heading"><span className="eyebrow">WHY CHOOSE US</span><h2>Your trusted partner in concentrate excellence.</h2><p>Proven manufacturing expertise, dependable service and a long-term approach to every partnership.</p></div><div className="reason-grid">{reasons.map(([icon, title, detail]) => <article className="reason-card" key={title}><i className={`fa-solid ${icon}`} /><h3>{title}</h3><p>{detail}</p></article>)}</div></div></section>

      <section className="sustainability-band"><div className="container sustainability-grid"><div><span className="eyebrow">SUSTAINABILITY COMMITMENT</span><h2>More performance. Less waste.</h2><p>Concentrated formulations reduce resource usage, logistics costs and environmental impact while delivering high-performance results.</p></div><div className="sustainability-points"><span><strong>01</strong> Reduced packaging waste</span><span><strong>02</strong> Lower transportation footprint</span><span><strong>03</strong> Cost-effective manufacturing</span></div></div></section>

      <section className="section global-section"><div className="container global-grid"><div className="global-copy"><span className="eyebrow">GLOBAL PRESENCE</span><h2>Quality that travels further.</h2><p>With a strong distribution network spanning across 50+ countries, we ensure timely delivery and local support wherever you are.</p><div className="global-stats"><div><strong>25+</strong><span>Countries Served</span></div><div><strong>15</strong><span>Distribution Centers</span></div><div><strong>5</strong><span>Manufacturing Units &amp; Warehouse</span></div><div><strong>24/7</strong><span>Global Support</span></div></div><div className="region-list"><span><i className="fa-solid fa-location-dot" /><b>Asia Pacific:</b> India, China, Japan, Singapore, Australia</span><span><i className="fa-solid fa-location-dot" /><b>Europe:</b> Germany, UK, France, Italy, Spain</span><span><i className="fa-solid fa-location-dot" /><b>Americas:</b> USA, Canada, Brazil, Mexico</span><span><i className="fa-solid fa-location-dot" /><b>Middle East &amp; Africa:</b> UAE, Saudi Arabia, South Africa</span></div></div><div className="global-map"><div className="map-ring ring-one" /><div className="map-ring ring-two" /><i className="fa-solid fa-earth-americas" /><span className="map-tag tag-india">India</span><span className="map-tag tag-europe">Europe</span><span className="map-tag tag-americas">Americas</span><span className="map-tag tag-africa">Middle East &amp; Africa</span></div></div></section>

      <section className="certifications-home"><div className="container"><div className="section-heading"><span className="eyebrow">QUALITY YOU CAN TRUST</span><h2>Certifications &amp; Accreditations</h2><p>Our commitment to excellence validated by international quality standards and certifications.</p></div><div className="certificate-grid">{certificates.map(([title, image]) => <Link to="/certifications" className="certificate-card" key={title}><img src={image} alt={title} /><span>{title}</span></Link>)}</div><Link to="/certifications" className="certificate-more">View all certifications <i className="fa-solid fa-arrow-right" /></Link></div></section>

      <section className="section testimonials-home"><div className="container"><div className="section-heading"><span className="eyebrow">WHAT OUR CLIENTS SAY</span><h2>Trusted by businesses worldwide.</h2></div><div className="testimonial-grid">{(reviews.length ? reviews : [{ quote: 'Reliable quality, responsive support and consistent delivery for every order.', name: 'Global Brand Partner', role: 'Manufacturing & Distribution' }]).map((review, index) => <article className="testimonial-card" key={review.id || index}><div className="stars">★★★★★</div><p>“{review.quote}”</p><strong>{review.name}</strong><span>{review.role}</span></article>)}</div></div></section>

      <section className="swadesh-cta"><div className="container cta-inner"><div className="cta-heading"><span className="eyebrow">READY TO EXPERIENCE EXCELLENCE?</span><h2>Ready to Experience Excellence?</h2><p>Get in touch with our experts to discuss your chemical requirements and discover how we can help your business grow.</p></div><div className="cta-actions"><button type="button" className="btn btn-cta-gold" onClick={() => setIsQuoteOpen(true)}><i className="fa-regular fa-file-lines" /> Request Quote</button><Link to="/resources" className="btn btn-cta-catalog"><i className="fa-solid fa-download" /> Download Catalog</Link><a href="tel:+916359119541" className="btn btn-cta-call"><i className="fa-solid fa-phone" /> Schedule Call</a></div><div className="cta-benefits"><div><i className="fa-regular fa-clock" /><h3>Quick Response</h3><p>Get quotes within 24 hours</p></div><div><i className="fa-solid fa-user-tie" /><h3>Expert Consultation</h3><p>Free technical support</p></div><div><i className="fa-solid fa-truck-fast" /><h3>Fast Delivery</h3><p>Worldwide shipping available</p></div></div></div></section>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </main>
  );
}
