import mongoose from "mongoose";

const activitySchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
})

export default mongoose.model("Activity", activitySchema);