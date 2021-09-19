import React from 'react';
import './UIImage.css';
import classNames from 'classnames';

interface UIImageProps {
  image?: string;
  imageAlternative?: string;
  className?: string;
}

const UIImage: React.FC<UIImageProps> = (props) => {
  const { className, image, imageAlternative } = props;
  return (
    <div className={classNames('image__container', className)}>
      <img src={image} alt={imageAlternative} />
      <div className='image__overlay'>
        <p>hi</p>
        <p>=tr</p>
        <p>=tr</p>
      </div>
    </div>
  );
};

export default UIImage;
