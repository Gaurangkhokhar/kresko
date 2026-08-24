import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReviews, getBlogs, saveEnquiry, getHeroSlides, getProductCategories, DEFAULT_HERO_SLIDES } from '../utils/storage';
import { blogsApi, heroSlidesApi, catalogApi } from '../utils/api';
import EditableText from '../components/EditableText';
import FaqSection from '../components/FaqSection';
import QuoteModal from '../components/QuoteModal';

// Guaranteed-to-exist local hero image bundled with the site. Used whenever a
// slide has no image or its image fails to load (e.g. from the backend).
const FALLBACK_HERO_IMAGE = '/images/photo-1528218609959-006f98e6b79e.jpeg';

// A slide is only "usable" if it renders at least one piece of visible content
// (a background image, title, tag or description). Empty slides turn the hero
// into a blank gradient, so they are always dropped.
const isUsableSlide = (s) =>
  s &&
  typeof s === 'object' &&
  (
    (s.image && typeof s.image === 'string') ||
    Boolean(s.title) ||
    Boolean(s.tag) ||
    Boolean(s.desc)
  );

// Normalize slides so every rendered slide is guaranteed to be visible:
//  - inactive slides are removed
//  - slides without usable content are dropped
//  - each slide gets a valid fallback image when its own is missing
const sanitizeSlides = (list) => {
  const arr = Array.isArray(list) ? list : [];
  return arr
    .filter(s => s && s.isActive !== false && s.active !== false)
    .filter(isUsableSlide)
    .map((s) => ({
      ...s,
      image: (s.image && typeof s.image === 'string') ? s.image : (sanitizeSlides.fallback || '')
    }))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
};
sanitizeSlides.fallback = FALLBACK_HERO_IMAGE;

// Quick loadability probe for an image URL. Local ("/") assets are trusted
// without a network request; remote URLs (e.g. hosted on kreskobackend) are
// verified by decoding them so 404/503/blank images are detected and never
// shipped to the hero (which would otherwise render a blank gradient slide).
const checkImage = (url) =>
  new Promise((resolve) => {
    if (!url || typeof url !== 'string') return resolve(false);
    if (url.startsWith('/')) return resolve(true);
    const img = new Image();
    let done = false;
    const finish = (ok) => {
      if (done) return;
      done = true;
      img.onload = img.onerror = null;
      clearTimeout(timer);
      resolve(ok);
    };
    const timer = setTimeout(() => finish(false), 5000);
    img.onload = () => finish(true);
    img.onerror = () => finish(false);
    img.src = url;
  });

// Adopt slides from a candidate list only when at least one slide carries a
// loadable image (local or remote). Slides whose image cannot load get a local
// fallback image. Returns { adopted: false } when no reliable slide can be
// produced so the caller falls through to a guaranteed-safe source.
const resolveCandidates = async (list) => {
  const base = sanitizeSlides(list);
  if (base.length === 0) return { adopted: false, slides: [] };
  const checks = await Promise.all(
    base.map(async (s) => ({ s, ok: await checkImage(s.image) }))
  );
  const anyValid = checks.some((c) => c.ok);
  if (!anyValid) return { adopted: false, slides: [] };
  const resolved = checks.map((c) =>
    c.ok
      ? c.s
      : {
          ...c.s,
          image:
            (DEFAULT_HERO_SLIDES.find((d) => d.tag === c.s.tag) || DEFAULT_HERO_SLIDES[0])
              ?.image || FALLBACK_HERO_IMAGE,
        }
  );
  return { adopted: true, slides: resolved };
};

export default function Home() {
  // Hero Slide State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(() => sanitizeSlides(DEFAULT_HERO_SLIDES));

  useEffect(() => {
    const loadHeroSlides = async () => {
      // 1) Prefer working slides from the backend (image loadability validated).
      //    Only adopt when the backend provides a real multi-slide carousel
      //    (>= 2 usable slides). A lone backend slide would kill the sliding
      //    effect, so we ignore it and keep the bundled defaults instead.
      const MIN_SLIDES = 2;
      try {
        const data = await heroSlidesApi.getAll();
        const raw = Array.isArray(data) ? data : (data && Array.isArray(data.sliders) ? data.sliders : []);
        const { adopted, slides: resolved } = await resolveCandidates(raw);
        if (adopted && resolved.length >= MIN_SLIDES) {
          setSlides(resolved);
          setCurrentSlide(0);
          return;
        }
        console.warn('Home: backend hero slides skipped (fewer than ' + MIN_SLIDES + ' loadable slides), using defaults.');
      } catch (err) {
        console.warn('Home: backend hero slides unavailable, using local defaults:', err);
      }

      // 2) Admin localStorage slides (also image-validated). Same rule applies.
      try {
        const { adopted, slides: resolved } = await resolveCandidates(getHeroSlides());
        const isCustom = getHeroSlides() !== DEFAULT_HERO_SLIDES; // only trust stored overrides
        if (adopted && isCustom && resolved.length >= MIN_SLIDES) {
          setSlides(resolved);
          setCurrentSlide(0);
          return;
        }
      } catch (_e) {}

      // 3) Bundled defaults - guaranteed local images + text, always safe.
      const defaults = sanitizeSlides(DEFAULT_HERO_SLIDES);
      setSlides(defaults);
      setCurrentSlide(0);
    };

    loadHeroSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Category showcase on homepage (driven by the real catalog from storage)
  const [homeCategories, setHomeCategories] = useState(Object.entries(getProductCategories()));

  // Industries Served Details
  const industries = [
    { id: 'hospitality', name: 'Hotels & Hospitality', icon: 'fa-hotel', desc: 'Supply cost-effective dilutable floor cleaners, high-end fragrant soaps, and premium laundry softeners.', image: '/images/ind_hospitality.png' },
    { id: 'hospitals', name: 'Hospitals & Healthcare', icon: 'fa-hospital-user', desc: 'Sterilizing sanitizers, floor sanitizers, and GMP grade hand hygiene soaps for clean clinical environments.', image: '/images/ind_healthcare.png' },
    { id: 'industrial', name: 'Industrial Units', icon: 'fa-industry', desc: 'Heavy-duty degreasers, machinery cleaners, and bulk descaling solutions for boilers and heat exchangers.', image: '/images/ind_industrial.png' },
    { id: 'laundry', name: 'Commercial Laundry', icon: 'fa-soap', desc: 'Concentrated detergent liquids (4X, 6X), fabric comfort softeners, and active oxygen fabric whiteners.', image: '/images/ind_laundry.png' },
    { id: 'facilities', name: 'Facility Management', icon: 'fa-building-shield', desc: 'Multipurpose cleaning concentrates, glass shiners, and restroom blocks for facilities and corporate malls.', image: '/images/ind_facilities.png' },
    { id: 'food', name: 'Food Processing', icon: 'fa-utensils', desc: 'Kitchen degreasers, dishwash gels and sanitation products for food plants, dairies, bakeries and commercial kitchens.', image: '/images/kitchen_care_bg.png' },
    { id: 'education', name: 'Educational Institutions', icon: 'fa-graduation-cap', desc: 'Safe, economical cleaning and hygiene concentrates for schools, colleges, universities and hostels.', image: '/images/floor_care_bg.png' },
    { id: 'corporate', name: 'Corporate Offices', icon: 'fa-building', desc: 'Streak-free glass, floor and washroom care for corporate offices, IT parks and business centers.', image: '/images/glass_care_bg.png' },
    { id: 'retail', name: 'Shopping Malls & Retail', icon: 'fa-cart-shopping', desc: 'High-traffic floor, glass and restroom formulations for malls, supermarkets and retail chains.', image: '/images/bathroom_care_bg.png' },
    { id: 'residential', name: 'Residential Communities', icon: 'fa-house-chimney', desc: 'Apartment and township cleaning solutions for builders, societies and property developers.', image: '/images/home_care_bg.png' },
    { id: 'automotive', name: 'Automotive & Car Care', icon: 'fa-car', desc: 'Car shampoo, polish and wax concentrates for showrooms, wash centers and fleet operators.', image: '/images/car_care_bg.png' },
    { id: 'oem', name: 'OEM & Private Label', icon: 'fa-hand-holding-box', desc: 'Custom formulation and bulk supply for cleaning-chemical brands, FMCG companies and distributors.', image: '/images/oem_manufacturing_bg.png' }
  ];

  // Inquiry Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [productInterest, setProductInterest] = useState('Home Care Concentrates');
  const [message, setMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [statusType, setStatusType] = useState('');

  // Reviews and Blogs
  const [testimonials, setTestimonials] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProductQuote, setSelectedProductQuote] = useState('');

  useEffect(() => {
    setTestimonials(getReviews());

    // Fetch catalogs from backend API
    const loadCatalogs = async () => {
      try {
        await catalogApi.getAll();
      } catch (err) {
        console.warn('Home: catalogs backend fetch notice:', err);
      }
    };

    loadCatalogs();

    // Fetch blogs from backend
    const loadBlogs = async () => {
      try {
        const data = await blogsApi.getAll();
        if (Array.isArray(data) && data.length > 0) {
          setRecentBlogs(data.slice(0, 3));
        } else {
          setRecentBlogs(getBlogs().slice(0, 3));
        }
      } catch (err) {
        console.warn('Home: failed to fetch blogs from backend, using fallback:', err);
        setRecentBlogs(getBlogs().slice(0, 3));
      }
    };
    loadBlogs();

    // Load product categories for the homepage explorer.
    setHomeCategories(Object.entries(getProductCategories()));
  }, []);

  // Refresh categories whenever the admin dashboard or backend sync
  // adds or removes categories.
  useEffect(() => {
    const reloadCategories = () => setHomeCategories(Object.entries(getProductCategories()));
    window.addEventListener('categoriesUpdated', reloadCategories);
    return () => window.removeEventListener('categoriesUpdated', reloadCategories);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const testInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(testInterval);
  }, [testimonials.length]);

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    setStatusMsg('');
    setStatusType('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatusType('error');
      setStatusMsg('Please fill out all required fields.');
      return;
    }

    saveEnquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      machineType: productInterest,
      message: message.trim()
    });

    setStatusType('success');
    setStatusMsg(`Thank you, ${name}! Your quick inquiry for "${productInterest}" has been sent. We will email you the catalog sheet within 24 hours.`);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
  };

  return (
    <div>
      {/* 1. Hero Slider Banner */}
      <section className="hero-slider">
        <div
          className="hero-track"
          style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={slide && slide.overlay === false ? 'hero-slide no-overlay' : 'hero-slide'}
              style={{
                backgroundImage: `url(${(slide && slide.image) || FALLBACK_HERO_IMAGE})`
              }}
            >
              <div className="container">
                <div className="hero-content">
                  <span className="hero-tag">
                    <EditableText id={`home_slide_tag_${index}`} defaultText={slide.tag} />
                  </span>
                  <h1 className="hero-title">
                    <EditableText id={`home_slide_title_${index}`} defaultText={slide.title} />
                  </h1>
                  <p className="hero-description">
                    <EditableText id={`home_slide_desc_${index}`} defaultText={slide.desc} />
                  </p>
                  <div className="hero-buttons">
                    <Link to="/products" className="btn btn-primary" style={{ backgroundColor: 'var(--color-accent, #dc2626)', borderColor: 'var(--color-accent, #dc2626)' }}>EXPLORE PRODUCTS</Link>
                    <button onClick={() => setIsQuoteOpen(true)} className="btn btn-white" style={{ fontWeight: 800 }}>REQUEST A QUOTE</button>
                    <Link to="/resources" className="btn btn-secondary" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>VIEW CATALOGUE</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="slider-arrow slider-arrow-prev"
          onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
          aria-label="Previous Slide"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className="slider-arrow slider-arrow-next"
          onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
          aria-label="Next Slide"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </section>

      {/* 2. Compact Trust Strip */}
      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', borderTop: '3px solid var(--color-accent, #dc2626)', padding: '1.75rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
          <div style={{ padding: '0.5rem 1rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-accent, #dc2626)', lineHeight: 1 }}>12+</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '0.4rem', color: '#cbd5e1' }}>Years of Experience</div>
          </div>
          <div style={{ padding: '0.5rem 1rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0284c7', lineHeight: 1 }}>50+</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '0.4rem', color: '#cbd5e1' }}>Products & Formulations</div>
          </div>
          <div style={{ padding: '0.5rem 1rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#22c55e', lineHeight: 1 }}>10+</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '0.4rem', color: '#cbd5e1' }}>Industries Served</div>
          </div>
          <div style={{ padding: '0.5rem 1rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#f59e0b', lineHeight: 1 }}>15+</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '0.4rem', color: '#cbd5e1' }}>Global Export Markets</div>
          </div>
          <div style={{ padding: '0.5rem 1rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#a855f7', lineHeight: 1 }}>ISO & FDA</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '0.4rem', color: '#cbd5e1' }}>Quality Certified</div>
          </div>
        </div>
      </section>

      {/* 3. Editorial About Kresko Section */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(15,23,42,0.12)', border: '1px solid #e2e8f0' }}>
                <img
                  src="/images/mfg_quality_assurance.png"
                  alt="Kresko Chemicals Manufacturing Plant"
                  style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.currentTarget.src = '/images/photo-1528218609959-006f98e6b79e.jpeg'; }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '-1rem',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '1.25rem 1.75rem',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                borderLeft: '4px solid var(--color-accent, #dc2626)',
                maxWidth: '260px'
              }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>Ahmedabad Plant</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>High-Capacity Compounding & Synthesis Facility</div>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-accent, #dc2626)', display: 'block', marginBottom: '0.5rem' }}>
                ABOUT KRESKO CHEMICALS
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.25, marginBottom: '1.25rem' }}>
                Engineering Advanced Chemical Formulations for Industry & Hygiene
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                Kresko Chemicals is a premier B2B manufacturer and bulk supplier of specialized chemical concentrates, Chlorine Dioxide solutions, water treatment compounds, and cleaning product bases.
              </p>
              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Headquartered in Ahmedabad, Gujarat, our ISO 9001:2015 and FDA certified manufacturing plant features state-of-the-art compounding reactors, in-house analytical testing, and high-speed filling lines designed to supply global brands, facility networks, and industrial distributors.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <i className="fa-solid fa-circle-check" style={{ color: '#0284c7' }}></i>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>30X High-Dilution Tech</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <i className="fa-solid fa-circle-check" style={{ color: '#0284c7' }}></i>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>Full OEM & Private Label</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <i className="fa-solid fa-circle-check" style={{ color: '#0284c7' }}></i>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>Batch COA Guarantees</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <i className="fa-solid fa-circle-check" style={{ color: '#0284c7' }}></i>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>Worldwide Freight Export</span>
                </div>
              </div>

              <Link to="/about" className="btn btn-primary" style={{ backgroundColor: '#0f172a', borderColor: '#0f172a', padding: '0.85rem 1.75rem' }}>
                LEARN MORE ABOUT KRESKO <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.5rem' }}></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Category Solutions Range */}
      <section className="section categories-section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <div className="section-header">
            <h2>
              <EditableText id="home_explore_title" defaultText="Explore Our Product Solutions" />
            </h2>
            <p>
              <EditableText id="home_explore_desc" defaultText="High-efficiency concentrates engineered for high dilution, freight optimization, and premium cleaning power." />
            </p>
          </div>

                    <div className="categories-grid">
            {homeCategories.map(([catKey, cat]) => {
              const subCount = Object.keys(cat.subcategories || {}).length;
              return (
                <Link key={catKey} to={`/products/${catKey}`} className="category-card">
                  <div className="category-card-header">
                    <img
                      src={cat.image || '/images/product_placeholder.jpg'}
                      alt={cat.name}
                      className="category-card-bg"
                      onError={(e) => { e.currentTarget.src = '/images/product_placeholder.jpg'; }}
                    />
                    {subCount > 0 && (
                      <span className="subcategory-badge">{subCount} subcategories</span>
                    )}
                  </div>
                  <div className="category-card-body">
                    <div className="category-card-icon">
                      <i className={`fa-solid ${cat.icon || 'fa-sparkles'}`}></i>
                    </div>
                    <h3 className="category-card-title">{cat.name}</h3>
                    <p className="category-card-desc">
                      {cat.desc || 'Premium B2B chemical concentrate formulation engineered for high dilution and freight optimization.'}
                    </p>
                    <div className="category-card-footer">
                      <span className="explore-products">
                        View Range <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {homeCategories.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-bg-white)', border: '1px dashed var(--color-border)', borderRadius: '8px' }}>
              <i className="fa-solid fa-folder-open" style={{ fontSize: '2.5rem', color: 'var(--color-accent)', marginBottom: '1rem', display: 'block' }}></i>
              <p style={{ fontWeight: 600, margin: '0 0 0.25rem', color: 'var(--color-primary)' }}>No categories in the catalog yet.</p>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>Categories added from the Admin panel will appear here automatically.</p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/products" className="btn btn-secondary">View Full Catalogue</Link>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Kresko */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>
              <EditableText id="home_mfg_title" defaultText="Manufacturing Excellence Behind Every Formula" />
            </h2>
            <p>
              <EditableText id="home_mfg_desc" defaultText="Why national distributors and exporting cleaning brands partner with Kresko Chemicals." />
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Card 1 */}
            <div className="industries-card" style={{ height: '360px' }}>
              <img src="/images/mfg_high_concentration.png" alt="High Concentration Technology" />
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
                    <i className="fa-solid fa-flask-vial"></i>
                  </div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>High Concentration</h4>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                  Dilute raw bases up to 30X at your site. Saves warehouse storage space, carbon footprints, and cuts freight by 90%.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="industries-card" style={{ height: '360px' }}>
              <img src="/images/mfg_oem_private_label.png" alt="OEM & Private Label" />
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
                    <i className="fa-solid fa-tags"></i>
                  </div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>OEM & Private Label</h4>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                  Complete support from formulation compounding, container printing, label design, barcode creation, to logistics.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="industries-card" style={{ height: '360px' }}>
              <img src="/images/mfg_custom_development.png" alt="Custom Development" />
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
                    <i className="fa-solid fa-gears"></i>
                  </div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>Custom Formulation</h4>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                  Adjust color hues, fragrance levels (Jasmine, Lemon, Rose), viscosities, and active chemicals matching local cost targets.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="industries-card" style={{ height: '360px' }}>
              <img src="/images/mfg_quality_assurance.png" alt="Quality Assurance" />
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
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>Quality Assurance</h4>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                  Digital pH checking, refractometric solids analysis, and viscometer stability tests for every synthesized batch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SOLUTIONS FOR REAL INDUSTRIAL CHALLENGES */}
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#0284c7', display: 'block', marginBottom: '0.35rem' }}>
              APPLICATIONS & FIELD EXPERTISE
            </span>
            <h2 style={{ color: '#ffffff' }}>SOLUTIONS FOR REAL INDUSTRIAL CHALLENGES</h2>
            <p style={{ color: '#94a3b8' }}>Targeted chemical and water treatment solutions for critical industrial operational demands.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Solution 1 */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: 'rgba(2,132,199,0.15)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                <i className="fa-solid fa-droplet"></i>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>Industrial Water Treatment</h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                Biocides, coagulants, and scale inhibitors for raw water clarification, cooling towers, and boiler feed systems.
              </p>
              <Link to="/chlorine-dioxide" style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                Explore Water Solutions <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* Solution 2 */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: 'rgba(220,38,38,0.15)', color: 'var(--color-accent, #dc2626)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                <i className="fa-solid fa-shield-virus"></i>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>Disinfection & Bio-Safety</h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                Pure Chlorine Dioxide (ClO2) generator precursors and PCMx disinfectants eliminating 99.999% of pathogens in hospitals & food processing.
              </p>
              <Link to="/chlorine-dioxide" style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-accent, #dc2626)', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                Explore Disinfection Tech <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* Solution 3 */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                <i className="fa-solid fa-filter"></i>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>RO System Maintenance</h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                High-performance anti-scalants, pH buffers, and membrane cleaning chemicals extending reverse osmosis membrane life.
              </p>
              <Link to="/products" style={{ fontSize: '0.82rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                Explore Membrane Chemicals <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* Solution 4 */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: 'rgba(168,85,247,0.15)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                <i className="fa-solid fa-soap"></i>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>Commercial Sanitation & Hygiene</h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                Concentrated floor cleaners, kitchen degreasers, laundry detergents, and personal care bases dilutable up to 30X.
              </p>
              <Link to="/products" style={{ fontSize: '0.82rem', fontWeight: 800, color: '#a855f7', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                Explore Concentrates <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CATALOGUE CTA SECTION */}
      <section style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '4rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '650px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: 'rgba(255,255,255,0.18)', padding: '0.3rem 0.8rem', borderRadius: '4px', display: 'inline-block', marginBottom: '0.75rem' }}>
              TECHNICAL DOCUMENTATION
            </span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, marginBottom: '0.75rem' }}>
              EXPLORE OUR COMPLETE PRODUCT CATALOGUE
            </h2>
            <p style={{ fontSize: '1rem', opacity: 0.92, lineHeight: 1.6, margin: 0 }}>
              Access detailed technical specifications, application protocols, dilution ratios, and chemical properties for all Kresko products.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/resources" className="btn btn-white" style={{ fontWeight: 900, color: '#0f172a', padding: '0.9rem 1.75rem' }}>
              VIEW CATALOGUES <i className="fa-solid fa-eye" style={{ marginLeft: '0.5rem' }}></i>
            </Link>
            <button onClick={() => setIsQuoteOpen(true)} className="btn btn-secondary" style={{ borderColor: '#ffffff', color: '#ffffff', padding: '0.9rem 1.75rem' }}>
              REQUEST CATALOG PDF
            </button>
          </div>
        </div>
      </section>
      <section className="section" style={{ backgroundColor: 'var(--color-bg-light)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header">
            <h2>
              <EditableText id="home_ind_title" defaultText="Industries We Serve" />
            </h2>
            <p>
              <EditableText id="home_ind_desc" defaultText="Supplying highly-stable cleaning chemical concentrates for high-spec commercial and industrial applications." />
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {industries.map(ind => (
              <div
                key={ind.id}
                className="industries-card"
                style={{ height: '360px' }}
              >
                {/* Background image */}
                <img
                  src={ind.image}
                  alt={ind.name}
                />

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
                    <h4 style={{ color: '#ffffff', fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>{ind.name}</h4>
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/industries" className="btn btn-secondary">Explore Served Sectors</Link>
          </div>
        </div>
      </section>

      {/* Brand Logos Marquee */}
      <section className="marquee-container">
        <style>{`
          @keyframes homeMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-container {
            position: relative;
            width: 100%;
            padding: 3.5rem 0;
            background-color: var(--color-bg-white);
            border-top: 1px solid var(--color-border);
            border-bottom: 1px solid var(--color-border);
            overflow: hidden;
          }
          .marquee-container::before,
          .marquee-container::after {
            content: "";
            position: absolute;
            top: 0;
            width: 180px;
            height: 100%;
            z-index: 2;
            pointer-events: none;
          }
          .marquee-container::before {
            left: 0;
            background: linear-gradient(to right, var(--color-bg-white) 0%, rgba(255, 255, 255, 0) 100%);
          }
          .marquee-container::after {
            right: 0;
            background: linear-gradient(to left, var(--color-bg-white) 0%, rgba(255, 255, 255, 0) 100%);
          }
          .marquee-track {
            display: flex;
            width: max-content;
            align-items: center;
            gap: 7rem;
            animation: homeMarquee 50s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
          .marquee-item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 70px;
          }
          .marquee-item img {
            height: 60px;
            object-fit: contain;
            opacity: 0.9;
            transition: all var(--transition-normal);
          }
          .marquee-item img:hover {
            opacity: 1;
            transform: scale(1.08);
          }
          @media (max-width: 768px) {
            .marquee-container {
              padding: 2.25rem 0;
            }
            .marquee-track {
              gap: 4.5rem;
              animation: homeMarquee 38s linear infinite;
            }
            .marquee-item {
              height: 52px;
            }
            .marquee-item img {
              height: 44px;
            }
            .marquee-container::before,
            .marquee-container::after {
              width: 90px;
            }
          }
        `}</style>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            fontSize: '0.8rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            fontWeight: 700
          }}>
            Our Certifications, Accreditations & Brands
          </span>
        </div>

        <div style={{ width: '100%', overflow: 'hidden' }}>
          <div className="marquee-track">
            {/* Set 1 (Mixed Accreditations & Brand Logos Alternately) */}
            <div className="marquee-item"><img src="/images/marquee_brand_5.png" alt="ISO 9001:2015 Seal" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_rapidfresh.jpg" alt="Rapid Fresh Logo" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_iso14001.jpg" alt="ISO 14001:2015 Seal" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_rapidpunch.jpg" alt="RapidPunch Logo" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_fda.jpg" alt="FDA Certified Badge" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_rapidoxide.jpg" alt="RapidOxide Logo" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_iaf.jpg" alt="IAF Accredited Badge" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_rapig.jpg" alt="Rapi-G Logo" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_kresko_certified.jpg" alt="Kresko Certified Seal" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_shine.jpg" alt="Cura Shine Logo" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_2.jpg" alt="Verified Exporter Seal" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_rapidglow.jpg" alt="RapidGlow Logo" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_indiamart.jpg" alt="IndiaMart TrustSEAL" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_rapidfresh_red.png" alt="Rapid Fresh Red Logo" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_dac.jpg" alt="DAC Dubai Accreditation" /></div>

            {/* Set 2 (Duplicated exact sequence for seamless horizontal infinite loop) */}
            <div className="marquee-item"><img src="/images/marquee_brand_5.png" alt="ISO 9001:2015 Seal duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_rapidfresh.jpg" alt="Rapid Fresh Logo duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_iso14001.jpg" alt="ISO 14001:2015 Seal duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_rapidpunch.jpg" alt="RapidPunch Logo duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_fda.jpg" alt="FDA Certified Badge duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_rapidoxide.jpg" alt="RapidOxide Logo duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_iaf.jpg" alt="IAF Accredited Badge duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_rapig.jpg" alt="Rapi-G Logo duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_kresko_certified.jpg" alt="Kresko Certified Seal duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_shine.jpg" alt="Cura Shine Logo duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_2.jpg" alt="Verified Exporter Seal duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_rapidglow.jpg" alt="RapidGlow Logo duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_indiamart.jpg" alt="IndiaMart TrustSEAL duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_rapidfresh_red.png" alt="Rapid Fresh Red Logo duplicated" /></div>
            <div className="marquee-item"><img src="/images/marquee_brand_dac.jpg" alt="DAC Dubai Accreditation duplicated" /></div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Slider */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="testimonials-slider">
            <div
              className="testimonials-track"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((test, index) => (
                <div key={index} className="testimonial-slide">
                  <p>"{test.quote}"</p>
                  <div className="testimonial-author" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="avatar" style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "var(--color-primary)", color: "var(--color-bg-white)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1.25rem", margin: "0 auto 1rem auto" }}>
                      {test.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <strong>{test.name}</strong>
                    <span>{test.role}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`Testimonial review ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Recent Technical Guides */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-light)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header">
            <h2>
              <EditableText id="home_blog_title" defaultText="Recent Chemical News & Guides" />
            </h2>
            <p>
              <EditableText id="home_blog_desc" defaultText="Read the latest articles on active surfactant formulations, cleanroom standards, and optimal concentrate dilution protocols." />
            </p>
          </div>

          <div className="blog-grid">
            {recentBlogs.map(blog => (
              <article key={blog.id} className="blog-card" style={{ display: "flex", flexDirection: "column" }}>
                <div className="blog-img-container">
                  <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                </div>
                <div className="blog-content" style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div className="blog-date">{blog.date}</div>
                    <h3 className="blog-title">
                      <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                    </h3>
                    <p className="blog-desc">{blog.desc}</p>
                  </div>
                  <Link to={`/blog/${blog.id}`} className="blog-more-link" style={{ marginTop: "1rem" }}>
                    Read Article <i className="fa-solid fa-arrow-right-long"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <FaqSection />

      {/* 7. Quick Inquiry Form */}
      <section className="section" id="home-inquiry">
        <div className="container" style={{ maxWidth: '750px' }}>
          <div className="quote-form-container" style={{ backgroundColor: 'var(--color-bg-white)', padding: '3rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.75rem', color: 'var(--color-primary)', textAlign: 'center', marginBottom: '0.5rem' }}>Send Us An Inquiry</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', textAlign: 'center', marginBottom: '2rem' }}>
              Have questions about dilution ratios, custom formulations, packaging, or wholesale pricing? Fill out the quick form below.
            </p>

            {statusMsg && (
              <div style={{
                padding: '1rem',
                borderRadius: '4px',
                marginBottom: '1.5rem',
                backgroundColor: statusType === 'success' ? '#def7ec' : '#fde8e8',
                color: statusType === 'success' ? '#03543f' : '#9b1c1c',
                border: `1px solid ${statusType === 'success' ? '#bbf7d0' : '#f8b4b4'}`,
                fontSize: '0.88rem',
                textAlign: 'center'
              }}>
                {statusMsg}
              </div>
            )}

            <form onSubmit={handleSubmitInquiry}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Full Name *</label>
                  <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Business Email *</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Company Name</label>
                  <input type="text" className="form-control" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Ltd." />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Product Area of Interest *</label>
                <select className="form-control" value={productInterest} onChange={(e) => setProductInterest(e.target.value)}>
                  <option value="Home Care Concentrates">Home Care Concentrates</option>
                  <option value="Laundry Care Concentrates">Laundry Care Concentrates</option>
                  <option value="Kitchen Care Concentrates">Kitchen Care Concentrates</option>
                  <option value="Floor Care Concentrates">Floor Care Concentrates</option>
                  <option value="Bathroom Care Concentrates">Bathroom Care Concentrates</option>
                  <option value="Personal Care Concentrates">Personal Care Concentrates</option>
                  <option value="Chlorine Dioxide (ClO2)">Chlorine Dioxide (ClO2)</option>
                  <option value="OEM Private Label Blending">OEM Private Label Blending</option>
                  <option value="Other / General Query">Other / General Query</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message Details *</label>
                <textarea rows="4" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your required quantities, packaging, and specific requirements..." required></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', borderRadius: '30px', padding: '0.8rem 0' }}>
                Send Bulk Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={selectedProductQuote}
      />
    </div>
  );
}
