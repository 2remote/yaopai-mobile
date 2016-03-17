import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import { OrderStatus } from '../../../../Tools';

import YPUIOrderCard from '../../../../UI/YPUIOrderCard.jsx';
import OrderStore from '../../../../../stores/OrderStore';
import { History } from 'react-router';
import OrderActions from '../../../../../actions/OrderActions';

class OrderListLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      filterType: OrderStatus.UNPAYED,
      orders: []
    };
  }
  componentDidMount() {
    // 手动为默认展示选择“待付款”栏数据
    OrderActions.type(OrderStatus.UNPAYED);
    OrderActions.list('out');
  }
  onOrderLoad(order) {
    // TODO: if else and more
    this.setState({
      filterType: order.filterType,
      orders: order.orders
    });
  }
  render() {
    return (
      <div>
        {
          this.state.orders.map((order, index) => {
            if(OrderStatus.parse(order.State) !== this.state.filterType) return;
            return <YPUIOrderCard order={order} key={index}/>;
          }
        )}
        <div
          style={{
            padding: '20px 15px 10px',
            fontSize: '12px'
          }}
          className="color_gray text_center">
          温馨提示：交易过程中如有异常<br />
          请拨打客服热线：0371-65337727
        </div>
      </div>
    );
  }
}

ReactMixin.onClass(OrderListLayout, Reflux.listenTo(OrderStore, 'onOrderLoad'));

export {OrderListLayout as default};