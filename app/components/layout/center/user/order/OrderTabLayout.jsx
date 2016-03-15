import React from 'react';

import OrderListLayout from './OrderListLayout.jsx';
import WeuiNavbar from '../../../../UI/WeuiNavbar';

let navList = [{
  text: '待付款'
},{
  text: '待确认'
},{
  text: '进行中'
},{
  text: '已完成'
},{
  text: '已关闭'
}];

const OrderTabLayout = () => (
  <div className="weui_tab">
    <WeuiNavbar list={navList} />
    <div className="weui_tab_bd">
      <OrderListLayout />
    </div>
  </div>
);

export default OrderTabLayout;