import mongoose from 'mongoose';
import Course from '../models/course.js';
import User from '../models/user.js';
import Activity from '../models/activity.js'
import jwt from 'jsonwebtoken';


export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCourse = async (req, res) => {
    const course = req.body;

    const newCourse = new Course({ ...course });

    try {

        await newCourse.save();

        res.status(201).json(newCourse);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const connectStudentToCourse = async (req, res) => {

    const { id } = req.params;
    const { student_id } = req.body;

    const course = await Course.findById(id);



    const index = course.students.findIndex(((id) => id === String(student_id)));

    if (index === -1) {
        course.students.push(student_id);
    } else {
        res.json({ message: "This student is already connected to this course." });
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, course, { new: true });

    res.status(201).json(updatedCourse);

}

export const addQuestion = async (req, res) => {
    const { id } = req.params;
    const questionObj = req.body;

    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    decodedData = jwt.verify(token, 'test');
    req.userId = decodedData?.id;

    const user = await User.findById(req.userId);

    try {

        const course = await Course.findById(id);

        course.questions.push(questionObj);

        const updatedCourse = await Course.findByIdAndUpdate(id, course, { new: true });

        const newActivity = await Activity.create({ name: "Додавання запитання до курсу", description: `Ім'я користувача : ${user.name} Email : ${user.email} Роль : ${user.role} Курс : ${course.name} Запитання : ${questionObj.questionText} Дата додавання : ${new Date().toLocaleString()}` });

        res.status(201).json('The test question was successfully added to the given course');

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const deleteQuestion = async (req, res) => {
    const { id } = req.params;
    const questionText = req.body.question_text;

    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    decodedData = jwt.verify(token, 'test');
    req.userId = decodedData?.id;

    const user = await User.findById(req.userId);

    try {


        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const course = await Course.findById(id);

        course.questions = course.questions.filter((el) => el.questionText !== questionText);

        const updatedCourse = await Course.findByIdAndUpdate(id, course, { new: true });

        const newActivity = await Activity.create({ name: "Видалення запитання з курсу", description: `Ім'я користувача : ${user.name} Email : ${user.email} Роль : ${user.role} Курс : ${course.name} Запитання : ${questionText} Дата видалення : ${new Date().toLocaleString()}` });


        res.status(201).json('The test question was successfully deleted to the given course');

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
