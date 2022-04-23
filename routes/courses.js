import express from 'express';
import { getCourses, createCourse, connectStudentToCourse, addQuestion, deleteQuestion } from '../controllers/courses.js'
import { generateTicket } from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getCourses);
router.post('/', createCourse);
router.patch('/:id/connectStudent', connectStudentToCourse);
router.patch('/:id/addQuestion', addQuestion);
router.patch('/:id/deleteQuestion', deleteQuestion);
router.get('/:id/generateTicket', generateTicket);

export default router;