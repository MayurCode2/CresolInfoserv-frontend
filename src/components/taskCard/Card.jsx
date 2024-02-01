import React, { useState } from 'react';
import './Card.css';
import { AiFillDelete } from 'react-icons/ai';
import { LuClipboardEdit } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { updateTaskStatus, deleteTask, updateTaskById } from '../../slices/taskSlice';

const Card = ({ _id, title: initialTitle, description: initialDescription, completed: initialCompleted, createdAt }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [completed, setCompleted] = useState(initialCompleted);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    // Dispatch action to update task status
    await dispatch(updateTaskStatus({ taskId: _id, completed, title, description }));

    // Dispatch action to update task data
    await dispatch(updateTaskById({ taskId: _id, updatedData: { title, description } }));

    setIsEditing(false);
  };

  const handleDelete = () => {
    // Dispatch action to delete task
    dispatch(deleteTask(_id));
  };

  return (
    <div className={`task-card ${completed ? 'completed' : 'incomplete'}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            id="editTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
          <textarea
            id="editDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            id="editStatus"
            value={completed ? 'true' : 'false'}
            onChange={(e) => setCompleted(e.target.value === 'true')}
          >
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <div className="task-header">
            <h2 className="task-title">{title}</h2>
            <p className={`task-status ${completed ? 'completed' : 'in-progress'}`}>
              {completed ? 'Completed' : 'Pending'}
            </p>
          </div>
          <div className='description-con'>
          <p className="task-description">{description}</p>
          </div>
          <p className="task-date">Due Date: {new Date(createdAt).toLocaleString()}</p>
          <div className="task-actions">
            <button className="delete-btn" onClick={handleDelete}>
              <AiFillDelete size={20} />
            </button>
            <button className="edit-btn" onClick={handleEdit}>
              <LuClipboardEdit size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
