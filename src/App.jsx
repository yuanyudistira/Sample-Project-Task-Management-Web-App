import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            {/* Placeholder routes for other sidebar items */}
            <Route path="/calendar" element={<div className="p-8 text-center text-gray-500">Calendar View Coming Soon</div>} />
            <Route path="/settings" element={<div className="p-8 text-center text-gray-500">Settings Coming Soon</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </TaskProvider>
  );
}

export default App;