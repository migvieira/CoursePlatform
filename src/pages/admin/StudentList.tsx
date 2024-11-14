import React, { useState } from 'react';
import { Mail, Phone, Calendar, Search } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  joinDate: string;
  lastActive: string;
  progress: number;
}

// Mock data - In production, this would come from the API
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    enrolledCourses: 3,
    joinDate: '2024-01-15',
    lastActive: '2024-03-10',
    progress: 75
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    enrolledCourses: 2,
    joinDate: '2024-02-01',
    lastActive: '2024-03-12',
    progress: 45
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    enrolledCourses: 4,
    joinDate: '2024-01-20',
    lastActive: '2024-03-11',
    progress: 90
  }
];

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students] = useState<Student[]>(mockStudents);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enrolled Courses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-lg">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {student.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {student.enrolledCourses} courses
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(student.joinDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(student.lastActive)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {student.progress}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No students found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;