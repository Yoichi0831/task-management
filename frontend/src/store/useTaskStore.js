import { create } from 'zustand';
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from './useAuthStore';

 export const useTaskStore = create((set, get) => ({
    tasks: [],
    isTasksLoading: false,
    
    getTasks: async (userId) => {
        set({ isTasksLoading: true});
        console.log('hey inside getTASKS')
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
        console.log('deleting id is:', _id)
        //console.log('tasks are:', get().tasks)
        const { tasks } = get();
        try {
            await axiosInstance.delete(`/task/delete-task/${_id}`);
            set({ tasks: tasks.filter(task => task._id !== _id) });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete task");
        }
    }
    
}));