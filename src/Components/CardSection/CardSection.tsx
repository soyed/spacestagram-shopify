import React from 'react';
import CardList from '../CardList/CardList';

const CardSection: React.FC = (props) => {
  return (
    <div className='flex flex-col justify-center items-center w-screen flex-1'>
      <CardList />
    </div>
  );
};

export default CardSection;
