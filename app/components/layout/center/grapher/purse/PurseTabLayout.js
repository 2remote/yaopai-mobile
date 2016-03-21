import React from 'react';

import PurseListLayout from './PurseListLayout.jsx';
import WeuiNavbar from '../../../../UI/WeuiNavbar';
import { OrderStatus } from '../../../../Tools';
import OrderActions from '../../../../../actions/OrderActions';

let navList = [{
  filterType: OrderStatus.UNPAYED,
  text: '全部'
},{
  filterType: OrderStatus.UNCONFIRMED,
  text: '收入'
},{
  filterType: OrderStatus.ONGOING,
  text: '补偿'
},{
  filterType: OrderStatus.COMPLETE,
  text: '提现'
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
        <div className="weui_tab_bd">
          <PurseListLayout location={{ pathname: this.props.location.pathname }} />
        </div>
      </div>
    );
  }
}

export default OrderTabLayout;