import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getTasks, addTask, deleteTask } from "../controller/task.controller.js";

const router = express.Router();


router.get('/tasks', protectRoute, getTasks);
router.post('/add-task', protectRoute, addTask);
router.delete('/delete-task/:taskId', protectRoute, deleteTask);
router.patch('/update-task/:taskId', protectRoute, updateTask);

export default router;