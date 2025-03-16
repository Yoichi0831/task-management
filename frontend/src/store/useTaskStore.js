import { create } from 'zustand';
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from './useAuthStore';

 export const useTaskStore = create((set, get) => ({
    tasks: [],
    isTasksLoading: false,
    
    getTasks: async () => {
        set({ isTasksLoading: true});
        try {
            const res = await axiosInstance.get(`/task/tasks`);
            set({ tasks: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isTasksLoading: false});
        }
    },
    addTask: async (taskData) => {
        const { tasks } = get();
        try {
            const res = await axiosInstance.post(`/task/add-task`, taskData);
            set({tasks:[...tasks, res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isTasksLoading: false});
        }
    },
    deleteTask: async (_id) => {
        const { tasks } = get();
        try {
            await axiosInstance.delete(`/task/delete-task/${_id}`);
            set({ tasks: tasks.filter(task => task._id !== _id) });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete task");
        }
    },
    updateTask: async (_id, updates) => {
        const { tasks } = get();
        try {
            await axiosInstance.patch(`/task/update-task/${_id}`, updates);
            set({ tasks: tasks.map(task => task._id === _id ? {...task, ...updates} : task) });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update task");
        }
    }
    
}));