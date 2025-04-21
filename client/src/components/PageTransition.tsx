import React, { useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Wraps page content with fade transitions and handles scroll restoration
 */
const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // Scroll to top when this component mounts (page change)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;