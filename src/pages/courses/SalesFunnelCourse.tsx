import React from 'react';
import { Play, CheckCircle, Clock, Award, Users, BarChart } from 'lucide-react';
import { salesFunnelCourse } from '../../data/salesFunnelCourse';
import CountdownTimer from '../../components/CountdownTimer';

const SalesFunnelCourse = () => {
  const discountPercentage = 40;
  const originalPrice = salesFunnelCourse.price;
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        <div className="absolute inset-0">
          <img
            src={salesFunnelCourse.thumbnail}
            alt="Sales Funnel Course"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {salesFunnelCourse.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {salesFunnelCourse.description}
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{salesFunnelCourse.duration}</span>
              </div>
              <div className="flex items-center">
                <BarChart className="w-5 h-5 mr-2" />
                <span>{salesFunnelCourse.level}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>500+ enrolled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            {/* Instructor Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center">
                <img
                  src={salesFunnelCourse.instructor.avatar}
                  alt={salesFunnelCourse.instructor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {salesFunnelCourse.instructor.name}
                  </h3>
                  <p className="text-gray-500">{salesFunnelCourse.instructor.title}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{salesFunnelCourse.instructor.bio}</p>
            </div>

            {/* Course Curriculum */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
              </div>
              {salesFunnelCourse.modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="border-b border-gray-200 last:border-0">
                  <div className="p-6 bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900">
                      Module {moduleIndex + 1}: {module.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{module.description}</p>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="p-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <Play className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg font-medium text-gray-900">
                              {lesson.title}
                            </h4>
                            <p className="mt-1 text-gray-600">
                              {lesson.description}
                            </p>
                            <div className="mt-4">
                              <h5 className="text-sm font-medium text-gray-900 mb-2">
                                In this lesson you'll learn:
                              </h5>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {lesson.keyPoints.map((point, index) => (
                                  <li key={index} className="flex items-center text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    <span className="text-sm">{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="ml-auto flex items-center">
                            <Clock className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500">
                              {lesson.duration} min
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Card */}
          <div className="mt-8 lg:mt-0">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    Save {discountPercentage}% Today!
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-gray-400 line-through text-2xl">
                      ${originalPrice}
                    </span>
                    <span className="text-4xl font-bold text-gray-900">
                      ${discountedPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Limited Time Offer Ends In:</p>
                    <CountdownTimer duration={30} />
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Enroll Now
                </button>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Lifetime access to all content</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Premium support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Course completion certificate</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Access to student community</span>
                  </li>
                </ul>

                <p className="mt-6 text-sm text-center text-gray-500">
                  30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesFunnelCourse;