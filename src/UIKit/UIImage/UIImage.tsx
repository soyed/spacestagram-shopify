import React from 'react';
import './UIImage.css';
import classNames from 'classnames';

interface UIImageProps {
  image?: string;
  imageAlternative?: string;
  className?: string;
  onClickLike?: () => void;
  onClickMoreInformation?: () => void;
}

const UIImage: React.FC<UIImageProps> = (props) => {
  const { className, image, imageAlternative, onClickMoreInformation } = props;
  return (
    <div className={classNames('image__container', className)}>
      <img src={image} alt={imageAlternative} />
      <div className='image__overlay'>
        <div className='overlay__action-buttons'>
          <i className='fas fa-heart action-button__heart'></i>
          <i
            className='fas fa-info action-button__info'
            onClick={onClickMoreInformation}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default UIImage;
