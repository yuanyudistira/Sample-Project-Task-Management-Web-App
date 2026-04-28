import React from 'react';

const priorityColors = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-blue-100 text-blue-700 border-blue-200',
};

const statusColors = {
  todo: 'bg-gray-100 text-gray-700 border-gray-200',
  'in-progress': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  done: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const Badge = ({ children, type = 'status', value }) => {
  const colorClass = type === 'priority' 
    ? priorityColors[value] || 'bg-gray-100 text-gray-700 border-gray-200'
    : statusColors[value] || 'bg-gray-100 text-gray-700 border-gray-200';

  const formatText = (text) => {
    if (!text) return '';
    return text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {children || formatText(value)}
    </span>
  );
};

export default Badge;