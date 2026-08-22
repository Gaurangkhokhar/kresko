import React from 'react';

/**
 * Scrollable Solutions dropdown (max-height + vertical scroll).
 */
export default function SolutionsMenu({ menu, onNavigate }) {
  return (
    <div className="navbar__solutions" role="menu">
      {menu.map((item) => (
        <button
          key={item.label}
          type="button"
          className="navbar__solution-item"
          onClick={() => onNavigate(item)}
          role="menuitem"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}