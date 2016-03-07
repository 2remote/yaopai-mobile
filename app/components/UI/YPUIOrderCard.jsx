import React from 'react';

const YPUIOrderCard = ({order}) => (
  <p style={{
    border: '3px solid red',
    marginBottom: '15px'
  }}>
    <div>name: {order.name}</div>
    <div>tel: {order.tel}</div>
  </p>
);

export default YPUIOrderCard;
