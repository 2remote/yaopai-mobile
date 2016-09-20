import React from 'react'
import Reflux from 'reflux'
import {LoadingToast} from '../../../../UI/WeuiToast'

import ReactMixin from 'react-mixin'
import { OrderStatus } from '../../../../Tools'
import Toaster from '../../../../Toast'
import YPUIOrderCard from '../../../../UI/YPUIOrderCard'
import OrderStore from '../../../../../stores/OrderStore'
import UserStore from '../../../../../stores/UserStore'
import { History } from 'react-router'
import OrderActions from '../../../../../actions/OrderActions'
import UserActions from '../../../../../actions/UserActions'

import AutoLoadPageMixin from '../../../../AutoLoadPageMixin';

class OrderListLayout extends React.Component {
  constructor() {
    super()
    this.state = {
      pageIndex: 1, // 当前页
      pageCount: 0, // 总页数
      total: 0,
      filterType: OrderStatus.UNPAYED,
      orders: [],
      hintMessage: '订单加载中。。。',
      success: false,
      componentName: 'OrderListLayout', // 请和组件的名字保持一致
    }
  }

  componentDidMount() {
    UserActions.currentUser()
  }

  onUserLoad(user) {
    if (!user.isLogin) { // 用户未登录，跳转登录页
      this.history.pushState({nextPage: this.props.location.pathname}, '/login_page')
    } else {
      // 手动为默认展示选择“待付款”栏数据
      OrderActions.type(OrderStatus.UNPAYED)
      // 可传递三个参数，具体请看 OrderAction.js
      OrderActions.list('out', '', 1)
      this.setState({userType: user.userType})
    }
  }

  onOrderLoad(order) {
    // TODO: if else and more
    let newOrderlist = []
    if(order.orders.length === this.state.orders.length) {
      newOrderlist = order.orders
    } else {
      newOrderlist = this.state.orders.concat(order.orders)
    }
    this.setState({
      pageIndex: order.pageIndex,
      total: order.total,
      pageCount: order.pageCount,
      filterType: order.filterType,
      orders: newOrderlist,
      hintMessage: order.hintMessage,
      success: order.success,
    })
  }

  // AutoLoadPageMixin 回调函数，orderList 滚动到底部执行
  onChangePage(pageIndex) {
    this.onShowToast('努力加载中...')
    OrderActions.list('out', '', pageIndex)
  }

  render() {
    let theRealList
    if (this.state.success) {
      let isOrderNull = true
      theRealList = this.state.orders.map((order, index) => {
        if (OrderStatus.parse(order.State) !== this.state.filterType) return
        isOrderNull = false
        return <YPUIOrderCard order={order} key={index} utype={this.state.userType}/>
      })
      //列表为空时渲染内容
      if (isOrderNull) {
        theRealList =
          <section className="text_center">
            <div style={{ padding:'50px 0' }}>
              <i className="weui_icon_msg weui_icon_waiting"/>
              <p>暂无数据</p>
            </div>
          </section>
      }
    }

    //列表不为空时渲染内容
    return (
      <div className="weui_tab_bd" id="orderListContainer">
        <Toaster ref="toast" isWorkPage={true} bottom={true} duration="1000000"/>
        <section id="orderList">{theRealList}</section>
        <aside className="footer color_gray text_center font_small">
          温馨提示：交易过程中如有异常<br />
          请拨打客服热线：<a className="color_green" href="tel:400-876-5981">400-876-5981</a>
        </aside>
      </div>
    )
  }
}

ReactMixin.onClass(OrderListLayout, Reflux.listenTo(OrderStore, 'onOrderLoad'))
ReactMixin.onClass(OrderListLayout, Reflux.listenTo(UserStore, 'onUserLoad'))
ReactMixin.onClass(OrderListLayout, History)
ReactMixin.onClass(OrderListLayout, AutoLoadPageMixin)

export {OrderListLayout as default}
