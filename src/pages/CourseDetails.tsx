import React from 'react';
import { useParams } from 'react-router-dom';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useCourses } from '../stores/courseStore';
import { useAuth } from '../stores/authStore';
import { Play, CheckCircle, Lock } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { getCourse, enrollInCourse } = useCourses();
  const course = getCourse(id);

  const discountPercentage = 40;
  const originalPrice = course?.price || 0;
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);

  const handlePaypalSuccess = async (details) => {
    try {
      await enrollInCourse(id);
      // Refresh course data or redirect to course content
    } catch (error) {
      console.error('Enrollment error:', error);
    }
  };

  if (!course) return <div>Loading...</div>;

  const isEnrolled = course.enrolledStudents?.includes(user?.id);

  const paypalOptions = {
    "client-id": "test", // Replace with actual client ID from environment variable
    currency: "USD",
    intent: "capture"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Course Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-72">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {course.level}
                </span>
                <span className="text-gray-500">
                  {course.modules.reduce(
                    (acc, module) => acc + module.lessons.length,
                    0
                  )}{' '}
                  lessons
                </span>
              </div>
              <p className="text-gray-600 mb-6">{course.description}</p>

              {/* Course Content Preview */}
              <div className="border rounded-lg">
                {course.modules.map((module, index) => (
                  <div key={index} className="border-b last:border-b-0">
                    <div className="p-4 bg-gray-50">
                      <h3 className="font-medium text-gray-900">
                        {module.title}
                      </h3>
                    </div>
                    <div className="divide-y">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="p-4 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            {isEnrolled ? (
                              <Play size={20} className="text-blue-600" />
                            ) : (
                              <Lock size={20} className="text-gray-400" />
                            )}
                            <span className="text-gray-700">
                              {lesson.title}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Card */}
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

              {isEnrolled ? (
                <div className="text-center">
                  <CheckCircle
                    size={48}
                    className="mx-auto text-green-500 mb-4"
                  />
                  <p className="text-lg font-medium text-gray-900">
                    You're enrolled!
                  </p>
                  <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Continue Learning
                  </button>
                </div>
              ) : (
                <PayPalScriptProvider options={paypalOptions}>
                  <PayPalButtons
                    style={{ layout: 'vertical' }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: discountedPrice.toFixed(2),
                              currency_code: "USD"
                            },
                            description: `Enrollment in ${course.title}`
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();
                      await handlePaypalSuccess(details);
                    }}
                  />
                </PayPalScriptProvider>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  What you'll get:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={20} className="text-green-500 mr-2" />
                    Full lifetime access
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={20} className="text-green-500 mr-2" />
                    Access on mobile and desktop
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={20} className="text-green-500 mr-2" />
                    Certificate of completion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;