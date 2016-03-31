import React from 'react';
import ReactMixin from 'react-mixin';
import Reflux from 'reflux';
import { History } from 'react-router';
import WeUI from 'react-weui';
import $ from 'jquery';
import API from '../../../../../api';

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

/**
 *
 */
class OrderSubmitLayout extends React.Component {
  //TODO: 点击提交订单后的事件
  submit = (e) => {
    e.preventDefault();
    let self = this;
    let pingppPay = (self, openid) => {
      let initData = {
        // 后台所有环境均已切换至真实支付，需在dev环境进行真实支付测试
        debug: false, //!API.isProd,
        app_id: 'app_HOmP4CHinvvL9Kyv', //Ping++ 后台中的应用Id
        amount: 0,    //金额请填写0
        channel: ['alipay_wap', 'wx_pub', 'upacp_wap'],//渠道数组,视情况而定
        charge_url: `${API.ORDER.pay}${getCookie('pingToken')}`, //token地址
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
          alert('付款失败，请稍后再试');
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

  constructor(props) {
    super(props);
    this.state = {
      order:{
        AppointedTime: '',
        Albums:{},
        Photographer:{},
        CreationTime:'',
        PaymentTime:'',
        RefundTime:'',
        DeliveryTime:'',
        CompleteTime:''
      }
    };
  }

  componentDidMount() {
    UserActions.currentUser();
  }

  onUserLoad(user) {
    if(!user.isLogin){ // 用户未登录，跳转登陆页
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page');
    } else {
      OrderActions.get(this.props.params.id);
    }
  }

  onOrderLoad(data) {
    this.setState({
      order: data.order
    })
  }

  render() {
    const {order} = this.state;
    return (
      <div>
        <div style={{height:'1px'}}></div>
        {/* 1. 套餐详情 */}
        <CellsTitle>套餐详情</CellsTitle>
        <section className="weui_panel">
          <a href={`#/center/u/order/${order.Id}`} className="weui_media_box weui_media_appmsg">
            <div className="weui_media_hd">
              <img src={order.Albums.Cover} alt={order.Albums.Title} className="weui_media_appmsg_thumb"/>
            </div>
            <div className="weui_media_bd">
              <h4 className="weui_media_title">
                {order.Albums.Title}
              </h4>
              <p className="weui_media_desc">
                摄影师：{order.Photographer.NickName}
              </p>
            </div>
          </a>
          <i className="icon youjiantou top_right_icon "/>
        </section>

        {/* 1. 套餐详情 */}
        <form onSubmit={this.submit}>
        {/* 1.1 预约信息 */}
          <CellsTitle>预约信息</CellsTitle>
          <section className="weui_panel">
            <div className="weui_cell">
              <div className="weui_cell_hd">
                <label className="yp_label">联系姓名</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <p className="color_gray">{order.BuyerName}</p>
              </div>
            </div>
            <div className="weui_cell">
              <div className="weui_cell_hd">
                <label className="yp_label">联系电话</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <p className="color_gray">{order.BuyerTel}</p>
              </div>
            </div>
            <div className="weui_cell">
              <div className="weui_cell_hd">
                <label className="yp_label">预约日期</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <p className="color_gray">{order.AppointedTime.substring(0,10)}</p>
              </div>
            </div>
          </section>
          {/* 1.2 备注
          <CellsTitle>备注</CellsTitle>
          <div className="weui_cell weui_panel">
            <div className="weui_cell_bd weui_cell_primary">
              <textarea ref="comment" maxLength="200" className="weui_textarea" placeholder="请输入评论" rows="3"/>
            </div>
          </div> */}
          {/* 1.3 提交按钮 */}
          <div className="weui_btn_area">
            <button type="submit" className="weui_btn weui_btn_primary">提交订单</button>
          </div>
        </form>
      </div>
    );
  }
}

ReactMixin.onClass(OrderSubmitLayout, Reflux.listenTo(OrderStore, 'onOrderLoad'));
ReactMixin.onClass(OrderSubmitLayout, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(OrderSubmitLayout, History);

export {OrderSubmitLayout as default};
