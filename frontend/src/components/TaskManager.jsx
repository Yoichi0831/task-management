import React, { useState } from 'react';
import Signup from './Signup.jsx';

export default function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do' },
    { id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress' },
    { id: 3, title: 'Task 3', description: 'Description 3', status: 'Done' },
    { id: 4, title: 'Task 4', description: 'Description 4', status: 'Done' },
    { id: 5, title: 'Task 5', description: 'Description 5', status: 'Done' },
  ]);

  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });
  
  const addTask = () => {
    if (!newTask.title.trim()) return alert('Title cannot be empty');
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: '', description: '', status: 'To Do' });
  };

  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));

  const updateTask = (id, key, value) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, [key]: value } : task)));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* Login & Signup Buttons */}
      <div className="mb-4 p-4 border rounded-lg flex flex-col gap-2">
        <button className="btn btn-primary">Signup</button>
        <button className="btn btn-secondary">Login</button>
      </div>

      {/* Signup Form */}
      <Signup />

      {/* Add Task Form */}
      <div className="mb-4 p-4 border rounded-lg flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full text-center"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select
          className="select select-bordered w-full"
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <button onClick={addTask} className="btn btn-accent w-full">Add Task</button>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="p-4 border rounded-lg">
            <h2 className="text-lg font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <select
              className="select select-bordered w-full mb-2"
              value={task.status}
              onChange={(e) => updateTask(task.id, 'status', e.target.value)}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            <div className="mt-2">
              <button onClick={() => deleteTask(task.id)} className="btn btn-error text-white w-full">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
