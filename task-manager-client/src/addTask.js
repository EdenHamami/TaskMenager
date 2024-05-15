import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from './redux/tasksSlice';
import { createTask } from './api/tasksApi';
import './AddTask.css';
import { useNavigate } from 'react-router-dom';

function AddTask() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const selectedDate = useSelector(state => state.date.selectedDate);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddTask = async () => {
    const newTask = {
      title,
      content,
      date: selectedDate,
      isCompleted: false,
    };
    const response = await createTask(newTask);
    dispatch(addTask(response.data));
    setTitle('');
    setContent('');
    navigate('/')
  };

  return (
    <div className='add-task'>
      <p>Selected Date: {selectedDate}</p>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Task Title'
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Task Content'
      ></textarea>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default AddTask;
