import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 border border-transparent shadow-sm',
  secondary: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm',
  danger: 'bg-red-600 text-white hover:bg-red-700 border border-transparent shadow-sm',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2',
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center justify-center font-medium rounded-lg
        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className={children ? 'mr-2' : ''}>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;