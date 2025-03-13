import React, { useState, useEffect } from 'react';

export default function TaskPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do', priority: true },
    { id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress', priority: true },
    { id: 3, title: 'Task 3', description: 'Description 3', status: 'Done', priority: false },
    { id: 4, title: 'Task 4', description: 'Description 4', status: 'Done', priority: false },
    { id: 5, title: 'Task 5', description: 'Description 5', status: 'Done', priority: false },
  ]);

  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });
  const [priorityTasks, setPriorityTasks] = useState([]);
  
  // Setting initially the priority tasks
  useEffect(() => {
    setPriorityTasks(tasks.filter(task => task.priority).map(task => task.id));
  }, []);

  const addTask = () => {
    if (!newTask.title.trim()) return alert('Title cannot be empty');
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: '', description: '', status: 'To Do' });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    setPriorityTasks(priorityTasks.filter(taskId => taskId !== id));
  };

  const updateTask = (id, key, value) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, [key]: value } : task)));
  };

  const handlePriorityChange = (taskId) => {
    if (priorityTasks.includes(taskId)) {
      setPriorityTasks(priorityTasks.filter(id => id !== taskId));
    } else {
      setPriorityTasks([...priorityTasks, taskId]);
    }
  };

  return (
    <div className="p-6 max-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* Add Task Form */}
      <div className="mb-4 p-4 border rounded-lg w-full md:w-1/4">
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full mb-2"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
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
        <button onClick={addTask} className="btn btn-accent w-full">Add Task</button>
      </div>

      {/* Priority Tasks List */}
      {priorityTasks.length > 0 && (
        <div className="mt-8 mb-4">
          <h2 className="text-xl font-bold mb-4">Priority Tasks</h2>
          <ul className="space-y-2">
            {priorityTasks.map(taskId => {
              const task = tasks.find(t => t.id === taskId);
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
            key={task.id}
            className="relative p-4 border rounded-lg w-full md:w-1/4 group"
          >
            {/* Delete Button */}
            <button
              onClick={() => deleteTask(task.id)}
              className="btn btn-circle btn-error btn-xs absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
            {/* Priority Checkbox */}
            <label className="absolute top-2 left-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary mr-2 checked:bg-[url('https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/exclamation-mark.png')] bg-center bg-no-repeat bg-cover"
                checked={priorityTasks.includes(task.id)}
                onChange={() => handlePriorityChange(task.id)}
              />
            </label>
            <h2 className="text-lg font-bold ml-6 text-center">{task.title}</h2>
            <p className="ml-6 mb-2">{task.description}</p>
            <select
              className={`
                select select-bordered w-full text-center
                ${task.status === 'To Do' ? 'bg-red-500 text-white' : ''}
                ${task.status === 'In Progress' ? 'bg-yellow-500 text-black' : ''}
                ${task.status === 'Done' ? 'bg-green-500 text-white' : ''}
              `}
              value={task.status}
              onChange={(e) => updateTask(task.id, 'status', e.target.value)}
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
