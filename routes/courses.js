import express from 'express';
import { getCourses, createCourse, connectStudentToCourse, addQuestion } from '../controllers/courses.js'

const router = express.Router();

router.get('/', getCourses);
router.post('/', createCourse);
router.patch('/:id/connectStudent', connectStudentToCourse);
router.patch('/:id/addQuestion', addQuestion);

export default router;