import React from 'react'
import Reflux from 'reflux'
import {LoadingToast} from '../../../../UI/WeuiToast'

import ReactMixin from 'react-mixin'
import { OrderStatus } from '../../../../Tools'

import YPUIOrderCard from '../../../../UI/YPUIOrderCard'
import OrderStore from '../../../../../stores/OrderStore'
import UserStore from '../../../../../stores/UserStore'
import { History } from 'react-router'
import OrderActions from '../../../../../actions/OrderActions'
import UserActions from '../../../../../actions/UserActions'

class OrderListLayout extends React.Component {
  constructor() {
    super()
    this.state = {
      filterType: OrderStatus.UNPAYED,
      orders: [],
      hintMessage: '订单加载中。。。',
      success: false
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
      OrderActions.list('out')
      this.setState({userType: user.userType})
    }
  }

  onOrderLoad(order) {
    // TODO: if else and more
    this.setState({
      filterType: order.filterType,
      orders: order.orders,
      hintMessage: order.hintMessage,
      success: order.success
    })
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
      <div>
        {theRealList}
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

export {OrderListLayout as default}
