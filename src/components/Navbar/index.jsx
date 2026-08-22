import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiPhone, FiMail, FiArrowRight } from 'react-icons/fi';
import './navbar.css';
import { navItems, productMenu, solutionsMenu, aboutMenu } from './menuData';
import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';
import ProductMenu from './ProductMenu';
import SolutionsMenu from './SolutionsMenu';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKey, setOpenKey] = useState(null); // which desktop dropdown is open
  const barRef = useRef(null);
  const closeTimer = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Navigate to a menu leaf, smooth-scrolling to its anchor when on the same
  // route. Closes any open dropdown/drawer along the way.
  const handleNavigate = (item) => {
    setMobileOpen(false);
    setOpenKey(null);
    const path = item.path;
    const target = item.target;
    if (!path) return;

    const doScroll = () => {
      if (!target) return;
      const el = document.getElementById(target);
      if (el) {
        const offset = barRef.current ? barRef.current.getBoundingClientRect().height + 16 : 90;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    if (location.pathname === path) {
      doScroll();
    } else {
      navigate(path);
      if (target) setTimeout(doScroll, 180);
    }
  };

  const isActive = (path) => {
    if (!path) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenKey(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) setOpenKey(null);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const openDropdown = (key) => {
    clearTimeout(closeTimer.current);
    setOpenKey(key);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenKey(null), 180);
  };

  const dropdownProps = (key) => ({
    onMouseEnter: () => openDropdown(key),
    onMouseLeave: scheduleClose
  });

  return (
    <header className="navbar">
          {/* Slim utility contact strip */}
      <div className="navbar__topbar">
        <div className="navbar__topbar-inner">
          <div className="navbar__topbar-links">
            <span><FiPhone aria-hidden="true" /> +91 93779 98866</span>
            <span><FiMail aria-hidden="true" /> kresko.chemicals@gmail.com</span>
          </div>
          <div className="navbar__topbar-links">
            <span>Headquartered in Ahmedabad, India</span>
          </div>
        </div>
      </div>

      {/* Main white sticky bar */}
      <div className={`navbar__bar ${scrolled ? 'is-scrolled' : ''}`} ref={barRef}>
        <div className="navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={() => setMobileOpen(false)} aria-label="Kresko Chemicals home">
            <img src="/images/kresko_logo.png" alt="" />
            <span className="navbar__logo-text">
              <span className="navbar__logo-top">KRESKO</span>
              <span className="navbar__logo-bottom">Chemicals</span>
            </span>
          </Link>

                    {/* Desktop nav */}
          <ul className="navbar__nav">
            {navItems.map((nav) => {
              if (nav.type === 'link') {
                return (
                  <NavItem
                    key={nav.key}
                    label={nav.label}
                    active={isActive(nav.path)}
                    onClick={() => handleNavigate({ path: nav.path })}
                    onMouseEnter={() => setOpenKey(null)}
                  />
                );
              }
              if (nav.type === 'mega') {
                return (
                  <NavItem
                    key={nav.key}
                    label={nav.label}
                    open={openKey === 'products'}
                    hasDropdown
                    onClick={() => handleNavigate({ path: '/chlorine-dioxide' })}
                    {...dropdownProps('products')}
                  >
                    <DropdownMenu open={openKey === 'products'} onMouseLeave={scheduleClose}>
                      <ProductMenu menu={productMenu} onNavigate={handleNavigate} />
                    </DropdownMenu>
                  </NavItem>
                );
              }
              if (nav.type === 'solutions') {
                return (
                  <NavItem
                    key={nav.key}
                    label={nav.label}
                    open={openKey === 'solutions'}
                    hasDropdown
                    onClick={() => handleNavigate({ path: '/chlorine-dioxide' })}
                    {...dropdownProps('solutions')}
                  >
                    <DropdownMenu open={openKey === 'solutions'} onMouseLeave={scheduleClose}>
                      <SolutionsMenu menu={solutionsMenu} onNavigate={handleNavigate} />
                    </DropdownMenu>
                  </NavItem>
                );
              }
              if (nav.type === 'simple') {
                return (
                  <NavItem
                    key={nav.key}
                    label={nav.label}
                    open={openKey === 'about'}
                    hasDropdown
                    onClick={() => handleNavigate({ path: '/about' })}
                    {...dropdownProps('about')}
                  >
                    <DropdownMenu open={openKey === 'about'} className="navbar__simple" onMouseLeave={scheduleClose}>
                      {aboutMenu.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          className="navbar__nested-item"
                          onClick={() => handleNavigate(item)}
                          role="menuitem"
                        >
                          {item.label}
                        </button>
                      ))}
                    </DropdownMenu>
                  </NavItem>
                );
              }
              return null;
            })}
          </ul>

          {/* Desktop right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/contact" className="navbar__cta navbar__cta-desktop">
              Request a Quote <FiArrowRight aria-hidden="true" />
            </Link>
            <button
              type="button"
              className={`navbar__burger ${mobileOpen ? 'is-open' : ''}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} onNavigate={handleNavigate} />
    </header>
  );
}
