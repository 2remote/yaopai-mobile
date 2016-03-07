import React from 'react';

import OrderListLayout from './OrderListLayout.jsx';
import WeuiNavbar from '../../../../UI/WeuiNavbar';

let navList = [{
  id: '1',
  text: '待付款'
},{
  id: '2',
  text: '待确认'
},{
  id: '3',
  text: '进行中'
},{
  id: '4',
  text: '已完成'
},{
  id: '5',
  text: '已关闭'
}];

const OrderTabLayout = () => (
  <div className="weui_tab">
    <WeuiNavbar list={navList}>
    </WeuiNavbar>
    <div className="weui_tab_bd">
      <OrderListLayout />
    </div>
  </div>
);

export default OrderTabLayout;