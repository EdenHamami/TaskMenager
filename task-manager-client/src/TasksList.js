import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasksByDate } from './redux/tasksSlice';
import TaskItem from './TaskItem';
function TasksList() {
    const tasks=useSelector(state=>state.tasks.tasks);
    const selectedDate=useSelector(state=>state.date.selectedDate)
    const dispatch=useDispatch()
    useEffect(() => {
        dispatch(fetchTasksByDate(selectedDate));
      }, [dispatch, selectedDate]);
  
      return (
    <div>
        {tasks.map(t=>(
            <TaskItem key={t.id} task={t}/>
        ))}
    </div>
  )
}

export default TasksList