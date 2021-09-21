import React from 'react';
import './UIImage.css';
import classNames from 'classnames';
import UIActionButton from '../UIActionButton/UIActionbutton';

interface UIImageProps {
  image?: string;
  imageAlternative?: string;
  className?: string;
  onClickLike?: () => void;
  onClickMoreInformation?: () => void;
  isLiked?: boolean;
}

const UIImage: React.FC<UIImageProps> = (props) => {
  const {
    className,
    image,
    imageAlternative,
    onClickMoreInformation,
    onClickLike,
    isLiked,
  } = props;

  return (
    <div className={classNames('image__container', className)}>
      <img src={image} alt={imageAlternative} />
      <div className='image__overlay'>
        <UIActionButton
          isLiked={isLiked}
          onClickLike={onClickLike}
          onClickMoreInformation={onClickMoreInformation}
        />
      </div>
    </div>
  );
};

export default UIImage;
