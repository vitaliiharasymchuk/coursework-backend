import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    students: {
        type: [String],
        default: []
    },
    questions: {
        type: [Object],
        default: []
    }
}
);

export default mongoose.model("Course", courseSchema);