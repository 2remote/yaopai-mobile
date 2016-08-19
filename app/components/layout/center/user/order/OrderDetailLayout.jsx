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
      wexinTicket: {},
    };
  }

  componentDidMount() {
    UserActions.currentUser();
    //请求 wexinPayToken
    OrderActions.wexinPayToken(this.props.params.id);
    OrderActions.wexinTicket();
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
        wexinTicket: data.wexinTicket,
      })
    } else {
      console.error(data.hintMessage)
    }
  }

  pay = e => {
    e.preventDefault();
    let self = this;
    alert(self.state.wexinTicket.AppId)
    alert(self.state.wexinTicket.TimeStamp)
    alert(self.state.wexinTicket.NonceStr)
    alert(self.state.wexinTicket.Signature)
    alert('接下来是 token')
    alert(self.state.wexinPayToken.AppId)
    alert(self.state.wexinPayToken.TimeStamp)
    alert(self.state.wexinPayToken.NonceStr)
    alert(self.state.wexinPayToken.Package)
    alert(self.state.wexinPayToken.PaySign)
    wx.config({
      debug: false,
      appId: self.state.wexinTicket.AppId, // 必填，公众号的唯一标识
      timestamp: self.state.wexinTicket.TimeStamp, // 必填，生成签名的时间戳,后端注意返回string类型
      nonceStr: self.state.wexinTicket.NonceStr, // 必填，生成签名的随机串,自己生成，最长32位。
      signature: self.state.wexinTicket.Signature, // 必填，微信签名，这个签名，和下面的paySign,所需用到的随机字符串和时间戳，最好和生成paySgin的保持一致。不是同一个。生成方法参考 http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html，可在页面 http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign 进行校验。
      jsApiList: [
        'chooseWXPay'
      ] // 必填，需要使用的JS接口列表，列表可选参数，参考 http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html 附录2.
    });

    // js-sdk配置验证成功
    wx.ready(function(){// 调用支付函数
      wx.chooseWXPay({
        timeStamp: self.state.wexinPayToken.TimeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: self.state.wexinPayToken.NonceStr, // 支付签名随机串，不长于 32 位
        package: self.state.wexinPayToken.Package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: self.state.wexinPayToken.Package, // 支付签名
        success: function (res) {// 支付成功后的回调函数
          alert('pay success');
        },
        cencel:function(res){// 支付取消回调函数
          alert('cencel pay');
        },
        fail: function(res){// 支付失败回调函数
          alert('pay fail');
          alert(JSON.stringify(res));
        }
      });
    });
    // js-sdk调用异常回调函数
    wx.error(function(res){
      alert(res.err_msg);
    });
  };

  render() {
    const {order} = this.state
    return (
      <div>
        {/**<LoadingToast displayState={this.state.success ? 'none' : 'block'} />**/}

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
