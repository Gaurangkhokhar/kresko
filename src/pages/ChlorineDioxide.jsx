import React, { useState } from 'react';
import { saveEnquiry } from '../utils/storage';

// ─────────────────────────────────────────────────────────────
// Internet-hosted imagery (Unsplash CDN). If any remote image fails,
// it gracefully falls back to a bundled local image so the layout
// never breaks offline or behind restrictive firewalls.
// ─────────────────────────────────────────────────────────────
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=70`;
const LOCAL_FALLBACK = '/images/clo2_solutions_bg.png';

const Img = ({ src, alt, style }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    onError={(e) => {
      const el = e.currentTarget;
      if (!el.dataset.fb) { el.dataset.fb = '1'; el.src = LOCAL_FALLBACK; }
      else { el.style.display = 'none'; }
    }}
  />
);

// Section banner images
const IMG_BANNER = {
  overview: u('photo-1581094794329-c8112a89af12'),
  introduction: u('photo-1532187863486-abf9dbad1b69'),
  process: u('photo-1576086213369-97a306d36557'),
  benefits: u('photo-1581093588401-fbb62a02f120'),
  safety: u('photo-1581091226825-a6a2a5aee158'),
  products: u('photo-1504328345606-18bbc8c9d7d1'),
  applications: u('photo-1466611653911-95081537e5b7')
};

// ─────────────────────────────────────────────────────────────
// PRODUCTS — six premium ClO₂ product lines
// ─────────────────────────────────────────────────────────────
export const CLO2_PRODUCTS = [
  {
    id: 'clo2-liquid',
    name: 'Chlorine Dioxide Liquid',
    tagline: 'Reliable Water Treatment & Disinfection Solution',
    image: u('photo-1602143407151-7111542de6e8'),
    desc: [
      'KRESKO Chlorine Dioxide Liquid is a high-performance oxidizing disinfectant formulated for superior microbial control in drinking water, wastewater, industrial process water, cooling towers, food processing facilities, healthcare institutions, and commercial sanitation applications.',
      'Designed for consistent performance, the solution rapidly destroys bacteria, viruses, fungi, algae, and biofilms while helping improve water quality, reduce unpleasant odors, and control organic contaminants. Its powerful oxidation mechanism allows effective disinfection without the disadvantages associated with conventional chlorine treatment.',
      'Whether used in municipal water systems or industrial processing plants, Chlorine Dioxide Liquid provides reliable, efficient, and environmentally responsible disinfection.'
    ],
    advantages: ['Rapid microbial control', 'Excellent biofilm removal', 'Effective over a wide pH range', 'Controls odor and taste', 'Improves water quality', 'Easy dosing and application', 'Suitable for continuous treatment', 'Lower chemical consumption'],
    applications: ['Drinking Water Treatment', 'Wastewater Treatment', 'Cooling Towers', 'Food Processing Plants', 'Pharmaceutical Industry', 'Hospitals', 'Industrial Water Systems', 'Surface & Equipment Disinfection'],
    industries: 'Municipal Water • Food & Beverage • Healthcare • Pharmaceuticals • Hotels • Manufacturing • Agriculture • Aquaculture'
  },
  {
    id: 'clo2-tablets',
    name: 'Chlorine Dioxide Tablets',
    tagline: 'Portable & Easy-to-Use Water Disinfection',
    image: u('photo-1584308666744-24d5c474f2ae'),
    desc: [
      'KRESKO Chlorine Dioxide Tablets provide a convenient method of preparing Chlorine Dioxide solutions for water treatment and sanitation. The tablets dissolve quickly in water to produce an effective disinfectant suitable for drinking water, emergency response, field operations, healthcare, hospitality, and commercial hygiene.',
      'Their compact design, accurate dosage, and long shelf life make them ideal where portability and ease of handling are essential.'
    ],
    advantages: ['Ready-to-use tablets', 'Accurate dosage', 'Fast dissolving', 'Long shelf life', 'Portable solution', 'Easy transportation', 'Minimal storage space'],
    applications: ['Emergency Water Treatment', 'Portable Drinking Water', 'Hotels & Resorts', 'Hospitals', 'Disaster Relief', 'Camping & Outdoor Activities', 'Food Industry']
  },
  {
    id: 'clo2-powder',
    name: 'Chlorine Dioxide Powder',
    tagline: 'Concentrated Solution for Industrial Applications',
    image: u('photo-1615485500704-8e990f9900f7'),
    desc: [
      'KRESKO Chlorine Dioxide Powder is a concentrated formulation developed for large-scale water treatment and industrial disinfection. It offers flexible preparation, easy transportation, and economical storage while delivering excellent oxidation performance across a wide range of industrial processes.',
      'It is particularly suitable for applications requiring customized solution strengths and bulk treatment.'
    ],
    advantages: ['High concentration', 'Cost-effective', 'Easy storage', 'Long shelf life', 'Flexible preparation', 'Industrial-grade quality'],
    applications: ['Industrial Water Treatment', 'Municipal Water Plants', 'Cooling Towers', 'Textile Industry', 'Paper & Pulp', 'Chemical Processing', 'Wastewater Treatment']
  },
  {
    id: 'clo2-gel',
    name: 'Chlorine Dioxide Gel',
    tagline: 'Long-Lasting Odor Control & Air Hygiene',
    image: u('photo-1585652757141-8837d676fac8'),
    desc: [
      'KRESKO Chlorine Dioxide Gel provides controlled release of Chlorine Dioxide for continuous odor elimination and microbial control. It is ideal for enclosed spaces where maintaining a clean and hygienic environment is essential.',
      'The slow-release technology ensures extended performance without requiring electrical equipment or frequent maintenance.'
    ],
    advantages: ['Continuous release', 'Long-lasting performance', 'Eliminates unpleasant odors', 'Controls airborne microorganisms', 'Easy placement', 'Maintenance-free'],
    applications: ['Hospitals', 'Washrooms', 'Offices', 'Hotels', 'Cold Storage', 'Commercial Buildings', 'Waste Rooms']
  },
  {
    id: 'clo2-sachets',
    name: 'Chlorine Dioxide Sachets',
    tagline: 'Convenient Single-Dose Disinfection',
    image: u('photo-1631549916768-4119b2e5f926'),
    desc: [
      'KRESKO Chlorine Dioxide Sachets offer a practical solution for preparing Chlorine Dioxide wherever fast and reliable disinfection is required. Each sachet contains a pre-measured quantity, ensuring accurate preparation without additional measuring equipment.',
      'They are widely used in remote locations, emergency situations, portable water treatment, and routine sanitation.'
    ],
    advantages: ['Pre-measured dosage', 'Portable packaging', 'Quick preparation', 'Easy handling', 'Accurate concentration', 'Long shelf life'],
    applications: ['Drinking Water', 'Emergency Relief', 'Rural Water Supply', 'Healthcare', 'Hotels', 'Industrial Maintenance']
  },
  {
    id: 'clo2-generator',
    name: 'Chlorine Dioxide Generator',
    tagline: 'Advanced On-Site Chlorine Dioxide Generation Systems',
    image: u('photo-1581091870622-fde6c29d9dcd'),
    desc: [
      'KRESKO Chlorine Dioxide Generators are engineered to produce fresh Chlorine Dioxide on demand for continuous industrial and municipal water treatment. These automated systems provide accurate dosing, reliable performance, and reduced chemical storage requirements.',
      'Suitable for high-capacity operations, they help improve treatment efficiency while reducing operating costs.'
    ],
    advantages: ['On-site generation', 'Continuous production', 'Automated operation', 'Precise dosing', 'Low maintenance', 'High operational reliability'],
    applications: ['Municipal Water Plants', 'Industrial Water Treatment', 'Cooling Towers', 'Pharmaceutical Industry', 'Food Processing', 'Power Plants', 'Large Manufacturing Facilities']
  }
];

// ─────────────────────────────────────────────────────────────
// APPLICATIONS — eight key application sectors
// ─────────────────────────────────────────────────────────────
export const CLO2_APPLICATIONS = [
  { id: 'app-drinking-water', icon: 'fa-glass-water-droplet', title: 'Drinking Water Treatment', tagline: 'Safe & Reliable Water Disinfection',
    desc: 'Chlorine Dioxide is widely used for drinking water treatment due to its exceptional ability to eliminate harmful microorganisms while preserving water quality. It effectively controls bacteria, viruses, algae, and biofilm without producing significant chlorinated by-products, making it a preferred solution for municipal and commercial water systems.',
    image: u('photo-1548839140-29a749e1cf4d'),
    items: ['Municipal Water Treatment Plants', 'Residential Water Supply', 'Water Storage Tanks', 'Schools & Institutions', 'Hotels & Commercial Buildings'] },
  { id: 'app-wastewater', icon: 'fa-droplet-slash', title: 'Wastewater Treatment', tagline: 'Efficient Wastewater Management',
    desc: 'Chlorine Dioxide improves wastewater treatment by reducing microbial contamination, eliminating odors, and oxidizing organic pollutants. It helps treatment plants achieve better operational efficiency while supporting environmental compliance.',
    image: u('photo-1471193945509-9ad0617afabf'),
    items: ['Sewage Treatment Plants (STP)', 'Effluent Treatment Plants (ETP)', 'Industrial Wastewater', 'Municipal Wastewater', 'Sludge Treatment'] },
  { id: 'app-food-beverage', icon: 'fa-apple-whole', title: 'Food & Beverage', tagline: 'Maintaining the Highest Hygiene Standards',
    desc: 'Food safety begins with effective sanitation. Chlorine Dioxide is used throughout the food and beverage industry to disinfect processing equipment, wash water, storage areas, and production facilities, helping reduce contamination risks while maintaining product quality.',
    image: u('photo-1504674900247-0877df9cc836'),
    items: ['Fruit & Vegetable Processing', 'Dairy Industry', 'Beverage Manufacturing', 'Meat & Poultry Processing', 'Seafood Processing', 'Food Processing Plants'] },
  { id: 'app-aquaculture', icon: 'fa-fish', title: 'Aquaculture', tagline: 'Healthy Water for Sustainable Aquaculture',
    desc: 'Maintaining clean water is essential for healthy fish and shrimp production. Chlorine Dioxide helps control harmful microorganisms, algae, and biofilm, creating a healthier aquatic environment and reducing the risk of disease outbreaks.',
    image: u('photo-1524704796725-9fc3044a58b2'),
    items: ['Fish Farms', 'Shrimp Farms', 'Hatcheries', 'Aquaculture Ponds', 'Water Reservoirs'] }
];

export const CLO2_APPLICATIONS_B = [
  { id: 'app-healthcare', icon: 'fa-hospital', title: 'Healthcare & Hospitals', tagline: 'Advanced Infection Prevention',
    desc: 'Hospitals and healthcare facilities require reliable disinfection solutions to maintain safe environments. Chlorine Dioxide is used for water system treatment, equipment sanitation, and environmental hygiene to support infection prevention and improve overall healthcare safety.',
    image: u('photo-1519494026892-80bbd2d6fd0d'),
    items: ['Hospitals', 'Clinics', 'Laboratories', 'Healthcare Facilities', 'Medical Equipment Areas'] },
  { id: 'app-cooling-towers', icon: 'fa-fan', title: 'Cooling Towers', tagline: 'Biofilm & Legionella Control',
    desc: 'Cooling towers are susceptible to bacterial growth, algae, and biofilm formation. Chlorine Dioxide provides effective microbial control, helping improve system efficiency, reduce maintenance, and protect equipment from biological contamination.',
    image: u('photo-1466611653911-95081537e5b7'),
    items: ['Industrial Cooling Towers', 'HVAC Systems', 'Power Plants', 'Manufacturing Facilities', 'Commercial Buildings'] },
  { id: 'app-industrial-water', icon: 'fa-industry', title: 'Industrial Water Treatment', tagline: 'Optimizing Industrial Water Systems',
    desc: 'Industrial water systems require consistent treatment to maintain operational efficiency and equipment reliability. Chlorine Dioxide helps control biological growth, reduce fouling, and improve overall water quality across a wide range of industries.',
    image: u('photo-1581092160562-40aa08e78837'),
    items: ['Chemical Industry', 'Pharmaceutical Industry', 'Textile Industry', 'Paper & Pulp Industry', 'Manufacturing Plants', 'Process Water Systems'] },
  { id: 'app-surface-disinfection', icon: 'fa-pump-soap', title: 'Surface & Equipment Disinfection', tagline: 'Reliable Sanitation for Critical Environments',
    desc: 'Chlorine Dioxide is an effective solution for disinfecting surfaces, production equipment, and work environments. Its broad-spectrum antimicrobial action helps maintain hygienic conditions in industries where cleanliness and contamination control are essential.',
    image: u('photo-1584722065001-05a97b4677a8'),
    items: ['Food Processing Equipment', 'Pharmaceutical Facilities', 'Warehouses', 'Commercial Kitchens', 'Packaging Units', 'Manufacturing Plants', 'Cold Storage Facilities', 'Laboratories'] }
];

// ─────────────────────────────────────────────────────────────
// FAQS
// ─────────────────────────────────────────────────────────────
const FAQS = [
  { q: 'What is Chlorine Dioxide used for?', a: 'Chlorine Dioxide is used for drinking water treatment, wastewater treatment, food processing sanitation, healthcare disinfection, industrial water treatment, cooling towers, aquaculture, pharmaceutical manufacturing, and surface disinfection.' },
  { q: 'Is Chlorine Dioxide better than chlorine?', a: 'Yes. Chlorine Dioxide generally provides faster microbial control, superior biofilm removal, improved odor control, and produces fewer harmful chlorinated by-products than conventional chlorine in many applications.' },
  { q: 'Is Chlorine Dioxide safe for drinking water?', a: 'When used at approved concentrations and in accordance with applicable regulations, Chlorine Dioxide is widely used around the world for municipal drinking water disinfection.' },
  { q: 'Does Chlorine Dioxide remove bad odors?', a: 'Yes. It effectively oxidizes odor-causing compounds such as hydrogen sulfide, ammonia, phenols, and other organic contaminants, improving both water and air quality.' },
  { q: 'Can Chlorine Dioxide remove biofilm?', a: 'Yes. One of its major advantages is its ability to penetrate and destroy biofilms that protect bacteria inside pipelines, tanks, cooling towers, and industrial water systems.' },
  { q: 'Which industries commonly use Chlorine Dioxide?', a: 'Municipal Water Treatment, Food & Beverage Processing, Pharmaceutical Manufacturing, Healthcare & Hospitals, Hotels & Hospitality, Cooling Towers, Paper & Pulp, Textile Industry, Chemical Manufacturing, Aquaculture, Agriculture, and Industrial Water Treatment.' },
  { q: 'Does Chlorine Dioxide work in hard water?', a: 'Yes. Chlorine Dioxide remains effective in a wide range of water qualities, including hard water and water containing organic matter.' },
  { q: 'What documents are available with KRESKO products?', a: 'Depending on the product and application, KRESKO can provide Technical Data Sheet (TDS), Safety Data Sheet (SDS/MSDS), Certificate of Analysis (COA), Product Specifications, Application Guidelines, and Technical Support Documentation.' }
];

export default function ChlorineDioxide() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('We are requesting technical data sheets, certifications, and packing size rates for Kresko Chlorine Dioxide (ClO2) concentrates.');
  const [statusMsg, setStatusMsg] = useState('');
  const [statusType, setStatusType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMsg('');
    setStatusType('');
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatusType('error');
      setStatusMsg('Please fill out all required fields.');
      return;
    }
    saveEnquiry({ name: name.trim(), email: email.trim(), phone: phone.trim(), company: 'Chlorine Dioxide Inquiry', machineType: 'Chlorine Dioxide (ClO2)', message: message.trim() });
    setStatusType('success');
    setStatusMsg('Thank you! Your Chlorine Dioxide spec request has been recorded. Our technical team will email the chemical safety details and rates shortly.');
    setName(''); setEmail(''); setPhone('');
  };

  return (
    <div>
      {/* ══ 1. HERO / OVERVIEW ══ */}
      <section id="overview" className="split-hero-section" style={{ backgroundImage: `linear-gradient(135deg, rgba(11,19,41,0.94) 0%, rgba(26,42,74,0.94) 100%), url('${IMG_BANNER.overview}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container">
          <div className="split-hero-grid">
            <div>
              <span className="hero-pill-badge"><i className="fa-solid fa-shield-virus"></i> High-Efficacy Disinfection</span>
              <h1 className="hero-title-main">Chlorine Dioxide (ClO₂) Solutions</h1>
              <p className="hero-subtitle-main">
                Eco-friendly, highly selective oxidant and sanitizer for water purification, food safety, and industrial sterilization.
              </p>
              <div className="hero-bullets-box">
                <div className="hero-bullet-row"><i className="fa-solid fa-circle-check hero-bullet-icon"></i><span><strong>Broad Spectrum:</strong> Highly effective against bacteria, viruses, fungi, and spores.</span></div>
                <div className="hero-bullet-row"><i className="fa-solid fa-circle-check hero-bullet-icon"></i><span><strong>Safe & Eco-Friendly:</strong> Breaks down into harmless byproducts (no toxic residues).</span></div>
                <div className="hero-bullet-row"><i className="fa-solid fa-circle-check hero-bullet-icon"></i><span><strong>High Stability:</strong> Advanced formulation with longer shelf life and consistent dosage.</span></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#enquire" className="btn btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-envelope"></i> Request TDS Sheets</a>
                <a href="#products" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}><i className="fa-solid fa-flask"></i> Explore Products</a>
              </div>
            </div>
            <div style={{
              borderRadius: '16px', overflow: 'hidden', minHeight: '380px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
              border: '1px solid rgba(255,255,255,0.15)',
              backgroundColor: '#1a2a4a'
            }}>
              <Img
                src="https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1000&q=70"
                alt="Chlorine Dioxide water treatment and disinfection"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. INTRODUCTION ══ */}
      <section id="introduction" className="section" style={{ scrollMarginTop: '110px' }}>
        <div className="container">
          <div className="section-header">
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-accent)' }}>Introduction</span>
            <h2>What is Chlorine Dioxide?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '340px', boxShadow: 'var(--shadow-md)' }}>
              <Img src={IMG_BANNER.introduction} alt="Chlorine Dioxide laboratory analysis" />
            </div>
            <div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text-main)', marginBottom: '1rem' }}>
                Chlorine Dioxide (ClO₂) is a highly effective oxidizing disinfectant widely used for water treatment, sanitation, and industrial hygiene. Unlike traditional chlorine, Chlorine Dioxide disinfects through <strong>oxidation rather than chlorination</strong>, making it significantly more effective against a broad range of microorganisms while producing fewer harmful disinfection by-products.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text-main)', marginBottom: '1rem' }}>
                It is recognized globally as one of the most powerful and versatile disinfectants for drinking water, wastewater, food processing, healthcare, pharmaceutical manufacturing, cooling towers, aquaculture, and industrial water treatment. Chlorine Dioxide is effective even at low concentrations and maintains excellent performance across a wide pH range.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text-main)' }}>
                One of its key advantages is the ability to eliminate bacteria, viruses, fungi, algae, spores, protozoa, and biofilm without significantly affecting water quality, taste, or odor. It also oxidizes iron, manganese, sulfides, and other contaminants that cause discoloration and unpleasant smells — making it the preferred choice for municipalities, hospitals, hotels, food industries, and commercial establishments worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. KEY FEATURES ══ */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-light)', paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <h3 style={{ textAlign: 'center', color: 'var(--color-primary)', fontSize: '1.5rem', marginBottom: '2rem' }}>Key Features</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {['Powerful oxidizing disinfectant', 'Broad-spectrum antimicrobial activity', 'Effective against bacteria, viruses, fungi, and algae', 'Excellent biofilm penetration and removal', 'Wide pH operating range (approx. pH 4–10)', 'Minimal formation of harmful chlorinated by-products', 'Effective odor and taste control', 'Suitable for continuous or batch treatment systems', 'Lower dosage requirements vs conventional disinfectants', 'Environmentally responsible treatment option'].map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', backgroundColor: '#fff', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0.9rem 1.1rem' }}>
                <i className="fa-solid fa-circle-check" style={{ color: 'var(--color-accent)', fontSize: '0.9rem' }}></i>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. HOW IT WORKS ══ */}
      <section id="how-it-works" className="section" style={{ scrollMarginTop: '110px' }}>
        <div className="container">
          <div className="section-header">
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-accent)' }}>Advanced Oxidation Technology</span>
            <h2>How Chlorine Dioxide Works</h2>
          </div>
          <p style={{ maxWidth: '850px', margin: '0 auto 3rem auto', textAlign: 'center', fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text-muted)' }}>
            Chlorine Dioxide works through a selective oxidation process, destroying harmful microorganisms by disrupting their cellular functions rather than simply attacking the cell wall. This mechanism rapidly inactivates bacteria, viruses, fungi, and other pathogens while minimizing the risk of microbial resistance. Unlike chlorine, ClO₂ remains highly effective even in water containing organic matter and across varying pH levels — penetrating protective biofilms inside pipelines, storage tanks, cooling towers, and industrial equipment.
          </p>

          {/* The 5-Step Disinfection Process */}
          <h3 style={{ textAlign: 'center', color: 'var(--color-primary)', fontSize: '1.35rem', marginBottom: '2rem' }}>The Disinfection Process</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {[
              { n: '01', icon: 'fa-hand-holding-droplet', title: 'Contact', desc: 'ClO₂ is introduced into contaminated water, processing systems, or onto surfaces requiring disinfection.' },
              { n: '02', icon: 'fa-arrows-to-dot', title: 'Penetration', desc: 'Molecules quickly penetrate microbial cell walls and biofilms, reaching the internal structure of microorganisms.' },
              { n: '03', icon: 'fa-bolt', title: 'Oxidation', desc: 'ClO₂ oxidizes essential proteins, enzymes, and amino acids required for microbial survival and reproduction.' },
              { n: '04', icon: 'fa-virus-slash', title: 'Inactivation', desc: 'Microorganisms lose their ability to function and reproduce — rapid and permanent destruction.' },
              { n: '05', icon: 'fa-leaf', title: 'Clean Environment', desc: 'Treated water or surfaces become significantly safer with reduced microbes, controlled odors, and improved hygiene.' }
            ].map((s) => (
              <div key={s.n} style={{ position: 'relative', backgroundColor: '#fff', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1.75rem 1.4rem 1.4rem', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ position: 'absolute', top: '-14px', right: '14px', backgroundColor: 'var(--color-accent)', color: '#fff', fontWeight: 900, fontSize: '0.8rem', padding: '0.25rem 0.65rem', borderRadius: '20px' }}>{s.n}</span>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', marginBottom: '1rem' }}>
                  <i className={`fa-solid ${s.icon}`}></i>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Step – {s.title}</h4>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--color-text-muted)', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. EFFECTIVE AGAINST ══ */}
      <section className="section" style={{ backgroundColor: '#0f2140', color: '#fff', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#7dd3fc', display: 'block', marginBottom: '0.5rem' }}>Broad-Spectrum Efficacy</span>
            <h2 style={{ color: '#fff' }}>Effective Against</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: 'fa-bacterium', title: 'Bacteria', items: ['E. coli', 'Salmonella', 'Legionella', 'Listeria', 'Pseudomonas', 'Vibrio species'] },
              { icon: 'fa-virus', title: 'Viruses', items: ['Influenza viruses', 'Rotavirus', 'Norovirus', 'Hepatitis viruses', 'Coronavirus family'] },
              { icon: 'fa-seedling', title: 'Fungi & Yeasts', items: ['Aspergillus', 'Candida', 'Common molds', 'Mildew'] },
              { icon: 'fa-water', title: 'Other Microorganisms', items: ['Algae', 'Protozoa', 'Biofilm-forming bacteria', 'Spores', 'Sulfur-producing bacteria'] }
            ].map((g) => (
              <div key={g.title} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '1.75rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '10px', backgroundColor: 'rgba(125,211,252,0.12)', color: '#7dd3fc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', marginBottom: '1rem' }}>
                  <i className={`fa-solid ${g.icon}`}></i>
                </div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.9rem' }}>{g.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {g.items.map((it) => (
                    <li key={it} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.87rem', color: '#cbd5e1', padding: '0.28rem 0' }}>
                      <i className="fa-solid fa-circle-check" style={{ fontSize: '0.72rem', color: '#38bdf8' }}></i> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. BENEFITS ══ */}
      <section id="benefits" className="section" style={{ scrollMarginTop: '110px' }}>
        <div className="container">
          <div className="section-header">
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-accent)' }}>Why Choose Chlorine Dioxide?</span>
            <h2>Benefits</h2>
            <p>Chlorine Dioxide provides several advantages over conventional disinfectants, making it the preferred choice for critical water treatment and sanitation applications.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: 'fa-shield-virus', t: 'Superior Disinfection Performance', d: 'Rapidly eliminates bacteria, viruses, fungi, algae, spores, and other harmful microorganisms with high efficiency.' },
              { icon: 'fa-layer-group', t: 'Effective Biofilm Removal', d: 'Penetrates and destroys biofilms that protect bacteria inside pipelines, cooling towers, storage tanks, and water distribution systems.' },
              { icon: 'fa-flask-vial', t: 'Wide pH Effectiveness', d: 'Maintains consistent disinfection performance across a broad pH range, reducing the need for pH adjustment.' },
              { icon: 'fa-wind', t: 'Excellent Odor Control', d: 'Oxidizes sulfur compounds, ammonia, phenols, and other odor-causing substances to improve water and air quality.' },
              { icon: 'fa-glass-water', t: 'Improved Water Quality', d: 'Helps remove iron, manganese, sulfides, and organic contaminants while improving clarity, taste, and odor.' },
              { icon: 'fa-gauge-high', t: 'Lower Chemical Consumption', d: 'Achieves effective microbial control at relatively low concentrations, reducing overall chemical usage and operational costs.' },
              { icon: 'fa-recycle', t: 'Reduced Harmful By-Products', d: 'Produces significantly fewer chlorinated disinfection by-products than traditional chlorine-based systems.' },
              { icon: 'fa-screwdriver-wrench', t: 'Equipment Protection', d: 'Controls microbiologically influenced corrosion, helping extend the life of industrial equipment and water systems.' },
              { icon: 'fa-earth-asia', t: 'Environmentally Responsible', d: 'Breaks down into environmentally acceptable compounds without leaving long-lasting harmful residues when properly applied.' },
              { icon: 'fa-coins', t: 'Cost-Effective Solution', d: 'Long-term savings through reduced maintenance, lower downtime, improved operational efficiency, and enhanced process reliability.' }
            ].map((b) => (
              <div key={b.t} style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1.6rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.15rem', marginBottom: '1rem' }}>
                  <i className={`fa-solid ${b.icon}`}></i>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{b.t}</h4>
                <p style={{ fontSize: '0.86rem', lineHeight: 1.65, color: 'var(--color-text-muted)', margin: 0 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. SAFETY INFORMATION ══ */}
      <section id="safety" className="section" style={{ backgroundColor: 'var(--color-bg-light)', scrollMarginTop: '110px' }}>
        <div className="container">
          <div className="section-header">
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-accent)' }}>Safe Handling Guidelines</span>
            <h2>Safety Information</h2>
            <p>While Chlorine Dioxide is highly effective, it should always be handled responsibly and according to established safety practices. Proper storage, handling, and application help ensure maximum performance while protecting personnel and equipment.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: 'fa-helmet-safety', title: 'Personal Protective Equipment (PPE)', items: ['Chemical-resistant gloves', 'Safety goggles or face shield', 'Protective clothing', 'Safety footwear', 'Respiratory protection where ventilation is inadequate'] },
              { icon: 'fa-warehouse', title: 'Storage Recommendations', items: ['Store in a cool, dry, and well-ventilated area', 'Keep containers tightly closed when not in use', 'Protect from direct sunlight and excessive heat', 'Avoid freezing temperatures unless specified', 'Store away from incompatible chemicals, acids, reducing agents, and combustibles'] },
              { icon: 'fa-hand-holding-hand', title: 'Handling Precautions', items: ['Follow recommended dosage instructions', 'Avoid direct skin and eye contact', 'Do not inhale concentrated vapors', 'Use only in well-ventilated areas', 'Never mix with incompatible chemicals', 'Use dedicated dosing equipment', 'Wash hands thoroughly after handling'] },
              { icon: 'fa-broom', title: 'Spill Management', items: ['Isolate the affected area', 'Wear appropriate PPE', 'Absorb the spill using suitable inert materials', 'Dispose of waste per local environmental regulations', 'Prevent discharge into natural water bodies unless authorized'] }
            ].map((s) => (
              <div key={s.title} style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                    <i className={`fa-solid ${s.icon}`}></i>
                  </div>
                  <h4 style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>{s.title}</h4>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {s.items.map((it) => (
                    <li key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.86rem', color: 'var(--color-text-muted)', padding: '0.3rem 0', lineHeight: 1.5 }}>
                      <i className="fa-solid fa-circle-check" style={{ fontSize: '0.72rem', color: 'var(--color-accent)', marginTop: '0.3rem' }}></i> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Emergency Measures */}
          <div style={{ marginTop: '2rem', backgroundColor: '#fff', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-accent)', borderRadius: '10px', padding: '2rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-primary)', fontSize: '1.15rem', marginBottom: '1.2rem' }}>
              <i className="fa-solid fa-truck-medical" style={{ color: 'var(--color-accent)' }}></i> Emergency Measures
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {[
                { t: 'Eye Contact', d: 'Rinse immediately with clean water for at least 15 minutes and seek medical attention.' },
                { t: 'Skin Contact', d: 'Wash thoroughly with soap and water. Remove contaminated clothing.' },
                { t: 'Inhalation', d: 'Move the affected person to fresh air. Seek medical attention if symptoms persist.' },
                { t: 'Ingestion', d: 'Do not induce vomiting. Seek immediate medical assistance.' }
              ].map((em) => (
                <div key={em.t}>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-primary)', marginBottom: '0.3rem' }}>{em.t}</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{em.d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Safety Notes */}
          <div style={{ marginTop: '1.5rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1.5rem 2rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#9b1c1c', fontSize: '1rem', marginBottom: '0.8rem' }}>
              <i className="fa-solid fa-triangle-exclamation"></i> Important Safety Notes
            </h4>
            <p style={{ fontSize: '0.87rem', color: '#7f1d1d', lineHeight: 1.7, margin: 0 }}>
              Always follow local regulations and recommended application guidelines. Refer to the latest Safety Data Sheet (SDS/MSDS) before use. Keep out of reach of children and unauthorized personnel. Use only trained personnel for industrial applications.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 8. PRODUCTS ══ */}
      <section id="products" className="section" style={{ backgroundColor: '#0f2140', scrollMarginTop: '110px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#7dd3fc', display: 'block', marginBottom: '0.5rem' }}>2. Products</span>
            <h2 style={{ color: '#fff' }}>Chlorine Dioxide Product Range</h2>
            <p style={{ color: '#94a3b8', maxWidth: '720px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Premium, content-rich formulations engineered for reliable performance across municipal, industrial, commercial, and healthcare environments.
            </p>
          </div>

          {CLO2_PRODUCTS.map((p, idx) => (
            <div key={p.id} style={{ backgroundColor: '#fff', borderRadius: '14px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', marginBottom: idx < CLO2_PRODUCTS.length - 1 ? '2.5rem' : 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                <div style={{ minHeight: '300px', backgroundColor: '#e2e8f0' }}>
                  <Img src={p.image} alt={p.name} />
                </div>
                <div style={{ padding: '2.5rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-accent)', backgroundColor: 'rgba(220,38,38,0.07)', padding: '0.3rem 0.75rem', borderRadius: '20px', display: 'inline-block', marginBottom: '0.9rem' }}>
                    KRESKO ClO₂
                  </span>
                  <h3 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1.25, marginBottom: '0.35rem' }}>{p.name}</h3>
                  <p style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '1.1rem' }}>{p.tagline}</p>
                  {p.desc.map((d, i) => (
                    <p key={i} style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>{d}</p>
                  ))}
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--color-border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                <div style={{ padding: '1.75rem 2.5rem', borderRight: '1px solid var(--color-border)' }}>
                  <h5 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-primary)', marginBottom: '0.9rem' }}>
                    <i className="fa-solid fa-star" style={{ color: 'var(--color-accent)', marginRight: '0.4rem' }}></i>Key Advantages
                  </h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {p.advantages.map((a) => (
                      <span key={a} style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-main)', backgroundColor: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '20px', padding: '0.3rem 0.8rem' }}>{a}</span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '1.75rem 2.5rem' }}>
                  <h5 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-primary)', marginBottom: '0.9rem' }}>
                    <i className="fa-solid fa-list-check" style={{ color: 'var(--color-accent)', marginRight: '0.4rem' }}></i>Typical Applications
                  </h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {p.applications.map((a) => (
                      <span key={a} style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-main)', backgroundColor: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '20px', padding: '0.3rem 0.8rem' }}>{a}</span>
                    ))}
                  </div>
                  {p.industries && (
                    <p style={{ marginTop: '1.1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                      <strong style={{ color: 'var(--color-primary)' }}>Industries Served:</strong> {p.industries}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 9. APPLICATIONS ══ */}
      <section id="applications" className="section" style={{ scrollMarginTop: '110px' }}>
        <div className="container">
          <div className="section-header">
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-accent)' }}>3. Applications</span>
            <h2>Chlorine Dioxide Applications</h2>
            <p>Chlorine Dioxide is one of the most versatile and effective disinfectants available today. Its powerful oxidation properties make it suitable for a wide range of industries where microbial control, water purification, odor removal, and sanitation are critical. KRESKO Chlorine Dioxide solutions deliver reliable performance across municipal, industrial, commercial, and healthcare environments.</p>
          </div>

          {[...CLO2_APPLICATIONS, ...CLO2_APPLICATIONS_B].map((app, i) => (
            <div key={app.id} id={app.id} style={{ scrollMarginTop: '110px', marginBottom: i < 7 ? '2.5rem' : 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center', backgroundColor: i % 2 === 0 ? 'var(--color-bg-light)' : '#fff', borderRadius: '14px', padding: '2rem', border: '1px solid var(--color-border)' }}>
                <div style={{ order: i % 2 === 0 ? 1 : 2, borderRadius: '12px', overflow: 'hidden', height: '260px', boxShadow: 'var(--shadow-sm)' }}>
                  <Img src={app.image} alt={app.title} />
                </div>
                <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                      <i className={`fa-solid ${app.icon}`}></i>
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-primary)', margin: 0 }}>{app.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '0.8rem' }}>{app.tagline}</p>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--color-text-muted)', marginBottom: '1.1rem' }}>{app.desc}</p>
                  <h5 style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-primary)', marginBottom: '0.7rem' }}>Applications</h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {app.items.map((it) => (
                      <span key={it} style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-main)', backgroundColor: '#fff', border: '1px solid var(--color-border)', borderRadius: '20px', padding: '0.3rem 0.85rem' }}>{it}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 10. DOCUMENTATION / CERTIFICATIONS ══ */}
      <section id="certifications" className="section" style={{ backgroundColor: 'var(--color-bg-light)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', scrollMarginTop: '110px' }}>
        <div className="container">
          <div className="section-header">
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-accent)' }}>Full Technical Support</span>
            <h2>Documentation Support</h2>
            <p>Every KRESKO Chlorine Dioxide consignment is backed by complete technical documentation for regulatory compliance and traceability.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { icon: 'fa-file-circle-check', t: 'COA', d: 'Certificate of Analysis' },
              { icon: 'fa-file-lines', t: 'TDS', d: 'Technical Data Sheet' },
              { icon: 'fa-file-shield', t: 'SDS / MSDS', d: 'Safety Data Sheet' },
              { icon: 'fa-clipboard-list', t: 'Test Report', d: 'Product Test Report' }
            ].map((doc) => (
              <div key={doc.t} style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1.5rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <i className={`fa-solid ${doc.icon}`} style={{ fontSize: '1.8rem', color: 'var(--color-accent)', marginBottom: '0.75rem', display: 'block' }}></i>
                <strong style={{ display: 'block', color: 'var(--color-primary)', fontSize: '1rem', marginBottom: '0.25rem' }}>{doc.t}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{doc.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 11. FAQS ══ */}
      <section id="faqs" className="section" style={{ scrollMarginTop: '110px' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers about ClO₂ safety, dosing, and applications for industrial buyers.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQS.map((faq) => (
              <details key={faq.q} style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1.1rem 1.4rem', boxShadow: 'var(--shadow-sm)' }}>
                <summary style={{ fontWeight: 800, color: 'var(--color-primary)', cursor: 'pointer', fontSize: '0.95rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.q}
                  <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.75rem', color: 'var(--color-accent)' }}></i>
                </summary>
                <p style={{ marginTop: '0.85rem', fontSize: '0.88rem', lineHeight: '1.7', color: 'var(--color-text-muted)' }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 12. INQUIRY FORM ══ */}
      <section id="enquire" className="section" style={{ backgroundColor: 'var(--color-bg-light)', scrollMarginTop: '110px' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <div className="quote-form-container" style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.75rem', color: 'var(--color-primary)', textAlign: 'center', marginBottom: '0.5rem' }}>Request Chlorine Dioxide Quote</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', textAlign: 'center', marginBottom: '2rem' }}>Please fill out the form below. Our technical directors will send pricing sheets and TDS analysis parameters.</p>

            {statusMsg && (
              <div style={{ padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', backgroundColor: statusType === 'success' ? '#def7ec' : '#fde8e8', color: statusType === 'success' ? '#03543f' : '#9b1c1c', border: `1px solid ${statusType === 'success' ? '#bbf7d0' : '#f8b4b4'}`, fontSize: '0.88rem', textAlign: 'center' }}>
                {statusMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Business Email *</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea rows="4" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', borderRadius: '30px', padding: '0.8rem 0' }}>
                Submit ClO₂ Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
