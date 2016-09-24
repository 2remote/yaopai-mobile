import React from 'react'

import PurseListLayout from './PurseListLayout'
import WeuiNavbar from '../../../../UI/WeuiNavbar'
import { OrderStatus } from '../../../../Tools'
import UserFundActions from '../../../../../actions/UserFundActions'

let navList = [{
  filterType: 'Completed',
  text: '全部'
},{
  filterType: 'Order',
  text: '收入'
},{
  filterType: 'Compensative',
  text: '补偿'
},{
  filterType: 'Withdrew',
  text: '提现'
}]

let whichSelect = 0
class OrderTabLayout extends React.Component{
  /**
   * 我也不知道为什么要把整个data传出来
   * @param data
   */
  getIndex(data) {
    UserFundActions.type(data.filterType)
  }
  render() {
    return (
      <div className="weui_tab">
        <WeuiNavbar list={navList} onClick={this.getIndex.bind(this)} />
        <PurseListLayout location={{ pathname: this.props.location.pathname }} />
      </div>
    )
  }
}

export default OrderTabLayout
