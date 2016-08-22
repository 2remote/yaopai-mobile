import React from 'react';
import Reflux from 'reflux';
import {Dialog, Button} from 'react-weui';
import { OrderStatus } from '../Tools';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';
import {Toast} from 'react-weui';
import OrderActions from '../../actions/OrderActions';
import CallActions from '../../actions/CallActions';
import OrderStore from '../../stores/OrderStore';
import API from '../../api';

const {Alert, Confirm} = Dialog;

class YPUIOrderCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alert: {
        title: '订单取消成功',
        buttons: [
          {
            label: '好的',
            onClick: this.hideAlert.bind(this),
          }
        ]
      },
      showConfirm: false,
      confirm: {
        title: '温馨提示',
        buttons: [
          {
            type: 'default',
            label: '取消',
            onClick: e => {
              this.setState({ orderId: undefined });
              this.hideConfirm(e);
            }
          },
          {
            type: 'primary',
            label: '确认',
            onClick: e => {
              this.acceptOrder(e, this.state.orderId);
              this.setState({ orderId: undefined });
              this.hideConfirm(e);
            }
          }
        ]
      },
      showCloseOrderConfirm: false,
      closeOrderConfirm: {
        title: '确定取消订单吗？',
        buttons: [
          {
            type: 'default',
            label: '取消',
            onClick: e => {
              this.setState({ closeOrderId: undefined });
              this.hideCloseOrderConfirm(e);
            }
          },
          {
            type: 'primary',
            label: '确认',
            onClick: e => {
              OrderActions.close(this.state.closeOrderId);
              this.setState({ closeOrderId: undefined });
              this.hideCloseOrderConfirm(e);
            }
          }
        ]
      },
    };
  }

  _onUserStoreChange(data) {
    if(data.flag == 'close' && data.success) {
      this.setState({showAlert: true});
    }
  }

  /**
   * 用户：支付订单
   * @param e
   * @param orderId
   */
  payOrder = (e, orderId) => {
    const ua = navigator.userAgent.toLowerCase(); //获取判断浏览器用的对象
    if (ua.match(/MicroMessenger/i) != "micromessenger") {
      alert('由于微信限制，请在 Safari 浏览器里打开本网页，再进行支付操作');
      return
    }
    const Origin = location.origin;
    const callBackUrl = encodeURIComponent(`${Origin}/#/center/u/order/${orderId}`);
    location.href = `http:${API.ORDER.wexinRedirect}=${callBackUrl}`;
  };

  /**
   * 用户：取消订单
   * @param e
   * @param orderId
   */
  closeOrder = (e, closeOrderId) => {
    this.setState({showCloseOrderConfirm: true});
    this.setState({ closeOrderId });
  };

  hideCloseOrderConfirm = (e) => {
    this.setState({showCloseOrderConfirm: false});
  }

  /**
   * 用户：申请退款
   * @param e
   * @param orderId
   */
  refundOrder = (e, orderId) => {
    this.history.pushState(null, `/center/u/order/${orderId}/refund`);
  };

  /**
   * 用户：收片
   * @param e
   * @param orderId
   */
  acceptOrder = (e, orderId) => {
    OrderActions.accept(orderId);
  };

  /**
   * 摄影师：接受订单
   * @param e
   * @param orderId
   * @param approve
   */
  receiveOrder = (e, orderId, approve) => {
    // TODO 添加 alert 组件
    if(approve) {
      alert('接单成功，请及时与客户沟通详细的拍摄需求！');
    } else {
      if (confirm("确定拒绝接受该订单吗？")) {
        alert('拒接成功');
      } else {
        return;
      };
    }
    OrderActions.receive(orderId, approve);
  };

  /**
   * 摄影师：发片
   * @param e
   * @param orderId
   */
  deliverOrder = (e, orderId) => {
    OrderActions.deliver(orderId);
  };

  showConfirm = (e, orderId) => {
    this.setState({showConfirm: true});
    this.setState({ orderId });
  };

  handleCall() {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ show: false });
    }, 3000);
  }

  hideAlert() {
    this.setState({showAlert: false});
    location.reload();
  }

  hideConfirm = (e) => {
    this.setState({showConfirm: false});
  };
  cardFooter = (order, status, utype) => {
    let separator = <hr className="separator" />;
    let leftPortion = <div></div>;
    let rightPortion = <div></div>;
    /* 待付款：显然这是买家用户 */
    if(status === OrderStatus.UNPAYED) {
      rightPortion = (
        <div style={{width: '100%'}}>
          <Button type="disabled" size="small" className="weui_btn weui_btn_mini fl"
                  style={{padding: 0, backgroundColor: '#D3D3D3'}}
                  onClick={ e => this.closeOrder(e, order.Id) }>
            &nbsp;&nbsp;取消订单&nbsp;&nbsp;
          </Button>
          <Button type="primary" size="small" className="weui_btn weui_btn_mini fr"
                  style={{marginTop: 0}}
                  onClick={ e => this.payOrder(e, order.Id) }>
            &nbsp;&nbsp;去支付&nbsp;&nbsp;
          </Button>
          <Confirm
            show={this.state.showCloseOrderConfirm}
            title={this.state.closeOrderConfirm.title}
            buttons={this.state.closeOrderConfirm.buttons}>
          </Confirm>
          <Alert
            show={this.state.showAlert}
            title={this.state.alert.title}
            buttons={this.state.alert.buttons}>
          </Alert>
        </div>
      );
    }
    /* 待确认 */
    if(status === OrderStatus.UNCONFIRMED) {
      if(utype != 0){
        rightPortion = (
          <div>
            <button className="weui_btn weui_btn_mini weui_btn_default"
                    onClick={ e => this.receiveOrder(e, order.Id, false) }>
              拒接
            </button>
            <span>&nbsp;&nbsp;</span>
            <button className="weui_btn weui_btn_mini weui_btn_primary"
                    onClick={ e => this.receiveOrder(e, order.Id, true) }>
              接单
            </button>
          </div>
        );
      } else {
        rightPortion = (
          <div>
            <button className="weui_btn weui_btn_mini weui_btn_default"
                    onClick={ e => this.refundOrder(e, order.Id) }>
              退款
            </button>
          </div>
        );
      }
    }
    /* 进行中 */
    if(status === OrderStatus.ONGOING) {
      if(utype != 0) {
        rightPortion = (
          <div>
            {
              order.State === 'WaitingDelivery'?
                <Button type="primary" className="weui_btn weui_btn_mini"
                        onClick={e => this.deliverOrder(e, order.Id) }>
                  发片
                </Button> :
                <span className="color_gray">等待用户收片</span>
            }
          </div>
        );
      } else {
        rightPortion = (
          <div>
            <Button type="default" className="weui_btn weui_btn_mini"
                    onClick={ e => this.refundOrder(e, order.Id) }>
              退款
            </Button>
            {/* This is a stupid hack so that no margin-top for adjacent buttons. */}
            <span>&nbsp;&nbsp;</span>
            {
              order.State === 'WaitingDelivery'?
                <span className="color_gray">等待摄影师发片</span> :
                <Button type="primary" className="weui_btn weui_btn_mini"
                        onClick={e => this.showConfirm(e, order.Id) }>
                  收片
                </Button>
            }
            <Confirm
              show={this.state.showConfirm}
              title={this.state.confirm.title}
              buttons={this.state.confirm.buttons}>
              请您收到照片后再点击“确认”，点击“确认”后将把款打到摄影师的账户中！
            </Confirm>
          </div>
        );
      }
    }
    /* 已完成 */
    if(status === OrderStatus.COMPLETE) {
      rightPortion = (
        <div>
          <span className="color_green">已完成</span>
        </div>
      );
    }
    /* 已关闭 */
    if(status === OrderStatus.CLOSED) {
      rightPortion = (
        <div>
          <span className="color_gray">已关闭</span>
        </div>
      );
    }
    /* 调整footer左侧 */
    if(utype != 0 || status === OrderStatus.CLOSED) {
      leftPortion = <div></div>;
    } else {
      leftPortion = (
        <div>
          <a onClick = { () => {CallActions.call(order.PhotographerId); this.handleCall()} } className="color_gray">
            <i className="icon phone_icon" />
            联系{order.Photographer.NickName}
          </a>
          <Toast show={this.state.show} style={{padding: '20px 15px'}}>
            正在回拨<br/>
            请注意接听<br/>
            <small>3秒后关闭...</small>
          </Toast>
        </div>
      );
    }
    return (
      <div className="weui_panel_bd">
        {separator}
        <div className="yp_media_box">
          {leftPortion}
          <div className="flex_spring"></div>
          {rightPortion}
        </div>
      </div>
    );
  };


  handleCall() {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ show: false });
    }, 3000);
  }

  render() {
    const {order} = this.props;
    return (
      <div className="weui_panel weui_panel_access">
        <div className="weui_panel_bd">
          <a className="weui_media_box weui_media_appmsg"
             href={`#/center/${this.props.utype === 1 ? 'g':'u'}/order/${order.Id}`}>
            <div className="weui_media_hd">
              <img className="weui_media_appmsg_thumb" src={order.Albums.Cover} alt/>
            </div>
            <div className="weui_media_bd">
              <h4 className={`weui_media_title${OrderStatus.parse(order.State) === OrderStatus.CLOSED ? ' color_gray':''}`}>
                {order.Albums.Title}
              </h4>
              <p className="weui_media_desc">
                <i className="icon font_small book_icon ">&nbsp;&nbsp;</i>
                预约时间：{order.AppointedTime.substring(0,10)}
              </p>
              <p className="weui_media_desc">
                <i className="icon font_small price_icon">&nbsp;&nbsp;</i>
                价格：￥{order.Price}
                &nbsp;&nbsp;&nbsp;
                实付：
                {
                  OrderStatus.parse(order.State) === OrderStatus.CLOSED ?
                    <span className="color_gray">￥{order.Amount}</span> :
                    <span className="color_red">￥{order.Amount}</span>
                }
              </p>
            </div>
            <i className="icon youjiantou top_right_icon color_gray" />
            {/*<i className="icon close_icon top_right_icon color_gray"></i>*/}
          </a>
        </div>
        {/*某一天需要分离出这个分割线的话，就做成单独的UI Component*/}

        {this.cardFooter(order, OrderStatus.parse(order.State), this.props.utype)}
      </div>
    );
  }
}

ReactMixin.onClass(YPUIOrderCard, History);
ReactMixin.onClass(YPUIOrderCard, Reflux.listenTo(OrderStore, '_onUserStoreChange'));

export {YPUIOrderCard as default};
