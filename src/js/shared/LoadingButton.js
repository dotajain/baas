import React from 'react';
const LoadingButton = ({...props}) => {
  let buttonTitle = props.title;
  if (props.fetching) {
    buttonTitle = <span><i className="fa fa-spinner fa-pulse fa-fw"></i><span className="sr-only">Loading...</span></span>;
  }
  return (
    <button type={props.type} className={`loading ${props.className}`} onClick={props.onClick}>
      {buttonTitle}
    </button>
  );
}

export default LoadingButton;
