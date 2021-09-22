import React from 'react';
import './UIImage.css';
import classNames from 'classnames';
import UIActionButton from '../UIActionButton/UIActionbutton';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface UIImageProps {
  image?: string;
  lazyImage?: string;
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
    lazyImage,
  } = props;

  return (
    <div className={classNames('image__container', className)}>
      <LazyLoadImage
        src={image}
        alt={imageAlternative}
        visibleByDefault={true}
        effect={'blur'}
        delayTime={'50'}
      />
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
