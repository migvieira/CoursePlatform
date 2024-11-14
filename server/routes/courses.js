import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse
} from '../controllers/courseController.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', auth, getCourseById);
router.post('/', auth, createCourse);
router.put('/:id', auth, updateCourse);
router.delete('/:id', auth, deleteCourse);
router.post('/:id/enroll', auth, enrollInCourse);

export default router;