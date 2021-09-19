import React from 'react';
import './UICard.css';
import classNames from 'classnames';

interface UICardProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlternative?: string;
  datePosted?: string;
  cardClassName?: string;
  isModal?: boolean;
}

const UICard: React.FC<UICardProps> = (props) => {
  const {
    cardClassName,
    image,
    imageAlternative,
    title,
    datePosted,
    description,
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
        <p className='card--content__Date'>{datePosted}</p>
        <p className='card--content__description'>{description}</p>
      </div>
      <div className='card__buttons'></div>
    </div>
  );
};

export default UICard;
