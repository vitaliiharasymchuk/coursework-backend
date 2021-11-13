import Course from '../models/course.js';


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

    try {

        const course = await Course.findById(id);

        course.questions.push(questionObj);

        const updatedCourse = await Course.findByIdAndUpdate(id, course, { new: true });

        res.status(201).json('The test question was successfully added to the given course');

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}