import React from 'react';

export const ButtonBlock = ({buttonType, value, handleSubmit}) => (
  <div className="btn-block">
    <a className={`btn ${buttonType}`} onClick={handleSubmit} href="javascript:void(0);">
      {value}
    </a>
  </div>
)

export const ButtonAttention = ({buttonType, value, handleSubmit}) => (
  <div className="btn-attention">
    <a className={`btn ${buttonType}`} onClick={handleSubmit} href="javascript:void(0);">
      <i className="icon attention"/>&nbsp;&nbsp;
      {value}
    </a>
  </div>
)
