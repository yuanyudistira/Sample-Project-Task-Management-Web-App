import React from 'react';
import { NavLink } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiLayout, FiCheckSquare, FiCalendar, FiSettings, FiTarget } = FiIcons;

const navItems = [
  { path: '/', name: 'Dashboard', icon: FiLayout },
  { path: '/tasks', name: 'My Tasks', icon: FiCheckSquare },
  { path: '/calendar', name: 'Calendar', icon: FiCalendar },
  { path: '/settings', name: 'Settings', icon: FiSettings },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-6 flex items-center space-x-3">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <SafeIcon icon={FiTarget} className="text-xl" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          TaskFlow
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <SafeIcon icon={item.icon} className="text-lg" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 m-4 bg-indigo-50 rounded-2xl">
        <h4 className="text-sm font-semibold text-indigo-900 mb-1">Upgrade to Pro</h4>
        <p className="text-xs text-indigo-700 mb-3">Get advanced features and unlimited projects.</p>
        <button className="w-full bg-white text-indigo-600 text-sm font-medium py-2 rounded-lg shadow-sm hover:shadow transition-shadow">
          Upgrade Now
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;