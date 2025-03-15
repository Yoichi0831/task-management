import express from 'express';
import { signup, login, logout } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

//router.post('/addTask', protectRoute, addTask);

export default router;