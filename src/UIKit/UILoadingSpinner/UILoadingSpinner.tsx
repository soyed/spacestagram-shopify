import React from 'react';
import './UILoadingSpinner.css';
import classNames from 'classnames';
interface UILoadingSpinnerProps {
  spinnerClassName?: string;
  containerClassName?: string;
}

const UILoadingSpinner: React.FC<UILoadingSpinnerProps> = (props) => {
  const { spinnerClassName, containerClassName } = props;
  return (
    <div className={containerClassName}>
      <div className={classNames('spinner', spinnerClassName)}></div>
    </div>
  );
};

export default UILoadingSpinner;
