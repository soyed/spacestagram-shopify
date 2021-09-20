import React from 'react';
import './UICard.css';
import classNames from 'classnames';
import UIActionButton from '../UIActionButton/UIActionbutton';

interface UICardProps {
  title?: string;
  description?: string;
  copyright?: string;
  image?: string;
  imageAlternative?: string;
  datePosted?: string;
  cardClassName?: string;
  isLiked?: boolean;
  onClickLike?: () => void;
  onClickMoreInfo?: () => void;
  closeShowInfoModal?: () => void;
}

const UICard: React.FC<UICardProps> = (props) => {
  const {
    cardClassName,
    image,
    imageAlternative,
    title,
    copyright,
    datePosted,
    description,
    onClickLike,
    onClickMoreInfo,
    isLiked,
    closeShowInfoModal,
  } = props;
  return (
    <div className={classNames('card', cardClassName)}>
      {/* Img section */}
      <div className='card--img__content'>
        <img src={image} alt={imageAlternative} />
      </div>
      {/* Content section */}
      <div className='card__content'>
        <h2 className='card--content__title'>{title}</h2>
        {copyright !== undefined && (
          <p className='card--content__copyright'>&copy;{copyright}</p>
        )}
        <p className='card--content__Date'>Date Posted: {datePosted}</p>
        <p className='card--content__description'>{description}</p>
        <hr className='my-6' />
        <UIActionButton
          isLiked={isLiked}
          onClickMoreInformation={onClickMoreInfo}
          onClickLike={onClickLike}
          className={'justify-between w-full'}
          showClose={true}
          onClickClose={closeShowInfoModal}
        />
      </div>
    </div>
  );
};

export default UICard;
