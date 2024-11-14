import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCourses } from '../../stores/courseStore';
import { Plus, Minus } from 'lucide-react';

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createCourse, updateCourse, getCourse } = useCourses();
  const [modules, setModules] = React.useState([{ title: '', lessons: [{ title: '', videoUrl: '', description: '' }] }]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  React.useEffect(() => {
    if (id) {
      const course = getCourse(id);
      if (course) {
        Object.keys(course).forEach((key) => {
          setValue(key, course[key]);
        });
        setModules(course.modules);
      }
    }
  }, [id, getCourse, setValue]);

  const onSubmit = async (data) => {
    const courseData = {
      ...data,
      modules,
    };

    try {
      if (id) {
        await updateCourse(id, courseData);
      } else {
        await createCourse(courseData);
      }
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const addModule = () => {
    setModules([...modules, { title: '', lessons: [{ title: '', videoUrl: '', description: '' }] }]);
  };

  const addLesson = (moduleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons.push({ title: '', videoUrl: '', description: '' });
    setModules(newModules);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Course' : 'New Course'}</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                {...register('title', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                {...register('price', { required: true, min: 0 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description', { required: true })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Course Content</h2>
          
          {modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="mb-8 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Module {moduleIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => addLesson(moduleIndex)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Plus size={20} />
                </button>
              </div>

              <input
                type="text"
                placeholder="Module Title"
                value={module.title}
                onChange={(e) => {
                  const newModules = [...modules];
                  newModules[moduleIndex].title = e.target.value;
                  setModules(newModules);
                }}
                className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />

              {module.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="ml-4 mb-4 p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Lesson {lessonIndex + 1}</h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Lesson Title"
                      value={lesson.title}
                      onChange={(e) => {
                        const newModules = [...modules];
                        newModules[moduleIndex].lessons[lessonIndex].title = e.target.value;
                        setModules(newModules);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Video URL"
                      value={lesson.videoUrl}
                      onChange={(e) => {
                        const newModules = [...modules];
                        newModules[moduleIndex].lessons[lessonIndex].videoUrl = e.target.value;
                        setModules(newModules);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}

          <button
            type="button"
            onClick={addModule}
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Plus size={20} className="mr-2" />
            Add Module
          </button>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/courses')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {id ? 'Update Course' : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;