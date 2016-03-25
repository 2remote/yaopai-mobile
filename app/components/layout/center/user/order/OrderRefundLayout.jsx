import React from 'react';
import ReactMixin from 'react-mixin';
import Reflux from 'reflux';
import { History } from 'react-router';
import {Button, Toast} from 'react-weui';

import UserActions from '../../../../../actions/UserActions';
import OrderActions from '../../../../../actions/OrderActions';
import UserStore from '../../../../../stores/UserStore';
import OrderStore from '../../../../../stores/OrderStore';

class OrderRefundLayout extends React.Component {
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
  };
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
  };
  doRefund = e => {
    e.preventDefault();
    let reason = this.refs.reason.value;
    let explain = this.refs.explain.value;
    OrderActions.refund(this.state.order.Id, reason, explain);
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ show: false });
      this.history.pushState(null, '/center/u/order');
    }, 3000);
  };

  handleClick = e => {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ show: false });
    }, 3000);
  };

  render() {
    const {order} = this.state;
    return (
      <div>
        {/* 1. 订单信息panel */}
        <div className="weui_panel weui_panel_access">
          <div className="weui_panel_bd">
            <a href={`#/center/u/order/${order.Id}`}
              className="weui_media_box weui_media_appmsg">
              <div className="weui_media_hd">
                <img className="weui_media_appmsg_thumb"
                     src={order.Albums.Cover}
                     alt={order.Albums.Title}/>
              </div>
              <div className="weui_media_bd">
                <div className="weui_media_title">
                  {order.Albums.Title}
                </div>
                <div className="weui_media_desc">
                  摄影师：{order.Photographer.NickName}
                </div>
                <div className="weui_media_desc">
                  总金额：<span className="color_red">￥{order.Amount}</span>
                </div>
              </div>
              <i className="icon youjiantou top_right_icon"/>
            </a>
          </div>
          <hr className="separator"/>
          <div className="weui_panel_hd">
            订单编号：{order.Id}<br />
            付款时间：{order.PaymentTime && order.PaymentTime.substring(0,10)}
          </div>
        </div>
        {/* 2. 退款模块 */}
        <div className="weui_cells_title">退款信息</div>
        {/* 3. 退款表单 */}
        <form onSubmit={this.doRefund}>
          <div className="weui_cells weui_cells_form">
            <div className="weui_cell">
              <div className="weui_cell_hd">
                <div className="yp_label">退款方式</div>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <div className="font_medium">
                  原路退回
                  <span className="color_gray">（3-10个工作日完成，无手续费）</span>
                </div>
              </div>
            </div>
            <div className="weui_cell">
              <div className="weui_cell_hd">
                <div className="yp_label">退款金额</div>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <div className="font_medium">
                  ￥{order.Amount}
                  <span className="color_gray">（优惠不可退）</span>
                </div>
              </div>
            </div>
            <div className="weui_cell weui_cell_select weui_select_after">
              <div className="weui_cell_hd">
                <div className="yp_label color_red">退款原因</div>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <select className="weui_select font_medium"
                        style={{paddingLeft: '0'}}
                        ref="reason">
                  <option value="不想拍了">不想拍了</option>
                  <option value="摄影师档期问题">摄影师档期问题</option>
                  <option value="计划有变，没时间消费">计划有变，没时间消费</option>
                </select>
              </div>
            </div>
          </div>
          {/* 4. 退款说明 */}
          <div className="weui_cells_title">
            退款说明
          </div>
          <div className="weui_cells weui_cells_form">
            <div className="weui_cell">
              <div className="weui_cell_bd weui_cell_primary">
                <textarea className="weui_textarea font_medium" placeholder="请输入退款说明" ref="explain" rows="4"/>
              </div>
            </div>
          </div>
          {/* 5. 提交按钮 */}
          <div style={{padding: '24px 15px'}}>
            <button className="weui_btn weui_btn_primary" type="submit">提交申请</button>
            <Toast show={this.state.show}>
              申请提交成功<br/>
              <small>3秒后跳转...</small>
            </Toast>
          </div>
        </form>
        {/* 6. 退款说明 */}
        <article className="weui_article">
          <section>
            <h2 className="title">退款说明：</h2>
            <p className="font_small color_gray">
              A、未拍摄前：<br />
              1、约定拍摄日期前3（具体日期待定）天以上，申请修改拍摄档期和申请退款，均不扣款，平台保障，放心支付。<br />
              2、约定拍摄日的前3天内，如临时改期，将扣取订单总价的10%，作为摄影师档期占用补偿。申请退款将扣去订单总价的30%作为毁约补偿。<br />
              B、拍摄完成后：<br />
              如用户对拍摄作品不满意，如需申请退款，务必先联系客服人员，然后提交退款原因说明及上传凭证图片，经过YAOPAI 初步确认后，由工作人员为您办理退款（作品如何评判？退多少？退款标准如何定？）或提供补救方案。
            </p>
          </section>
          <section>
            <h2 className="title">退款规则：</h2>
            <p className="font_small color_gray">
              1、若办理退款，退款会优先使用您原订单的支付方式进行退回。<br />
              2、如果所支付的订单中含有非现金部分(如优惠券)，在退款时，非现金部分不能折现。<br />
              3、如有疑问，请拨打客服热线： 400-888-8888
            </p>
          </section>
        </article>
      </div>
    );
  }
}

ReactMixin.onClass(OrderRefundLayout, Reflux.listenTo(OrderStore, 'onOrderLoad'));
ReactMixin.onClass(OrderRefundLayout, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(OrderRefundLayout, History);

export default OrderRefundLayout;