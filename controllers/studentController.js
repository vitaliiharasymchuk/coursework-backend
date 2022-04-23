import Course from '../models/course.js';
import Activity from '../models/activity.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken';


export const generateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        decodedData = jwt.verify(token, 'test');
        req.userId = decodedData?.id;

        const course = await Course.findById(id);

        const user = await User.findById(req.userId);

        if (course.students.indexOf(req.userId) === -1) {
            res.status(404).json({ message: "You are not connected to this course" });
        }

        else {


            const firstLevelQuestionsArray = course.questions.filter(item => item.difficultyLevel == 1);

            const firstLevelQuestion = firstLevelQuestionsArray[Math.floor(Math.random() * firstLevelQuestionsArray.length)];

            const secondLevelQuestionsArray = course.questions.filter(item => item.difficultyLevel == 2);

            const secondLevelQuestion = secondLevelQuestionsArray[Math.floor(Math.random() * secondLevelQuestionsArray.length)];

            const thirdLevelQuestionsArray = course.questions.filter(item => item.difficultyLevel == 3);

            const thirdLevelQuestion = thirdLevelQuestionsArray[Math.floor(Math.random() * thirdLevelQuestionsArray.length)];

            const fourthLevelQuestionsArray = course.questions.filter(item => item.difficultyLevel == 4);

            const fourthLevelQuestion = fourthLevelQuestionsArray[Math.floor(Math.random() * fourthLevelQuestionsArray.length)];

            const generatedTicket = { firstLevelQuestion, secondLevelQuestion, thirdLevelQuestion, fourthLevelQuestion };



            const newActivity = await Activity.create({ name: "Генерація тестового білета", description: `Ім'я користувача : ${user.name} Email : ${user.email} Роль : ${user.role} Курс : ${course.name} Дата генерування : ${new Date().toLocaleString()}` });

            res.status(201).json(generatedTicket);
        }

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

