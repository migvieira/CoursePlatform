import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { useCourses } from '../stores/courseStore';
import CountdownTimer from '../components/CountdownTimer';

const Home = () => {
  const { courses } = useCourses();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-8">
            Transform Your Marketing Skills
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Master digital marketing with our expert-led courses. Limited time offers available now!
          </p>
        </div>

        {/* Featured Courses */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {courses.map((course) => {
            const originalPrice = course.price;
            const discountPercentage = 40;
            const discountedPrice = originalPrice * (1 - discountPercentage / 100);

            return (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {discountPercentage}% OFF
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium 
                      ${course.level === 'beginner' ? 'bg-green-100 text-green-800' : 
                        course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {course.level}
                    </span>
                    <div className="flex items-center ml-4">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                      <Clock size={16} />
                      <span>Limited Time Offer:</span>
                    </div>
                    <CountdownTimer duration={30} />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-gray-500 line-through text-lg">
                        ${originalPrice}
                      </span>
                      <span className="text-3xl font-bold text-gray-900 ml-2">
                        ${discountedPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span>Premium support</span>
                    </div>
                  </div>

                  <Link
                    to={`/courses/${course._id}`}
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    <span className="flex items-center justify-center">
                      Enroll Now
                      <ArrowRight size={20} className="ml-2" />
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;