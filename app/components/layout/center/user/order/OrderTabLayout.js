import React from 'react';

import OrderListLayout from './OrderListLayout';
import WeuiNavbar from '../../../../UI/WeuiNavbar';
import { OrderStatus } from '../../../../Tools';
import OrderActions from '../../../../../actions/OrderActions';

let navList = [{
  filterType: OrderStatus.UNPAYED,
  text: '待付款'
},{
  filterType: OrderStatus.UNCONFIRMED,
  text: '待确认'
},{
  filterType: OrderStatus.ONGOING,
  text: '进行中'
},{
  filterType: OrderStatus.COMPLETE,
  text: '已完成'
},{
  filterType: OrderStatus.CLOSED,
  text: '已关闭'
}];

class OrderTabLayout extends React.Component{
  /**
   * 我也不知道为什么要把整个data传出来
   * @param data
   */
  getIndex(data) {
    OrderActions.type(data.filterType);
  }
  render() {
    return (
	    <div className="weui_tab">
		    <WeuiNavbar list={navList} onClick={this.getIndex.bind(this)} />
        <OrderListLayout location={{ pathname: this.props.location.pathname }} />
	    </div>
    );
  }
}

export default OrderTabLayout;
