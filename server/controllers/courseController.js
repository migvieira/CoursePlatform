import Course from '../models/Course.js';

export const getCourses = async (req, res) => {
  try {
    const { category, level, search } = req.query;
    let query = { published: true };

    if (category) query.category = category;
    if (level) query.level = level;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const courses = await Course.find(query)
      .populate('instructor', 'name email')
      .select('-modules.lessons.videoUrl');

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Only send video URLs if user is enrolled or is admin
    const isEnrolled = course.enrolledStudents.includes(req.user._id);
    const isAdmin = req.user.isAdmin;
    
    if (!isEnrolled && !isAdmin) {
      course.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          lesson.videoUrl = undefined;
        });
      });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can create courses' });
    }

    const course = new Course({
      ...req.body,
      instructor: req.user._id
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can update courses' });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    Object.assign(course, req.body);
    course.updatedAt = Date.now();
    
    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can delete courses' });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.remove();
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};