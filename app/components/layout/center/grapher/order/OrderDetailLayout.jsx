import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';
import {LoadingToast} from '../../../../UI/WeuiToast';

import UserActions from '../../../../../actions/UserActions';
import OrderActions from '../../../../../actions/OrderActions';
import UserStore from '../../../../../stores/UserStore';
import OrderStore from '../../../../../stores/OrderStore';

import {Button} from 'react-weui';

class OrderDetailLayout extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      order:{
        Albums:{},
        Photographer:{},
        CreationTime:'',
        PaymentTime:'',
        RefundTime:'',
        DeliveryTime:'',
        CompleteTime:'',
        AppointedTime:'',
        BuyerMemo:''
      },
      success: false
    };
  }

  componentDidMount() {
    UserActions.currentUser();
  }

  onUserLoad(user) {
    if(!user.isLogin){ // 用户未登录，跳转登录页
      this.setState({success: true});
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page');
    } else {
      OrderActions.get(this.props.params.id);
    }
  }

  onOrderLoad(data) {
    this.setState({
      order: data.order,
      success: data.success
    })
  }

  render() {
    const {order} = this.state;
    return (
      <div>
        <LoadingToast displayState={this.state.success ? 'none' : 'block'} />

        <div className="OrderDetailLayout">
          <div className="weui_cells_title">支付流程说明</div>
          <section className="icon_box font_small color_gray">
            <div><i className="icon order_icon" /><br/>提单
            </div><div><i className="icon refund" /><br/>付款
            </div><div><i className="icon grapher_icon" /><br/>拍摄
            </div><div><i className="icon album" /><br/>收片</div>
          </section>
          <div className="weui_cells_title">订单详情</div>

          <article className="ypui_detail_box color_gray">
            <p>
              <span>预约服务</span>
              <span>{order.Albums.Title}</span>
            </p>
            <p>
              <span>预约摄影师</span>
              <span>{order.Photographer.NickName}</span>
            </p>
            <p>
              <span>创建时间</span>
              <span>{order.CreationTime.substring(0,10)}</span>
            </p>
            <p>
              <span>预约日期</span>
              <span>{order.AppointedTime.substring(0,10)}</span>
            </p>
            { order.PaymentTime ?
              <p>
                <span>付款时间</span>
                <span>{order.PaymentTime.substring(0,10)}</span>
              </p>
              : ''
            }
            { order.RefundTime ?
              <p>
                <span>退款时间</span>
                <span>{order.RefundTime.substring(0,10)}</span>
              </p>
              : ''
            }
            { order.DeliveryTime ?
              <p>
                <span>发片时间</span>
                <span>{order.DeliveryTime.substring(0,10)}</span>
              </p>
              : ''
            }
            { order.CompleteTime && !order.RefundTime ?
              <p>
                <span>成交时间</span>
                <span>{order.CompleteTime.substring(0,10)}</span>
              </p>
              : ''
            }
            <p>
              <span>预约姓名</span>
              <span>{order.BuyerName}</span>
            </p>
            <p>
              <span>预约电话</span>
              <span>{order.BuyerTel}</span>
            </p>
            <p>
              <span>备注</span>
              <span>{order.BuyerMemo}</span>
            </p>
          </article>

          <footer className="footer color_gray fr">
            合计：<span className="font_super color_dark">￥{order.Price}</span>
          </footer>
        </div>
      </div>
    );
  }
}

ReactMixin.onClass(OrderDetailLayout, Reflux.listenTo(OrderStore, 'onOrderLoad'));
ReactMixin.onClass(OrderDetailLayout, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(OrderDetailLayout, History);

export default OrderDetailLayout;
