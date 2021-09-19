import React from 'react';

const Header: React.FC = (props) => {
  return (
    <div className='flex h- justify-between items-center h-header-height'>
      <h1 className='font-header-font text-7xl ml-40'>Spacestagram</h1>
      <p className='text-2xl mr-20'>API Credit: NASA API - APOD</p>
    </div>
  );
};

export default Header;
