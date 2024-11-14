import Course from '../models/Course.js';
import Payment from '../models/Payment.js';

export const createPayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const payment = new Payment({
      user: req.user._id,
      course: courseId,
      amount: course.price,
      status: 'pending'
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { paymentId, paypalOrderId } = req.body;
    
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Verify with PayPal API (simplified for example)
    payment.status = 'completed';
    payment.paypalOrderId = paypalOrderId;
    await payment.save();

    // Enroll user in course
    const course = await Course.findById(payment.course);
    if (!course.enrolledStudents.includes(req.user._id)) {
      course.enrolledStudents.push(req.user._id);
      await course.save();
    }

    res.json({ message: 'Payment verified and enrollment completed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};