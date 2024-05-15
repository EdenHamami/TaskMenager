import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, toggleTaskCompletion } from './redux/tasksSlice';
import { deleteTask } from './api/tasksApi';
import './TaskItem.css';

function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [isContentOpen, setIsContentOpen] = useState(false);

  const handleDelete = async () => {
    await deleteTask(task.id);
    dispatch(removeTask(task.id));
  };

  const handleToggleCompletion = () => {
    dispatch(toggleTaskCompletion(task.id));
  };

  const handleToggleContent = () => {
    setIsContentOpen(!isContentOpen);
  };

  return (
    <div className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
      <div className="checkbox-wrapper">
        <input type="checkbox" checked={task.isCompleted} onChange={handleToggleCompletion} />
      </div>
      <div className="task-title-and-content">
        <div className="task-title" onClick={handleToggleContent}>
          {task.title}
          <span className="read-more">
            {isContentOpen ? 'Read less ▲' : 'Read more ▼'}
          </span>
        </div>
        {isContentOpen && (
          <div className="task-content">
            {task.content}
            <a href="#!" className="read-less" onClick={handleToggleContent}>Close ▲</a>
          </div>
        )}
        <div className="task-controls">
          <button className="control-icon delete-icon" onClick={handleDelete}>🗑️</button>
          <button className="control-icon edit-icon">✎</button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
