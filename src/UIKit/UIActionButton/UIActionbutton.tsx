import React from 'react';
import './UIActionButton.css';
import classNames from 'classnames';

interface UIActionButtonProps {
  isLiked?: boolean;
  onClickLike?: () => void;
  onClickMoreInformation?: () => void;
  onClickClose?: () => void;
  className?: string;
  showClose?: boolean;
}

const UIActionButton: React.FC<UIActionButtonProps> = (props) => {
  const {
    isLiked,
    onClickLike,
    onClickMoreInformation,
    className,
    showClose = false,
    onClickClose,
  } = props;

  return (
    <div className={classNames('overlay__action-buttons', className)}>
      <i
        className={classNames(
          'fas fa-heart action-button__heart',
          `${isLiked ? 'action-button__heart--active' : ''}`,
          {
            'text-white': !isLiked,
            'text-red-600 hover:text-white': isLiked,
          }
        )}
        onClick={onClickLike}
      ></i>
      {!showClose ? (
        <i
          className={classNames('fas fa-info action-button__info')}
          onClick={onClickMoreInformation}
        ></i>
      ) : (
        <i
          className='fas fa-times action-button__close'
          onClick={onClickClose}
        ></i>
      )}
    </div>
  );
};

export default UIActionButton;
