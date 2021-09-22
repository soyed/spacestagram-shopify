import React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { setDefaultDate } from '../../utils';

interface CardActionBarProps {
  onClickExplore?: () => void;
  onClickLiked?: () => void;
  dateToFetch: (selectedDate: string[]) => void;
}

const CardActionBar: React.FC<CardActionBarProps> = (props) => {
  const { onClickExplore, onClickLiked, dateToFetch } = props;

  const [selectedDate, setSelectedDate] = React.useState<any[]>(
    setDefaultDate(false)
  );

  const handleSelectedDate = (date: Date[]) => {
    dateToFetch([date[0].toISOString(), date[1].toISOString()]);
    setSelectedDate(date);
  };

  return (
    <div className='flex bg-purple-100 justify-between items-center w-4/5 mb-8 mt-10 h-24 rounded text-black p-6 sm:flex-col sm:justify-evenly sm:h-auto'>
      {/* Select Explore and Like page */}
      <div className='flex justify-evenly items-center ml-8 sm:ml-0 sm:mb-8'>
        <h2
          className='mr-9 hover:text-white hover:bg-purple-500 active:bg-purple-800 p-4 font-bold text-3xl active:shadow-lg transition-all cursor-pointer'
          onClick={onClickExplore}
        >
          Explore
        </h2>
        <h2
          className='hover:text-white  text-3xl  hover:bg-purple-500 active:bg-purple-800 p-4 font-bold active:shadow-lg transition-all cursor-pointer'
          onClick={onClickLiked}
        >
          Liked
        </h2>
      </div>
      {/* Data Picker to fetch Data */}
      <DateRangePicker
        value={selectedDate}
        onChange={handleSelectedDate}
        minDate={new Date(1995, 5, 16)}
      />
    </div>
  );
};

export default CardActionBar;
