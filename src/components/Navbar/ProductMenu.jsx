import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

/**
 * Products mega-menu.
 * Renders the four expandable groups (Chlorine Dioxide / Introduction /
 * Products / Applications). Hover reveals a group on desktop; the ? chevron
 * toggles it on touch. Child links inherit the group's `path` when missing and
 * smooth-scroll to the leaf's `target` anchor.
 */
export default function ProductMenu({ menu, onNavigate }) {
  const [openKey, setOpenKey] = useState(0); // 0 = first group open by default

  return (
    <div className="navbar__mega" role="menu">
      {menu.map((group, idx) => {
        const isOpen = openKey === idx;
        return (
          <div className="navbar__mega-group" key={group.label}>
            <div className="navbar__mega-header">
              <button
                type="button"
                className="navbar__mega-title"
                onMouseEnter={() => setOpenKey(idx)}
                onClick={() => onNavigate(group)}
                role="menuitem"
              >
                {group.label}
              </button>
              <button
                type="button"
                className={`navbar__mega-toggle ${isOpen ? 'is-open' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenKey(isOpen ? null : idx);
                }}
                aria-expanded={isOpen}
                aria-controls={`mega-${idx}`}
                aria-label={`${isOpen ? 'Close' : 'Open'} ${group.label} submenu`}
                role="button"
              >
                <FiChevronDown className="chev" aria-hidden="true" />
              </button>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`mega-${idx}`}
                  className="navbar__mega-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  role="menu"
                >
                  {group.children.map((child) => (
                    <button
                      key={child.label}
                      type="button"
                      className="navbar__mega-link"
                      onClick={() => onNavigate({ ...child, path: child.path || group.path })}
                      role="menuitem"
                    >
                      <FiChevronRight className="link-arrow" aria-hidden="true" />
                      {child.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}