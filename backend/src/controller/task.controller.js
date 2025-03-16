import Task from "../models/task.model.js";


export const getTasks = async(req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({userId: userId});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

export const addTask = async(req, res) => {
    try {
        const { title, description, status, priority } = req.body;
        const userId = req.user._id;
        const newTask = new Task({
            userId,
            title,
            description,
            status,
            priority,
        });
        await newTask.save();
        res.status(200).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}

export const deleteTask = async(req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user._id;
        const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user._id;
        const updates = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId },
            updates,
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
