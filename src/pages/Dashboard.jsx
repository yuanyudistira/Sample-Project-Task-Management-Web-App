import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useTasks } from '../context/TaskContext';

const { FiCheckCircle, FiClock, FiList, FiTrendingUp } = FiIcons;

const StatCard = ({ title, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4"
  >
    <div className={`p-4 rounded-xl ${color} bg-opacity-10`}>
      <SafeIcon icon={icon} className={`text-2xl ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { tasks } = useTasks();

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'done').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
  };

  const chartOptions = {
    tooltip: { trigger: 'item' },
    legend: { top: 'bottom', icon: 'circle' },
    color: ['#10B981', '#6366F1', '#F3F4F6'], // Emerald, Indigo, Gray
    series: [
      {
        name: 'Tasks',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { show: false },
        data: [
          { value: stats.completed, name: 'Completed' },
          { value: stats.inProgress, name: 'In Progress' },
          { value: stats.todo, name: 'To Do', itemStyle: { color: '#E5E7EB' } }
        ]
      }
    ]
  };

  const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Tasks" value={stats.total} icon={FiList} color="bg-blue-500 text-blue-500" delay={0.1} />
        <StatCard title="Completed" value={stats.completed} icon={FiCheckCircle} color="bg-emerald-500 text-emerald-500" delay={0.2} />
        <StatCard title="In Progress" value={stats.inProgress} icon={FiClock} color="bg-indigo-500 text-indigo-500" delay={0.3} />
        <StatCard title="Productivity" value={`${stats.total ? Math.round((stats.completed/stats.total)*100) : 0}%`} icon={FiTrendingUp} color="bg-purple-500 text-purple-500" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
          </div>
          <div className="space-y-4">
            {recentTasks.map((task, index) => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${task.status === 'done' ? 'bg-emerald-500' : task.status === 'in-progress' ? 'bg-indigo-500' : 'bg-gray-300'}`} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5 capitalize">{task.status.replace('-', ' ')}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' : 
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {task.priority}
                </span>
              </motion.div>
            ))}
            {recentTasks.length === 0 && (
              <p className="text-gray-500 text-center py-4">No tasks found. Create one to get started!</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Task Distribution</h2>
          <div className="h-[300px]">
            <ReactECharts option={chartOptions} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;