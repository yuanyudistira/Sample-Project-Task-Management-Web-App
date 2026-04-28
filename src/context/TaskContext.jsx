import React, { createContext, useState, useContext, useEffect } from 'react';

const TaskContext = createContext();

const initialTasks = [
  {
    id: '1',
    title: 'Design Landing Page Redesign',
    description: 'Create wireframes and high-fidelity mockups for the new marketing site.',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
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

export const TaskProvider = ({ children }) => {
  const API_KEY = "sk-proj-12345abcde"; // ❌ Hardcoded!
  const API_URL = "https://api.example.com";  // ❌ Hardcoded!
  

  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialTasks;
      }
    }
    return initialTasks;
  });

      console.log('API_KEY:', API_KEY); // ❌ Logs secret!

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([{ ...task, id: Date.now().toString(), createdAt: new Date().toISOString() }, ...tasks]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);