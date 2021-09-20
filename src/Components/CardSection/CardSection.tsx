import React from 'react';
import { parseSelectedDates, setDefaultDate } from '../../utils';
import CardActionBar from '../CardActionBar/CardActionBar';
import CardList from '../CardList/CardList';

const CardSection: React.FC = (props) => {
  const [showExplore, setShowExplore] = React.useState<boolean>(true);

  const [selectedDate, setSelectedDate] = React.useState<any[]>(
    setDefaultDate(true)
  );

  const showExploreSection = () => {
    setShowExplore(true);
  };

  const showLikedSection = () => {
    setShowExplore(false);
  };

  const handleSelectedDates = (dateToFetch: string[]) => {
    setSelectedDate(dateToFetch);
    const data = parseSelectedDates(dateToFetch);
  };

  return (
    <div className='flex flex-col justify-center items-center w-screen '>
      <CardActionBar
        onClickExplore={showExploreSection}
        onClickLiked={showLikedSection}
        dateToFetch={handleSelectedDates}
      />
      <CardList
        isExploreActive={showExplore}
        selectedDate={parseSelectedDates(selectedDate)}
      />
    </div>
  );
};

export default CardSection;
