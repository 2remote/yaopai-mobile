import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import WeUI from 'react-weui';
import {Button} from 'react-weui';
import {LoadingToast} from '../../../../UI/WeuiToast';
import { History } from 'react-router';
import $ from 'jquery';
import API from '../../../../../api';
import { OrderStatus } from '../../../../Tools';

import UserActions from '../../../../../actions/UserActions';
import OrderActions from '../../../../../actions/OrderActions';
import UserStore from '../../../../../stores/UserStore';
import OrderStore from '../../../../../stores/OrderStore';
const { CellsTitle } = WeUI;

class OrderDetailLayout extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      order:{
        Albums:{},
        Photographer:{},
        AppointedTime: '',
        CreationTime:'',
        PaymentTime:'',
        RefundTime:'',
        DeliveryTime:'',
        CompleteTime:'',
        BuyerMemo:''
      },
      user: {},
      success: false,
      wexinPayToken: {},
    };
  }

  componentDidMount() {
    UserActions.currentUser();
    //请求 wexinPayToken
    OrderActions.wexinPayToken(this.props.params.id);
  }

  onUserLoad(user) {
    if(!user.isLogin){ // 用户未登录，跳转登录页
      this.setState({success: true});
      // this.history.pushState({nextPage : this.props.location.pathname},'/login_page');
    } else {
      OrderActions.get(this.props.params.id);
      this.setState({
        user: user
      });
    }
  }

  onOrderLoad(data) {
    console.log(data)
    if(data.success){
      this.setState({
        order: data.order,
        success: data.success,
        wexinPayToken: data.wexinPayToken,
      })
    } else {
      console.error(data.hintMessage)
    }
  }

  pay = e => {
    e.preventDefault();
    let self = this;
    alert(self.state.wexinPayToken.AppId)
    alert(self.state.wexinPayToken.TimeStamp)
    alert(self.state.wexinPayToken.NonceStr)
    alert(self.state.wexinPayToken.Package)
    alert(self.state.wexinPayToken.PaySign)
    function onBridgeReady(){
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": self.state.wexinPayToken.AppId,     //公众号名称，由商户传入
          "timeStamp": self.state.wexinPayToken.TimeStamp,         //时间戳，自1970年以来的秒数
          "nonceStr": self.state.wexinPayToken.NonceStr, //随机串
          "package": self.state.wexinPayToken.Package,
          "signType": "MD5",         //微信签名方式：
          "paySign": self.state.wexinPayToken.PaySign //微信签名
        },
        function(res){
          if(res.err_msg == "get_brand_wcpay_request：ok" ) {
            // 支付成功
            alert('支付成功');
          } else {
            alert('支付失败');
          }
        }
      );
    }
    if (typeof WeixinJSBridge == "undefined") {
      if( document.addEventListener ){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      }else if (document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      }
    }else{
      onBridgeReady();
    }
  };

  render() {
    const {order} = this.state
    return (
      <div>
        <LoadingToast displayState={this.state.success ? 'none' : 'block'} />

        <div className="OrderDetailLayout" >
          <CellsTitle>支付流程说明</CellsTitle>
          <section className="icon_box font_small color_gray">
            <div><i className="icon order_icon" /><br/>提单
            </div><div><i className="icon refund" /><br/>付款
            </div><div><i className="icon grapher_icon" /><br/>拍摄
            </div><div><i className="icon album" /><br/>收片</div>
          </section>
          <CellsTitle>订单详情</CellsTitle>

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
              <span>预约时间</span>
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
            {order.BuyerMemo ?
              <p className="last-layout">
                <span>备注</span>
                <span>{order.BuyerMemo}</span>
              </p>
              : ''
            }
          </article>

          <div className="footer color_gray fr">
            合计：<span className="font_super color_dark">￥{order.Price}</span>
          </div>
          {
            OrderStatus.UNPAYED === OrderStatus.parse(order.State) ?
              <footer className="footer">
                <Button type="primary" onClick={this.pay}>支付￥{order.Price}</Button>
              </footer>
              :
              ''
          }
        </div>
      </div>
    );
  }
}

ReactMixin.onClass(OrderDetailLayout, Reflux.listenTo(OrderStore, 'onOrderLoad'));
ReactMixin.onClass(OrderDetailLayout, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(OrderDetailLayout, History);

export default OrderDetailLayout;
