import React from 'react';
import './UIModal.css';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames';

interface UIModalProps {
  onClickBackdrop?: () => void;
}

interface UIModalOverlayProps {
  // children?: React.ReactNode;
}

interface UIModalBackdropProps {
  onClick?: () => void;
}

const UIModalBackdrop: React.FC<UIModalBackdropProps> = (props) => {
  const { onClick } = props;
  return (
    <div
      className={ClassNames('backdrop', 'bg-purple-100')}
      onClick={onClick}
    ></div>
  );
};

const UIModalOverlay: React.FC<UIModalOverlayProps> = (props) => {
  const { children } = props;
  return <div className='overlay'>{children}</div>;
};

const UIModal: React.FC<UIModalProps> = (props) => {
  const { children, onClickBackdrop } = props;
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <UIModalBackdrop onClick={onClickBackdrop} />
          <UIModalOverlay children={children} />
        </>,
        document.getElementById('modal-root')!
      )}
    </>
  );
};

export default UIModal;
