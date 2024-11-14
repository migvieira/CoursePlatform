import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../stores/authStore';
import { Menu, X, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">CourseHub</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/courses"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Courses
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/courses"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Courses
            </Link>
            {user ? (
              <>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;