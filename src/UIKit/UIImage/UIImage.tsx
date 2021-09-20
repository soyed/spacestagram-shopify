import React from 'react';
import './UIImage.css';
import classNames from 'classnames';

interface UIImageProps {
  image?: string;
  imageAlternative?: string;
  className?: string;
  onClickLike?: () => void;
  onClickMoreInformation?: () => void;
  // isLiked?: boolean;
}

const UIImage: React.FC<UIImageProps> = (props) => {
  const {
    className,
    image,
    imageAlternative,
    onClickMoreInformation,
    // isLiked = true,
  } = props;

  const [isLiked, setIsLiked] = React.useState<boolean>(false);

  const handleLiked = () => {
    setIsLiked((prevState) => !prevState);
  };

  return (
    <div className={classNames('image__container', className)}>
      <img src={image} alt={imageAlternative} />
      <div className='image__overlay'>
        <div className='overlay__action-buttons'>
          <i
            className={classNames(
              'fas fa-heart action-button__heart',
              `${isLiked ? 'action-button__heart--active' : ''}`,
              {
                'text-white': !isLiked,
                'text-red-600': isLiked,
              }
            )}
            onClick={handleLiked}
          ></i>
          <i
            className={classNames('fas fa-info action-button__info')}
            onClick={onClickMoreInformation}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default UIImage;
