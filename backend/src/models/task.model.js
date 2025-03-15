import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        priority: {
            type: Boolean,
            required: true,
        }
    },
    { timestamps: true}
);
const Task = mongoose.model("Task", taskSchema);
export default Task;