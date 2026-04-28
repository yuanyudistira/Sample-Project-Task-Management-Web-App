import React, { createContext, useState, useContext, useEffect } from 'react';

const TaskContext = createContext();

const initialTasks = [
  {
    id: '1',
    title: 'Design Landing Page Redesign',
    description: 'Create wireframes and high-fidelity mockups for the new marketing site.',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Implement Authentication API',
    description: 'Set up JWT based authentication for the user portal.',
    status: 'todo',
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Update User Documentation',
    description: 'Write guides for the newly released features in v2.4.',
    status: 'done',
    priority: 'low',
    dueDate: new Date(Date.now() - 86400000 * 1).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Fix Navigation Bug on Mobile',
    description: 'The hamburger menu does not close when clicking outside on iOS devices.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date(Date.now() + 86400000 * 1).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

// ✅ FIX 1: Move secrets to .env
// const API_KEY = import.meta.env.VITE_API_KEY;
// const API_URL = import.meta.env.VITE_API_URL;

// ✅ FIX 2: Input validation utility
const validateTask = (task) => {
  if (!task) {
    throw new Error('Task data is required');
  }
  
  if (typeof task.title !== 'string' || task.title.trim().length === 0) {
    throw new Error('Task title must be a non-empty string');
  }
  
  if (task.title.length > 255) {
    throw new Error('Task title must be less than 255 characters');
  }
  
  const validStatuses = ['todo', 'in-progress', 'done'];
  if (task.status && !validStatuses.includes(task.status)) {
    throw new Error('Invalid task status');
  }
  
  const validPriorities = ['low', 'medium', 'high'];
  if (task.priority && !validPriorities.includes(task.priority)) {
    throw new Error('Invalid task priority');
  }
  
  return true;
};

export const TaskProvider = ({ children }) => {
  // ✅ FIX 3: Don't hardcode API keys, use environment variables
  // In production, these would come from .env
  // const API_KEY = import.meta.env.VITE_API_KEY;
  // const API_URL = import.meta.env.VITE_API_URL;
  
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate loaded data
        if (Array.isArray(parsed)) {
          return parsed;
        }
        return initialTasks;
      }
      return initialTasks;
    } catch (error) {
      // ✅ FIX 4: Generic error message (no sensitive info)
      console.error('Failed to load tasks from storage');
      return initialTasks;
    }
  });

  // ✅ FIX 5: Removed console.log(API_KEY)
  // Only generic logging for debugging
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      // Generic success message
      console.debug('Tasks synchronized to local storage');
    } catch (error) {
      console.error('Failed to save tasks to storage');
    }
  }, [tasks]);

  // ✅ FIX 6: Add input validation to addTask
  const addTask = (task) => {
    try {
      // Validate before adding
      validateTask(task);
      
      const newTask = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      setTasks([newTask, ...tasks]);
      
      // Generic success message
      console.debug('Task created successfully');
      return newTask;
    } catch (error) {
      console.error('Failed to add task:', error.message);
      throw error;
    }
  };

  // ✅ FIX 7: Add validation to updateTask
  const updateTask = (id, updatedTask) => {
    try {
      if (!id) {
        throw new Error('Task ID is required');
      }
      
      // Validate the update payload
      validateTask(updatedTask);
      
      setTasks(tasks.map((task) => 
        task.id === id ? { ...task, ...updatedTask } : task
      ));
      
      console.debug('Task updated successfully');
    } catch (error) {
      console.error('Failed to update task:', error.message);
      throw error;
    }
  };

  // ✅ FIX 8: Add error handling to deleteTask
  const deleteTask = (id) => {
    try {
      if (!id) {
        throw new Error('Task ID is required');
      }
      
      const beforeCount = tasks.length;
      setTasks(tasks.filter((task) => task.id !== id));
      
      console.debug('Task deleted successfully');
      return beforeCount > tasks.length;
    } catch (error) {
      console.error('Failed to delete task:', error.message);
      throw error;
    }
  };

  // ✅ FIX 9: Add error handling to updateTaskStatus
  const updateTaskStatus = (id, status) => {
    try {
      if (!id) {
        throw new Error('Task ID is required');
      }
      
      const validStatuses = ['todo', 'in-progress', 'done'];
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
      
      setTasks(tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ));
      
      console.debug('Task status updated successfully');
    } catch (error) {
      console.error('Failed to update task status:', error.message);
      throw error;
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};