import React from 'react';

import YPUIOrderCard from  '../../../../UI/YPUIOrderCard.jsx';

let sampleOrderList = [{
  name: 'YaoPai',
  tel: '13311223344'
}, {
  name: 'YaoPai2',
  tel: '13311223344'
}];

const OrderListLayout = () => (
  <div>
    {sampleOrderList.map((order, index) =>
      <YPUIOrderCard order={order} key={index}/>
    )}
  </div>
);

export default OrderListLayout;