import React from 'react';

import OrderListLayout from './OrderListLayout.jsx';
import WeuiNavbar from '../../../../UI/WeuiNavbar';

import OrderActions from '../../../../../actions/OrderActions';

let navList = [{
  filterType: ['WaitingPayment'],
  text: '待付款'
},{
  filterType: ['WaitingReception'],
  text: '待确认'
},{
  filterType: ['WaitingDelivery', 'WaitingAcceptance'],
  text: '进行中'
},{
  filterType: ['Completed'],
  text: '已完成'
},{
  filterType: ['Cloesd'], // TODO: 这个拼写错误需要认真验证
  text: '已关闭'
}];

class OrderTabLayout extends React.Component{
  /**
   * 我也不知道为什么要把整个data传出来
   * @param data
   */
  getIndex(data) {
    console.log(data);
    OrderActions.type(data.filterType);
  }
  render() {
    return (
	    <div className="weui_tab">
		    <WeuiNavbar list={navList} onClick={this.getIndex.bind(this)} />
		    <div className="weui_tab_bd">
			    <OrderListLayout />
		    </div>
	    </div>
    );
  }
}

export default OrderTabLayout;