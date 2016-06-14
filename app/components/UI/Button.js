import React from 'react';

export const ButtonBlock = ({buttonType, value, handleSubmit}) => (
  <div className="btn-block" onClick={handleSubmit}>
    <a className={`btn ${buttonType}`} href="javascript:void(0);">
      {value}
    </a>
  </div>
)
