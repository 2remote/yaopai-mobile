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

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}

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
      success: false
    };
  }

  componentDidMount() {
    UserActions.currentUser();
  }

  onUserLoad(user) {
    if(!user.isLogin){ // 用户未登录，跳转登陆页
      this.setState({success: true});
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page');
    } else {
      OrderActions.get(this.props.params.id);
      this.setState({
        user: user
      });
    }
  }

  onOrderLoad(data) {
    this.setState({
      order: data.order,
      success: data.success
    })
  }

  pay = e => {
    e.preventDefault();
    let self = this;
    let pingppPay = (self, openid) => {
      let initData = {
        // 后台所有环境均已切换至真实支付，需在dev环境进行真实支付测试
        debug: false, //!API.isProd,
        app_id: 'app_HOmP4CHinvvL9Kyv', //Ping++ 后台中的应用Id
        amount: 0,    //金额请填写0
        channel: ['alipay_wap', 'wx_pub', 'upacp_wap'],//渠道数组,视情况而定
        charge_url: `${API.ORDER.pay}${self.state.user.pingToken}`, //token地址
        charge_param: {
          'callback': `#/center/u/order/submit/${self.state.order.Id}/result`,
          'orderId': self.state.order.Id
        }  //订单Id
      };
      if(openid) {
        initData.open_id = openid;
      }
      pingpp_one.init(initData, res => {
        if(res.debug&&res.chargeUrlOutput){
          //alert('charge ' + res.chargeUrlOutput);
        }
        if(!res.status) { // 付款失败，处理错误
          // alert('付款失败，请稍后再试');
          // shows the exact error message
          alert(res.msg);
        } else { // 付款成功
          //debug 模式下调用 charge_url 后会暂停，可以调用 pingpp_one.resume 方法继续执行
          if(res.debug&&!res.wxSuccess){
            if(confirm('当前为 debug 模式，是否继续支付？')){
              pingpp_one.resume();
            }
          } else {
            window.location.href = `${API.ORDER.wechatRedirect}${self.state.order.Id}`;
          }
        }
      });
    };
    if(WeChat) {//WeChat) { // 在微信内部
      $.ajax({
        url : API.USERFUND.weixinAuthGet,
        type : 'POST',
        dataType : 'json',
        timeout : 5000,
        crossDomain : true,
        xhrFields:{
          withCredentials : true
        },
        success: function(data) {
          if(data.Success && data.Result){
            pingppPay(self, data.Result);
          } else {
            // 未能获取openid
            pingppPay(self);
          }
        },
        error: function() {
          pingppPay(self);
        }
      });
    } else {
      pingppPay(self);
    }
  };

  render() {
    const {order} = this.state;
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
            <p>
              <span>预约电话</span>
              <span>{order.BuyerTel}</span>
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
