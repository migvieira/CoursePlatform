import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  order: { type: Number, required: true }
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  lessons: [lessonSchema],
  order: { type: Number, required: true }
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  modules: [moduleSchema],
  level: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'], 
    required: true 
  },
  category: { type: String, required: true },
  tags: [String],
  published: { type: Boolean, default: false },
  enrolledStudents: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Course', courseSchema);