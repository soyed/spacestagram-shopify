import React from 'react';
import './CardActionBar.css';
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
    <div className='flex bg-purple-100 justify-evenly items-center w-4/5 mb-8 mt-10 h-24 rounded text-black p-6'>
      {/* Select Explore and Like page */}
      <div className='flex justify-evenly items-center'>
        <h2 className='' onClick={onClickExplore}>
          Explore
        </h2>
        <h2 className='' onClick={onClickLiked}>
          Liked
        </h2>
      </div>
      {/* Data Picker to fetch Data */}
      {/* Date must be between Jun 16, 1995 and Sep 19, 2021 -  date allowed */}
      <DateRangePicker value={selectedDate} onChange={handleSelectedDate} />
    </div>
  );
};

export default CardActionBar;
