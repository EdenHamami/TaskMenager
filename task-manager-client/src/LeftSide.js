import React, { useState } from 'react'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { setDate } from './redux/dateSlice';
import './LeftSide.css'
function LeftSide() {
    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.date.selectedDate);
    const [value, setValue] = useState(dayjs(selectedDate));

    const handleSelectDate = (newValue) => {
      const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
      setValue(newValue);
      dispatch(setDate(formattedDate));
    };
  return (
    <div className='left-side'>
        <div className="quote">
          <p>"The way to get started is to quit talking and begin doing"</p>
          <p className="author">Walt Disney</p>
        </div>
        <div className="calendar-section">
          <DateCalendar
            value={value}
            onChange={handleSelectDate}
            sx={{
              '.Mui-selected': {
                backgroundColor: '#509EB1',
                '&:hover': {
                  backgroundColor: '#509EB1',
                },
              },
            }
        }
          />
        </div>

    </div>
  )
}

export default LeftSide