


import React, { useState } from 'react';
import './TaskComponent.css';
import { useDispatch } from 'react-redux';
import { createTask } from '../../slices/taskSlice';


function TaskComponent() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
    const handleCreateTask = () => {
      // Dispatch action to create a new task
      dispatch(createTask({ title, description }));
      // Clear input fields after creating the task
      setTitle('');
      setDescription('');
    };
  
    return (
      <div className="task-container">
        <div className="task-input">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
  
        <div className="task-input">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
  
        <button onClick={handleCreateTask}>Create Task</button>
      </div>
    );
  }
  
  export default TaskComponent;
  