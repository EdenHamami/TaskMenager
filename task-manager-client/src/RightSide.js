import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddTaskButton from './AddTaskButton';
import dayjs from 'dayjs';
import TasksList from './TasksList';
import { addTask } from './redux/tasksSlice';
import { createTask } from './api/tasksApi';
import "./RightSide.css"
function RightSide() {
    const dispatch = useDispatch();
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
    };
  
  return (
    <div className='right-side'>
<header className="right-side-header">
<h2>{dayjs(selectedDate).format('ddd, D.M')}</h2>
</header>
<section className="tasks-list">
<TasksList/>
      </section>
      <div className='add-task'>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Task Title'
      />
      <input
      type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Task Content'
      ></input>


      <button onClick={handleAddTask}>Add Task</button>
    </div>
    </div>
  )
}

export default RightSide