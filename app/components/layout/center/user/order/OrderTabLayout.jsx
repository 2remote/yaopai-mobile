import React from 'react';

import WeuiNavbar from '../../../../UI/WeuiNavbar';

let navList = [{
  id: '1',
  text: '待付款',
  href: '#/center/u/order/unpayed'
},{
  id: '2',
  text: '待确认',
  href: '#/center/u/order/unconfirmed'
},{
  id: '3',
  text: '进行中',
  href: '#/center/u/order/ongoing'
},{
  id: '4',
  text: '已完成',
  href: '#/center/u/order/completed'
},{
  id: '5',
  text: '已关闭',
  href: '#/center/u/order/closed'
}];

const OrderTabLayout = ({children}) => (
  <div className="weui_tab">
    <WeuiNavbar list={navList}>
    </WeuiNavbar>
    <div className="weui_tab_bd">
      {children}
    </div>
  </div>
);

export default OrderTabLayout;