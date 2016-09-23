import React from 'react'
import OrderListLayout from './OrderListLayout'
import WeuiNavbar from '../../../../UI/WeuiNavbar'
import { OrderStatus } from '../../../../Tools'
import OrderActions from '../../../../../actions/OrderActions'
import OrderSearchBar from './OrderSearchBar'

const navList = [
  {
    filterType: OrderStatus.ALL,
    text: '全部订单'
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
  }]

class OrderTabLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchSwitch: 0,
    }
  }

  getIndex(data) {
    this.setState({
      searchSwitch: data.filterType
    })
    OrderActions.type(data.filterType)
  }

  getSearchText(selectText){
    OrderActions.getSearchText(selectText)
  }

  render() {
    return (
      <div className="weui_tab">
        <WeuiNavbar list={navList} onClick={this.getIndex.bind(this)} />
        { this.state.searchSwitch == 0 ? <OrderSearchBar onSearch={this.getSearchText} /> : null }
        <OrderListLayout location={{ pathname: this.props.location.pathname }} />
      </div>
    )
  }
}

export default OrderTabLayout
