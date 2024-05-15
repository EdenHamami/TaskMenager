import React, { useState } from 'react';
import TasksList from './TasksList';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from './redux/dateSlice';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import AddTaskButton from './AddTaskButton';
import './HomePage.css';
import RightSide from './RightSide';
import LeftSide from './LeftSide';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedDate = useSelector(state => state.date.selectedDate);
  const [value, setValue] = useState(dayjs(selectedDate));

  const handleAddTaskClick = () => {
    navigate('/addTask');
  };

  const handleSelectDate = (newValue) => {
    const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
    setValue(newValue);
    dispatch(setDate(formattedDate));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="home-page">
<LeftSide/>
<RightSide/>
</div>
    </LocalizationProvider>
  );
}

export default HomePage;
