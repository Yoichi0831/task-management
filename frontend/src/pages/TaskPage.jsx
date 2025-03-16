import React, { useState, useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import toast from 'react-hot-toast';

export default function TaskPage() {

  const { 
    tasks=[],
    getTasks,
    addTask,
    deleteTask,
    updateTask,
   } = useTaskStore();


  useEffect(() => {
    getTasks();
  }, [getTasks]);

  useEffect(() => {
    setPriorityTasks(tasks.filter(task => task.priority).map(task => task._id));
  }, [tasks]);


  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });
  const [priorityTasks, setPriorityTasks] = useState([]);
  const [editingTasks, setEditingTasks] = useState({});

  // Setting initially the priority tasks
  useEffect(() => {
    setPriorityTasks(tasks.filter(task => task.priority).map(task => task._id));
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      console.log('inside handleAddTask')
      await addTask({ 
          title: newTask.title.trim(), 
          description: newTask.description.trim(),
          status: newTask.status,
          priority: false,
      });
      console.log('now clear form')
      // Clear form
      setNewTask({ title: '', description: '', status: 'To Do' });
    } catch (error) {
      console.error('Error adding new task', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      toast.success('Task deleted successfully');
      console.log('deleted')
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await updateTask(taskId, updates);
    } catch (error) {
      console.error('Error updating task', error);
    }
  }

  const handleChangeDescription = (taskId, newValue) => {
    setEditingTasks(prev => ({
      ...prev,
      [taskId]: { text: newValue }
    }));
  };

  // const handleUpdateDescription = async (taskId, newDescription) => {
  //   try {
  //       updates = { description: newDescription };
  //       await handleUpdateTask(taskId, updates);
  //   } catch (error) {
  //       console.error('Error updating description:', error);
  //   }
  // };
  const handleSaveDescription = async (taskId) => {
    const updatedText = editingTasks[taskId]?.text.trim();
    if (!updatedText || updatedText === tasks.find(t => t._id === taskId)?.description) {
      return;
    }
  
    await handleUpdateTask(taskId, { description: updatedText });
  
    setEditingTasks(prev => ({
      ...prev,
      [taskId]: { text: updatedText }
    }));
    toast.success('Description updated successfully');
    console.log('updated')
  };

  return (
    <div className="p-6 max-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className='flex items-center gap-2'>
        <div className="mb-4 p-4 border rounded-lg w-full md:w-1/4">
          <input
            type="text"
            placeholder="Task Title"
            className="input input-bordered w-full mb-2"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Task Description"
            className="textarea textarea-bordered w-full mb-2"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <select
            className={`
              select select-bordered text-center w-full mb-2
              ${newTask.status === 'To Do' ? 'bg-red-500 text-white' : ''}
              ${newTask.status === 'In Progress' ? 'bg-yellow-500 text-black' : ''}
              ${newTask.status === 'Done' ? 'bg-green-500 text-white' : ''}
            `}
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <button type='submit' className="btn btn-accent w-full">Add Task</button>
        </div>
      </form>


      {/* Priority Tasks List */}
      {priorityTasks.length > 0 && (
        <div className="mt-8 mb-4">
          <h2 className="text-xl font-bold mb-4">Priority Tasks</h2>
          <ul className="space-y-2">
            {priorityTasks.map(taskId => {
              const task = tasks.find(t => t._id === taskId);
              if (!task) return null;
              return (
                <li key={taskId} className="p-4 border rounded-lg text-center mb-4">
                  <h3 className="text-lg font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                  <p>{task.status}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Task List */}
      <div className="flex flex-wrap gap-4">
        {tasks.map(task => (
          <div
            key={task._id}
            className="relative p-4 border rounded-lg w-full md:w-1/4 group"
          >
            {/* Delete Button */}
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="btn btn-circle btn-error btn-xs absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
            {/* Priority Checkbox */}
            <label className="absolute top-2 left-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary mr-2 checked:bg-[url('https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/exclamation-mark.png')] bg-center bg-no-repeat bg-cover"
                checked={priorityTasks.includes(task._id)}
                onChange={(e) => handleUpdateTask(task._id, { 'priority': e.target.checked })}
              />
            </label>
            <h2 className="text-lg font-bold ml-6 text-center">{task.title}</h2>
            <textarea
              className="textarea textarea-bordered w-full text-sm resize-none"
              value={editingTasks[task._id]?.text || task.description}
              onChange={(e) => handleChangeDescription(task._id, e.target.value)}
              onBlur={() => handleSaveDescription(task._id)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveDescription(task._id)}
            />
            <select
              className={`
                select select-bordered w-full text-center
                ${task.status === 'To Do' ? 'bg-red-500 text-white' : ''}
                ${task.status === 'In Progress' ? 'bg-yellow-500 text-black' : ''}
                ${task.status === 'Done' ? 'bg-green-500 text-white' : ''}
              `}
              value={task.status}
              onChange={(e) => handleUpdateTask(task._id, {'status': e.target.value})}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
