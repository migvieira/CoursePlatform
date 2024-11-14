import create from 'zustand';
import axios from 'axios';
import { salesFunnelCourse } from '../data/salesFunnelCourse';

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  level: string;
  published: boolean;
  modules: Array<{
    title: string;
    lessons: Array<{
      title: string;
      videoUrl: string;
      description: string;
    }>;
  }>;
}

interface CourseStore {
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  getCourse: (id: string) => Course | undefined;
  createCourse: (courseData: Partial<Course>) => Promise<void>;
  updateCourse: (id: string, courseData: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
}

// Initialize with the sales funnel course
const initialCourses = [salesFunnelCourse];

export const useCourses = create<CourseStore>((set, get) => ({
  courses: initialCourses,
  loading: false,
  error: null,

  fetchCourses: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      // Combine API courses with local courses
      const apiCourses = response.data;
      set({ 
        courses: [...initialCourses, ...apiCourses.filter(course => course._id !== salesFunnelCourse._id)],
        loading: false 
      });
    } catch (error) {
      set({ 
        courses: initialCourses,
        error: 'Failed to fetch courses', 
        loading: false 
      });
    }
  },

  getCourse: (id) => {
    return get().courses.find(course => course._id === id);
  },

  createCourse: async (courseData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/courses', courseData);
      set(state => ({
        courses: [...state.courses, response.data]
      }));
    } catch (error) {
      set({ error: 'Failed to create course' });
      throw error;
    }
  },

  updateCourse: async (id, courseData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/courses/${id}`, courseData);
      set(state => ({
        courses: state.courses.map(course =>
          course._id === id ? response.data : course
        )
      }));
    } catch (error) {
      set({ error: 'Failed to update course' });
      throw error;
    }
  },

  deleteCourse: async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      set(state => ({
        courses: state.courses.filter(course => course._id !== id)
      }));
    } catch (error) {
      set({ error: 'Failed to delete course' });
      throw error;
    }
  }
}));