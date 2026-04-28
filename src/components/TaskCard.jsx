import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import Badge from './ui/Badge';

const { FiCalendar, FiClock, FiMoreVertical, FiEdit2, FiTrash2 } = FiIcons;

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all group relative"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex space-x-2">
          <Badge type="status" value={task.status} />
          <Badge type="priority" value={task.priority} />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <SafeIcon icon={FiMoreVertical} />
          </button>
          
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-100 z-20 py-1 overflow-hidden">
                <button 
                  onClick={() => { onEdit(task); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <SafeIcon icon={FiEdit2} className="mr-2 text-gray-400" /> Edit
                </button>
                <button 
                  onClick={() => { onDelete(task.id); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <SafeIcon icon={FiTrash2} className="mr-2 text-red-400" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <h4 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
        {task.title}
      </h4>
      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className={`flex items-center text-sm ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
          <SafeIcon icon={isOverdue ? FiClock : FiCalendar} className="mr-1.5" />
          <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
        </div>
        
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="text-sm bg-gray-50 border-none rounded-md py-1 px-2 text-gray-700 focus:ring-0 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </motion.div>
  );
};

export default TaskCard;