import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { getProductCategories } from '../utils/storage';
import QuoteModal from './QuoteModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Mobile accordion state managers
  const [mobileLevel1Open, setMobileLevel1Open] = useState(false); // Toggles 'Products'
  const [mobileLevel2Active, setMobileLevel2Active] = useState(null); // Tracks active Category index
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  const location = useLocation();
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
    setMobileLevel1Open(false);
    setMobileLevel2Active(null);
    setMobileSolutionsOpen(false);
  }, [location]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setMobileLevel1Open(false);
    setMobileLevel2Active(null);
    setMobileSolutionsOpen(false);
    setDropdownForceClose(true); // Force close desktop dropdown on click
  };

  // Reset submenus when hamburger collapses/opens
  useEffect(() => {
    if (!isMenuOpen) {
      setMobileLevel1Open(false);
      setMobileLevel2Active(null);
      setMobileSolutionsOpen(false);
    }
  }, [isMenuOpen]);

  const [productMenu, setProductMenu] = useState([]);

  useEffect(() => {
    const loadCategories = () => {
      const dynamicCategories = getProductCategories();
      const mapped = Object.entries(dynamicCategories).map(([slug, catInfo]) => {
        return {
          name: catInfo.name,
          slug: slug,
          sub: Object.entries(catInfo.subcategories || {}).map(([subSlug, subName]) => ({
            name: subName,
            slug: subSlug
          }))
        };
      });
      setProductMenu(mapped);
    };

    loadCategories();
    window.addEventListener('categoriesUpdated', loadCategories);
    return () => window.removeEventListener('categoriesUpdated', loadCategories);
  }, []);

  const handleMobileL1Toggle = (e) => {
    e.preventDefault();
    setMobileLevel1Open(!mobileLevel1Open);
    setMobileLevel2Active(null);
  };

  const handleMobileL2Toggle = (idx, e) => {
    e.preventDefault();
    setMobileLevel2Active(mobileLevel2Active === idx ? null : idx);
  };

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

          {/* Navigation Links Menu */}
          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {/* 1. Home */}
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleLinkClick}>
              Home
            </NavLink>

            {/* 2. About */}
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleLinkClick}>
              About
            </NavLink>

            {/* 3. Products Dropdown */}
            <div
              className={`nav-dropdown-wrapper ${dropdownForceClose ? 'force-hide-dropdown' : ''}`}
              onMouseEnter={() => setDropdownForceClose(false)}
              onMouseLeave={() => setDropdownForceClose(false)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleLinkClick}>
                  Products
                </NavLink>
                <button
                  className="dropdown-toggle-arrow"
                  onClick={handleMobileL1Toggle}
                  style={{ display: 'inline-block', border: 'none', background: 'none' }}
                  aria-label="Toggle Products Submenu"
                >
                  <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem' }}></i>
                </button>
              </div>

              {/* LEVEL 1: Dropdown Categories */}
              <div className={`nav-dropdown-menu flyout-l1 ${mobileLevel1Open ? 'mobile-expanded' : ''}`}>
                {productMenu.map((cat, idx) => {
                  const hasSub = cat.sub && cat.sub.length > 0;
                  return (
                    <div key={idx} className={`dropdown-submenu-wrapper ${hasSub ? 'has-children' : ''}`}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Link
                          to={`/products/${cat.slug}`}
                          className="dropdown-item dropdown-item-with-arrow"
                          style={{ flexGrow: 1 }}
                          onClick={handleLinkClick}
                        >
                          {cat.name}
                        </Link>
                        {hasSub && (
                          <button
                            className="mobile-l2-toggle"
                            onClick={(e) => handleMobileL2Toggle(idx, e)}
                            style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                            aria-label="Toggle Subcategory List"
                          >
                            <i className={`fa-solid ${mobileLevel2Active === idx ? 'fa-chevron-up' : 'fa-chevron-right'}`} style={{ fontSize: '0.65rem' }}></i>
                          </button>
                        )}
                      </div>

                      {/* LEVEL 2: Dropdown Subcategories */}
                      {hasSub && (
                        <div className={`dropdown-submenu-menu flyout-l2 ${mobileLevel2Active === idx ? 'mobile-l2-expanded' : ''}`}>
                          {cat.sub.map((subItem, sIdx) => (
                            <Link
                              key={sIdx}
                              to={`/products/${subItem.slug}`}
                              className="dropdown-item"
                              style={{ paddingLeft: '2rem' }}
                              onClick={handleLinkClick}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Solutions Dropdown */}
            <div
              className={`nav-dropdown-wrapper ${dropdownForceClose ? 'force-hide-dropdown' : ''}`}
              onMouseEnter={() => setDropdownForceClose(false)}
              onMouseLeave={() => setDropdownForceClose(false)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <NavLink to="/chlorine-dioxide" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleLinkClick}>
                  Solutions
                </NavLink>
                <button
                  className="dropdown-toggle-arrow"
                  onClick={(e) => { e.preventDefault(); setMobileSolutionsOpen(!mobileSolutionsOpen); }}
                  style={{ display: 'inline-block', border: 'none', background: 'none' }}
                  aria-label="Toggle Solutions Submenu"
                >
                  <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem' }}></i>
                </button>
              </div>

              <div className={`nav-dropdown-menu flyout-l1 ${mobileSolutionsOpen ? 'mobile-expanded' : ''}`}>
                <Link to="/chlorine-dioxide" className="dropdown-item" onClick={handleLinkClick}>
                  Chlorine Dioxide (ClO2)
                </Link>
                <Link to="/oem" className="dropdown-item" onClick={handleLinkClick}>
                  OEM & Private Labeling
                </Link>
                <Link to="/products/water-treatment" className="dropdown-item" onClick={handleLinkClick}>
                  Water & Wastewater Treatment
                </Link>
                <Link to="/products/floor-care" className="dropdown-item" onClick={handleLinkClick}>
                  Industrial Sanitation & Hygiene
                </Link>
              </div>
            </div>

            {/* 5. Industries */}
            <NavLink to="/industries" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleLinkClick}>
              Industries
            </NavLink>

            {/* 6. Resources */}
            <NavLink to="/resources" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleLinkClick}>
              Resources
            </NavLink>

            {/* 7. Blogs */}
            <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleLinkClick}>
              Blogs
            </NavLink>

            {/* 8. Contact */}
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleLinkClick}>
              Contact
            </NavLink>

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
