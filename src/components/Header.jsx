import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import QuoteModal from './QuoteModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Mobile accordion state managers
  const [openMenu, setOpenMenu] = useState(null); // Which dropdown is expanded on mobile

  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownForceClose, setDropdownForceClose] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menus on route shift
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenMenu(null);
  }, [location]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setOpenMenu(null);
    setDropdownForceClose(true); // Force close desktop dropdown on click
  };

  // Reset submenus when hamburger collapses/opens
  useEffect(() => {
    if (!isMenuOpen) {
      setOpenMenu(null);
    }
  }, [isMenuOpen]);

  const handleMobileToggle = (key, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenu(openMenu === key ? null : key);
  };

  // Chlorine Dioxide single-page anchor navigation. If already on the
  // /chlorine-dioxide route we scroll straight to the section; otherwise we
  // navigate there first and scroll once the page has rendered.
  const handleSectionClick = (target) => {
    setIsMenuOpen(false);
    setOpenMenu(null);
    setDropdownForceClose(true);

    const doScroll = () => {
      const el = document.getElementById(target);
      if (el) {
        const header = document.querySelector('.site-header');
        const offset = header ? header.getBoundingClientRect().height + 16 : 90;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    if (location.pathname === '/chlorine-dioxide') {
      doScroll();
    } else {
      navigate('/chlorine-dioxide');
      setTimeout(doScroll, 150);
    }
  };

  // Single-page dropdown navigation structure (anchor targets on /chlorine-dioxide)
  const navMenus = [
    {
      key: 'chlorine',
      label: 'Chlorine Dioxide',
      path: '/chlorine-dioxide',
      items: [
        { label: 'Overview', target: 'overview' },
        { label: 'What is ClO2?', target: 'introduction' },
        { label: 'Key Features', target: 'benefits' },
        { label: 'Certifications', target: 'certifications' }
      ]
    },
    {
      key: 'introduction',
      label: 'Introduction',
      path: '/chlorine-dioxide',
      items: [
        { label: 'Overview', target: 'overview' },
        { label: 'How It Works', target: 'how-it-works' },
        { label: 'Benefits', target: 'benefits' },
        { label: 'Safety Information', target: 'safety' },
        { label: 'FAQs', target: 'faqs' }
      ]
    },
    {
      key: 'products',
      label: 'Products',
      path: '/chlorine-dioxide',
      items: [
        { label: 'Chlorine Dioxide Liquid', target: 'products-liquid' },
        { label: 'Chlorine Dioxide Tablets', target: 'products-tablets' },
        { label: 'Chlorine Dioxide Powder', target: 'products-powder' },
        { label: 'Chlorine Dioxide Gel', target: 'products-gel' },
        { label: 'Chlorine Dioxide Sachets', target: 'products-sachets' },
        { label: 'Chlorine Dioxide Generator', target: 'products-generator' }
      ]
    },
    {
      key: 'applications',
      label: 'Applications',
      path: '/chlorine-dioxide',
      items: [
        { label: 'Drinking Water Treatment', target: 'app-drinking-water' },
        { label: 'Wastewater Treatment', target: 'app-wastewater' },
        { label: 'Food & Beverage', target: 'app-food-beverage' },
        { label: 'Aquaculture', target: 'app-aquaculture' },
        { label: 'Healthcare & Hospitals', target: 'app-healthcare' },
        { label: 'Cooling Towers', target: 'app-cooling-towers' },
        { label: 'Industrial Water Treatment', target: 'app-industrial-water' },
        { label: 'Surface & Equipment Disinfection', target: 'app-surface-disinfection' }
      ]
    }
  ];

  return (
    <>
      {/* 1. Desktop Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <i className="fa-solid fa-phone" style={{ color: 'var(--color-accent)' }}></i>
              Sales: +91 93779 98866
            </span>
            <span className="top-bar-item">
              <i className="fa-solid fa-envelope" style={{ color: 'var(--color-accent)' }}></i>
              kresko.chemicals@gmail.com
            </span>
            <span className="top-bar-item">
              <i className="fa-solid fa-location-dot" style={{ color: 'var(--color-accent)' }}></i>
              Ahmedabad, Gujarat
            </span>
          </div>
          <div className="top-bar-right">
            <a href="https://wa.me/919377998866" target="_blank" rel="noopener noreferrer" style={{ color: '#25d366', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <i className="fa-brands fa-whatsapp"></i> WhatsApp Business Chat
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          {/* Brand Logo */}
          <div className="logo">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }} onClick={handleLinkClick}>
              <img src="/images/kresko_logo.png" alt="Kresko Chemicals Logo" style={{ height: '38px', objectFit: 'contain' }} />
              <span className="logo-text-wrapper" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="logo-text-top" style={{ fontSize: '1.2rem', fontWeight: 950, color: 'var(--color-primary)', letterSpacing: '0.4px', lineHeight: '1.1' }}>
                  KRESKO
                </span>
                <span className="logo-text-bottom" style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--color-accent)', letterSpacing: '0.8px', lineHeight: '1', marginTop: '1px', textTransform: 'uppercase' }}>
                  CHEMICALS
                </span>
              </span>
            </Link>
          </div>

          {/* Navigation Links Menu - Chlorine Dioxide single-page dropdowns */}
          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {navMenus.map((menu) => (
              <div
                key={menu.key}
                className={`nav-dropdown-wrapper ${dropdownForceClose ? 'force-hide-dropdown' : ''}`}
                onMouseEnter={() => setDropdownForceClose(false)}
                onMouseLeave={() => setDropdownForceClose(false)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <NavLink
                    to={menu.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleSectionClick(menu.items[0].target)}
                    end={true}
                  >
                    {menu.label}
                  </NavLink>
                  <button
                    className="dropdown-toggle-arrow"
                    onClick={(e) => handleMobileToggle(menu.key, e)}
                    style={{ display: 'inline-block', border: 'none', background: 'none' }}
                    aria-label={`Toggle ${menu.label} Submenu`}
                  >
                    <i className={`fa-solid ${openMenu === menu.key ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: '0.7rem' }}></i>
                  </button>
                </div>

                <div className={`nav-dropdown-menu flyout-l1 ${openMenu === menu.key ? 'mobile-expanded' : ''}`}>
                  {menu.items.map((item) => (
                    <button
                      key={item.target}
                      className="dropdown-item"
                      onClick={() => handleSectionClick(item.target)}
                      style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Mobile-only CTA */}
            <button
              onClick={() => { handleLinkClick(); setIsQuoteOpen(true); }}
              className="btn btn-primary mobile-only-cta"
              style={{ width: '85%', margin: '1.5rem auto 0 auto', backgroundColor: 'var(--color-accent)', border: 'none' }}
            >
              REQUEST A QUOTE
            </button>
          </nav>

          {/* Right Side Header Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Desktop Right Side REQUEST A QUOTE CTA */}
            <div className="header-actions">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="btn btn-primary"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  borderColor: 'var(--color-accent)',
                  padding: '0.65rem 1.5rem',
                  color: '#fff',
                  borderRadius: '4px',
                  fontWeight: '800',
                  fontSize: '0.82rem',
                  letterSpacing: '0.5px'
                }}
              >
                REQUEST A QUOTE
              </button>
            </div>

            {/* Mobile Hamburger Burger */}
            <div
              className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Navigation Menu"
              role="button"
            >
              <span className="burger-bar"></span>
              <span className="burger-bar"></span>
              <span className="burger-bar"></span>
            </div>
          </div>

        </div>
      </header>
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
