import React from 'react';
import {Dialog, Button} from 'react-weui';
import { OrderStatus } from '../Tools';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';

import OrderActions from '../../actions/OrderActions';
import CallActions from '../../actions/CallActions';

const {Alert, Confirm} = Dialog;

class YPUIOrderCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      }
    };
  }

  /**
   * 用户：支付订单
   * @param e
   * @param orderId
   */
  payOrder = (e, orderId) => {
    this.history.pushState(null, `/center/u/order/submit/${orderId}`);
  };

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
    alert('接单成功，请及时与客户沟通详细的拍摄需求！');
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
        <div>
          <Button type="primary" size="small" className="weui_btn weui_btn_mini"
                  onClick={ e => this.payOrder(e, order.Id) }>
            &nbsp;&nbsp;去支付&nbsp;&nbsp;
          </Button>
        </div>
      );
    }
    /* 待确认 */
    if(status === OrderStatus.UNCONFIRMED) {
      if(utype === 1){
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
      if(utype === 1) {
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
              请您收到照片后再点击“确定”，点击“确定”后将把款打到摄影师的账户中！
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
      //separator = '';
      rightPortion = (
        <div>
          <span className="color_gray">已关闭</span>
        </div>
      );
    }
    /* 调整footer左侧 */
    if(utype === 1 || status === OrderStatus.CLOSED) {
      leftPortion = <div></div>;
    } else {
      leftPortion = (
        <div>
          <a onClick = { () => {CallActions.call(order.PhotographerId)} } className="color_gray">
            <i className="icon phone_icon" />
            联系{order.Photographer.NickName}
          </a>
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

export {YPUIOrderCard as default};
