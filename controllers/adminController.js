import mongoose from 'mongoose';
import User from '../models/user.js';
import Activity from '../models/activity.js';
import Course from '../models/course.js';

export const getUsers = async (req, res) => {

    try {

        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUsersActivities = async (req, res) => {
    try {

        const activities = await Activity.find();
        res.status(200).json(activities);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const courses = await Course.find({ students: id });


        for (let i = 0; i < courses.length; i++) {

            const currentCourse = courses[i];
            currentCourse.students = courses[i].students.filter((student) => student !== id);
            const updatedCourse = await Course.findByIdAndUpdate(courses[i]._id.valueOf(), currentCourse, { new: true });
        }

        await User.findByIdAndRemove(id);

        res.json({ message: "User deleted successfully." });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const modifyUser = async (req, res) => {
    try {

        const { id } = req.params;
        const { newUserName, newEmail } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');

        const UserData = await User.findById(id);

        UserData.name = newUserName;
        UserData.email = newEmail;

        const updatedUser = await User.findByIdAndUpdate(id, UserData, { new: true });
        res.status(202);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}