import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiX, FiArrowRight } from 'react-icons/fi';
import { productMenu, solutionsMenu, aboutMenu } from './menuData';
import ProductMenu from './ProductMenu';

/**
 * Full-width mobile drawer. Products / Solutions / About become expandable
 * accordions. Clicking a leaf navigates and closes the drawer.
 */
export default function MobileMenu({ open, onClose, onNavigate }) {
  const [accordion, setAccordion] = useState(null);

  const toggle = (key) => setAccordion(accordion === key ? null : key);

  const renderLeaf = (item) => (
    <button type="button" onClick={() => onNavigate(item)}>
      <FiArrowRight size={12} aria-hidden="true" />
      {item.label}
    </button>
  );

  return (
    <motion.div
      className="navbar__drawer"
      initial={false}
      animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={open ? { pointerEvents: 'auto' } : { pointerEvents: 'none' }}
      aria-hidden={!open}
    >
      <div className="navbar__drawer-head">
        <strong style={{ color: 'var(--navy)', fontSize: '1.1rem' }}>Menu</strong>
        <button type="button" className="navbar__drawer-close" onClick={onClose} aria-label="Close menu">
          <FiX />
        </button>
      </div>

      <div className="navbar__drawer-body">
        <button type="button" className="navbar__mobile-item" onClick={() => onNavigate({ path: '/' })}>
          Home
        </button>

                {/* Our Products accordion — reuses the same 4-group menu as desktop */}
        <button
          type="button"
          className={`navbar__mobile-acc ${accordion === 'products' ? 'is-open' : ''}`}
          onClick={() => toggle('products')}
          aria-expanded={accordion === 'products'}
        >
          Our Products
          <FiChevronDown className="chev" aria-hidden="true" />
        </button>
        {accordion === 'products' && (
          <ProductMenu menu={productMenu} onNavigate={onNavigate} />
        )}

        {/* Our Solutions accordion */}
        <button
          type="button"
          className={`navbar__mobile-acc ${accordion === 'solutions' ? 'is-open' : ''}`}
          onClick={() => toggle('solutions')}
          aria-expanded={accordion === 'solutions'}
        >
          Our Solutions
          <FiChevronDown className="chev" aria-hidden="true" />
        </button>
        {accordion === 'solutions' && (
          <div className="navbar__mobile-sub">
            {solutionsMenu.map((item) => (
              <div key={item.label}>{renderLeaf(item)}</div>
            ))}
          </div>
        )}

        <button type="button" className="navbar__mobile-item" onClick={() => onNavigate({ path: '/resources' })}>
          Case Studies
        </button>

        <button type="button" className="navbar__mobile-item" onClick={() => onNavigate({ path: '/blog' })}>
          Blogs
        </button>

        {/* About Us accordion */}
        <button
          type="button"
          className={`navbar__mobile-acc ${accordion === 'about' ? 'is-open' : ''}`}
          onClick={() => toggle('about')}
          aria-expanded={accordion === 'about'}
        >
          About Us
          <FiChevronDown className="chev" aria-hidden="true" />
        </button>
        {accordion === 'about' && (
          <div className="navbar__mobile-sub">
            {aboutMenu.map((item) => (
              <div key={item.label}>{renderLeaf(item)}</div>
            ))}
          </div>
        )}

        <button type="button" className="navbar__mobile-item" onClick={() => onNavigate({ path: '/contact' })}>
          Contact Us
        </button>

        <button
          type="button"
          className="navbar__cta navbar__drawer-cta"
          onClick={() => onNavigate({ path: '/contact' })}
        >
          Request a Quote
        </button>
      </div>
    </motion.div>
  );
}