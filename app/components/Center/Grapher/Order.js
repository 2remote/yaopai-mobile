'use strict';
import React from 'react';

import WeuiNavbar from '../../UI/WeuiNavbar';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      navList: [{
        text: '待付款'
      },{
        text: '待确认'
      },{
        text: '进行中'
      },{
        text: '已完成'
      },{
        text: '已关闭'
      }]
    }
  }
  render() {
    return (
      <WeuiNavbar list={this.state.navList}>
      </WeuiNavbar>
    );
  }
}

export { Order as default };