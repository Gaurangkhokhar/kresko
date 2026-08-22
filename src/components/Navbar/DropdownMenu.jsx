import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Animated dropdown shell. Fades in with a slight downward slide (150–200ms)
 * and keeps the panel mounted so hovering from the trigger into the dropdown
 * does not close it prematurely.
 */
export default function DropdownMenu({ open, onMouseLeave, children, className = '', align = 'left' }) {
  const ref = useRef(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          className={`navbar__dropdown ${className}`}
          style={align === 'right' ? { left: 'auto', right: 0 } : undefined}
          initial={{ opacity: 0, y: 10, scaleY: 0.98 }}
          animate={{ opacity: 1, y: 0, scaleY: 1 }}
          exit={{ opacity: 0, y: 8, scaleY: 0.98 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onMouseLeave={onMouseLeave}
          onMouseEnter={(e) => e.stopPropagation()}
          role="menu"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}