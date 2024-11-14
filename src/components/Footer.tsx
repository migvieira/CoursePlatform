import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">CourseHub</h3>
            <p className="text-sm">
              Transform your marketing skills with expert-led courses and real-world projects.
            </p>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/courses" className="hover:text-white">All Courses</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">Terms of Service</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} CourseHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;