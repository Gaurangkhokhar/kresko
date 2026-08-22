import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

/**
 * Top-level navigation item (link or dropdown trigger).
 *
 * Renders an <li> that is a valid direct child of <ul>. When `hasDropdown`
 * is set, any `children` (e.g. the DropdownMenu panel) are rendered inside
 * the same <li>, keeping the DOM structure valid and accessible.
 */
export default function NavItem({
  label,
  active = false,
  open = false,
  hasDropdown = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children
}) {
  const handleEnter = (e) => {
    e.stopPropagation();
    if (onMouseEnter) onMouseEnter();
  };

  return (
    <li
      className="navbar__item"
      onMouseEnter={handleEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        className={`navbar__link ${active ? 'navbar__link--active' : ''} ${open ? 'is-open' : ''}`}
        aria-haspopup={hasDropdown ? 'true' : undefined}
        aria-expanded={hasDropdown ? open : undefined}
        onClick={onClick}
      >
        {label}
        {hasDropdown && <FiChevronDown className="navbar__chev" aria-hidden="true" />}
      </button>
      {children}
    </li>
  );
}