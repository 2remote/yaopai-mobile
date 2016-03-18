import React from 'react';
import {Dialog, Button} from 'react-weui';
import { OrderStatus } from '../Tools';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';

import OrderActions from '../../actions/OrderActions';

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
              this.hideConfirm(e, false)
            }
          },
          {
            type: 'primary',
            label: '确认',
            onClick: e => {
              this.hideConfirm(e, true)
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
    console.log('[YPUIOrderCard-payOrder]', orderId);
    this.history.pushState(null, `/center/u/order/${orderId}/submit`);
  };

  /**
   * 用户：申请退款
   * @param e
   * @param orderId
   */
  payRefund = (e, orderId) => {
    this.history.pushState(null, `/center/u/order/${orderId}/refund`);
  };

  /**
   * 摄影师：接受订单
   * @param e
   * @param orderId
   * @param approve
   */
  acceptOrder = (e, orderId, approve) => {
    OrderActions.receive(orderId, approve);
  };

  showConfirm = (e) => {
    this.setState({showConfirm: true});
  };

  hideConfirm = (e, flag) => {
    console.log(flag);
    this.setState({showConfirm: false});
  };

  cardFooter = (order, status, utype) => {
    let leftPortion = <div></div>;
    let rightPortion = <div></div>;
    /* 待付款：显然这是买家用户 */
    if(status === OrderStatus.UNPAYED) {
      rightPortion = (
        <div>
          <Button type="primary" size="small" className="weui_btn weui_btn_mini"
                  onClick={ e => { this.payOrder(e, order.Id); }}>
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
                    onClick={ e => { this.acceptOrder(e, order.Id, false); }}>
              拒接
            </button>
            <span>&nbsp;&nbsp;</span>
            <button className="weui_btn weui_btn_mini weui_btn_primary"
                    onClick={ e => { this.acceptOrder(e, order.Id, true); }}>
              接受
            </button>
          </div>
        );
      } else {
        rightPortion = (
          <div>
            <button className="weui_btn weui_btn_mini weui_btn_default"
                    onClick={ e => { this.payRefund(e, order.Id); }}>
              退款
            </button>
          </div>
        );
      }
    }
    /* 进行中 */
    if(status === OrderStatus.ONGOING) {
      if(utype === 1) {

      } else {
        rightPortion = (
          <div>
            <Button type="default" className="weui_btn weui_btn_mini">
              退款
            </Button>
            <span>&nbsp;&nbsp;</span>
            <Button type="primary" className="weui_btn weui_btn_mini"
                    onClick={this.showConfirm}>
              收片
            </Button>
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
    if(utype === 1) {
      leftPortion = <div></div>;
    } else {
      leftPortion = (
        <div>
          <a href={`tel:${order.Photographer.BusinessPhone}`} className="color_gray">
            <i className="icon phone_icon" />
            联系{order.Photographer.NickName}
          </a>
        </div>
      );
    }
    return (
      <div className="weui_panel_bd">
        <div className="yp_media_box">
          {leftPortion}
          <div className="flex_spring"></div>
          {rightPortion}
        </div>
      </div>
    );

    ///* 已完成 or 已关闭 */
    //if(status === OrderStatus.COMPLETE) {
    //  return <div className="weui_panel_bd">
    //    <div className="yp_media_box">
    //      <div>
    //        <a href={`tel:${order.Photographer.BusinessPhone}`} className="color_gray">
    //          <i className="icon phone_icon" />
    //          联系{order.Photographer.NickName}
    //        </a>
    //      </div>
    //      <div className="flex_spring"></div>
    //      <div>
    //        <span className="color_gray">已取消订单</span>
    //        <span className="color_red">退款成功</span>
    //        <span className="color_green">已完成</span>
    //      </div>
    //    </div>
    //  </div>;
    //}
    //if(status === OrderStatus.CLOSED) {
    //  return <div className="weui_panel_bd">
    //    <div className="yp_media_box">
    //      <div>
    //        <a href={`tel:${order.Photographer.BusinessPhone}`} className="color_gray">
    //          <i className="icon phone_icon" />
    //          联系{order.Photographer.NickName}
    //        </a>
    //      </div>
    //      <div className="flex_spring"></div>
    //      <div>
    //        <span className="color_gray">已取消订单</span>
    //        <span className="color_red">退款成功</span>
    //        <span className="color_green">已完成</span>
    //      </div>
    //    </div>
    //  </div>;
    //}
  };

  render() {
    const {order} = this.props;
    return (
      <div className="weui_panel weui_panel_access">
        <div className="weui_panel_bd">
          <a className="weui_media_box weui_media_appmsg" href={`#/center/u/order/${order.Id}`}>
            <div className="weui_media_hd">
              <img className="weui_media_appmsg_thumb" src={order.Albums.Cover} alt/>
            </div>
            <div className="weui_media_bd">
              <h4 className="weui_media_title">
                {order.Albums.Title}
              </h4>
              <p className="weui_media_desc">
                <i className="icon font_small book_icon ">&nbsp;&nbsp;</i>
                预约时间：{order.CreationTime.substring(0,10)}
              </p>
              <p className="weui_media_desc">
                <i className="icon font_small price_icon">&nbsp;&nbsp;</i>
                价格：￥{order.Price}
                &nbsp;&nbsp;&nbsp;
                实付：<span className="color_red">￥{order.Amount}</span>
              </p>
            </div>
            <i className="icon youjiantou top_right_icon color_gray" />
            {/*<i className="icon close_icon top_right_icon color_gray"></i>*/}
          </a>
        </div>
        {/*某一天需要分离出这个分割线的话，就做成单独的UI Component*/}
        <hr className="separator" />

        {this.cardFooter(order, OrderStatus.parse(order.State), this.props.utype)}
      </div>
    );
  }
}

ReactMixin.onClass(YPUIOrderCard, History);

export {YPUIOrderCard as default};
