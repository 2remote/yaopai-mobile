import React from 'react';

import PurseListLayout from './PurseListLayout.jsx';
import WeuiNavbar from '../../../../UI/WeuiNavbar';
import { OrderStatus } from '../../../../Tools';
import OrderActions from '../../../../../actions/OrderActions';

let navList = [{
  filterType: 'Completed',
  text: '全部'
},{
  filterType: 'Compensative',
  text: '收入'
},{
  filterType: 'Order',
  text: '补偿'
},{
  filterType: 'Withdrew',
  text: '提现'
}];

let whichSelect = 0;
class OrderTabLayout extends React.Component{
  /**
   * 我也不知道为什么要把整个data传出来
   * @param data
   */
  getIndex(data,index) {
    switch (index) {
      case 0 :
        whichSelect = 'Completed';
        break;
      case 1 :
        whichSelect = 'order';
        break;
      case 2 :
        whichSelect = 'Compensative';
        break;
      case 3 :
        whichSelect = 'Withdrew';
        break
    }
  }
  render() {
    return (
      <div className="weui_tab">
        <WeuiNavbar list={navList} onClick={this.getIndex.bind(this)} />
        <div className="weui_tab_bd">
          <PurseListLayout whichSelect={whichSelect} />
        </div>
      </div>
    );
  }
}

export default OrderTabLayout;