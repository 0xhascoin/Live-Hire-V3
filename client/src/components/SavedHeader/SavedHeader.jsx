import React from 'react';
import './savedHeader.scss';

const SavedHeader = ({title, darkTheme}) => {
  return (
    <div className={darkTheme ? "saved-header dark" : "saved-header"}>
      <h2 className="header-title">{title}</h2>
    </div>
  )
}

export default SavedHeader;

