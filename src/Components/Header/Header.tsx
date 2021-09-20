import React from 'react';

const Header: React.FC = (props) => {
  return (
    <div className='flex justify-between items-center h-header-height sm:flex-col sm:justify-center'>
      <h1 className='font-header-font text-7xl ml-40 sm:ml-0  sm:my-8'>
        Spacestagram
      </h1>
      <p className='text-2xl sm:text-xl mr-20 sm:mr-0'>
        API Credit: NASA API - APOD
      </p>
    </div>
  );
};

export default Header;
