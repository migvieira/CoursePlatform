import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LayoutGrid, Video, Users, Settings } from 'lucide-react';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import StudentList from './StudentList';

const Dashboard = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <nav className="p-4">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
          </div>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/courses"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700"
              >
                <LayoutGrid size={20} />
                <span>Courses</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/students"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700"
              >
                <Users size={20} />
                <span>Students</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700"
              >
                <Settings size={20} />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-50 p-8">
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/new" element={<CourseForm />} />
          <Route path="/courses/:id/edit" element={<CourseForm />} />
          <Route path="/students" element={<StudentList />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;