import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card = ({ children, className = '', hover = true, onClick }: CardProps) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`glass-effect rounded-2xl p-4 sm:p-6 ${hover ? 'card-hover cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};
