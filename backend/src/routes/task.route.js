import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getTasks, addTask } from "../controller/task.controller.js";

const router = express.Router();


router.get('/tasks', protectRoute, getTasks);
router.post('/add-task', protectRoute, addTask);


export default router;