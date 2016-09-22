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

const OrderTabLayout = ({location}) => {
  const getIndex = data => OrderActions.type(data.filterType)

  const getSearchText = selectText => OrderActions.getSearchText(selectText)

  return (
    <div className="weui_tab">
      <WeuiNavbar list={navList} onClick={getIndex} />
      <OrderSearchBar onSearch={getSearchText} />
      <OrderListLayout location={{ pathname: location.pathname }} />
    </div>
  )
}

export default OrderTabLayout
