import User from "../models/user.model.js";
import Task from "../models/task.model.js";


export const getTasks = async(req, res) => {
    try {
        // get it from the url, but renamed it to taskOwnerId
        //const { id:taskOwnerId } = req.params;
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
        console.log("Error in add-task: ", error.message);
            res.status(500).json({ message: "Internal server error"});
    }
}