import React from 'react';
import ReactMixin from 'react-mixin';
import Reflux from 'reflux';
import WeUI from 'react-weui';
import {Button} from 'react-weui';


import OrderActions from '../../../../../actions/OrderActions';
import OrderStore from '../../../../../stores/OrderStore';

const {Cells, CellsTitle, CellsTips, Cell, CellHeader, CellBody, CellFooter} = WeUI;

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
    pingpp_one.init({
      debug: true,
      app_id: 'app_HOmP4CHinvvL9Kyv', //Ping++ 后台中的应用Id
      amount: 0,    //金额请填写0
      channel: ['alipay_wap', 'wx_pub', 'upacp_wap'],//渠道数组,视情况而定
      charge_url: `http://dev.api.aiyaopai.com/payment/token?tokenId=${getCookie('pingToken')}`, //token地址
      charge_param: { 'orderId': this.state.order.Id }  //订单Id
    }, res => {
      if(res.debug&&res.chargeUrlOutput){
        console.log(res.chargeUrlOutput);
      }
      if(!res.status){
        //处理错误
        alert(res.msg);
      }
      else{
        //debug 模式下调用 charge_url 后会暂停，可以调用 pingpp_one.resume 方法继续执行
        if(res.debug&&!res.wxSuccess){
          if(confirm('当前为 debug 模式，是否继续支付？')){
            pingpp_one.resume();
          }
        }
        //若微信公众号渠道需要使用壹收款的支付成功页面，则在这里进行成功回调，
        //调用 pingpp_one.success 方法，你也可以自己定义回调函数
        //其他渠道的处理方法请见第 2 节
        else pingpp_one.success(function(res){
          if(!res.status){
            alert(res.msg);
          }
        },function(){
          //这里处理支付成功页面点击“继续购物”按钮触发的方法，
          //例如：若你需要点击“继续购物”按钮跳转到你的购买页，
          //则在该方法内写入 window.location.href = "你的购买页面 url"
          window.location.href='http://yourdomain.com/payment_succeeded';//示例
        });
      }
    });
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
    OrderActions.get(this.props.params.id);
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
          {/* 1.2 备注 */}
          <CellsTitle>备注</CellsTitle>
          <div className="weui_cell weui_panel">
            <div className="weui_cell_bd weui_cell_primary">
              <textarea ref="comment" maxLength="200" className="weui_textarea" placeholder="请输入评论" rows="3"/>
            </div>
          </div>
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

export {OrderSubmitLayout as default};
