import React from 'react';
import Reflux from 'reflux';

import {Toast} from 'react-weui';
import {LoadingToast} from '../../../../UI/WeuiToast';

import ReactMixin from 'react-mixin';
import UserActions from '../../../../../actions/UserActions';
import UserStore from '../../../../../stores/UserStore';
import UserFundActions from '../../../../../actions/UserFundActions';
import UserWithdraw from '../../../../../stores/UserWithdraw';

import OrderActions from '../../../../../actions/OrderActions';
import OrderStore from '../../../../../stores/OrderStore';

class PurseDetailLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order:{
        Albums:{},
        Photographer:{},
        CreationTime:'',
        PaymentTime:'',
        RefundTime: '',
        DeliveryTime:'',
        CompleteTime:'',
        HasRefund: '',//布尔值,是否有退款
        BuyerName:'',//买家姓名
        Id:'',//订单单号
        Refund: {} //退款对象
      },
      Withdrawal: {
        Id: '',  //Id
        Amount: '', //提现金额
        State: '', //提现状态 , 详情见备注
        CompletionTime: ''    //结束时间(未结束为null)
      },
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
      if(this.props.params.type == 'Order') {
        OrderActions.get(this.props.params.id);
      } else {
        UserFundActions.withdrawalGet(this.props.params.id);
      }
    }
  }

  onOrderLoad(data) {
    this.setState({
      order: data.order,
      Withdrawal: {State:''},
      success: data.success
    });
  }

  onFundLoad(data) {
    this.setState({
      Withdrawal: data.Withdrawal,
      success: data.success
    });
  }

  render() {
    const {order, Withdrawal, show} = this.state;
    return (
      <div>
        <LoadingToast displayState={this.state.success ? 'none' : 'block'} />

        <div className="PurseDetailLayout" style={this.state.success ? {display: 'block'} : {display: 'none'}}>
          <div className="weui_cells_title">账单详情</div>
          <article className="ypui_detail_box color_gray">
            <p className="ypui_detail_title">
              <span>{Withdrawal.State == 'Completed' ? '出账金额' : '入账金额'}</span>
              <span className={Withdrawal.State == 'Completed' ? 'font_biggest' : 'color_green font_biggest '}>
                {
                  Withdrawal.State == 'Completed' || order.HasRefund
                  ?
                  Withdrawal.Amount || order.Refund.Compensation
                  :
                  order.Price
                }
              </span>
            </p>
            {
              Withdrawal.State == 'Completed'
              ?
              ''
              :
              <p><span>交易名称</span><span>{order.Albums.Title}</span></p>
            }

            {
              Withdrawal.State == 'Completed'
                ?
                ''
                :
                <p><span>预约客户</span><span>{order.BuyerName}</span></p>
            }

            <p>
              <span>时&nbsp;&nbsp;&nbsp;&nbsp;间：</span>
              <span>
                {
                  Withdrawal.State == 'Completed' || order.HasRefund
                  ?
                  Withdrawal.CompletionTime.substring(0,10) +' '+ Withdrawal.CompletionTime.substring(11,19)
                    ||
                  order.Refund.CompletionTime.substring(0,10) +' '+ order.Refund.CompletionTime.substring(11,19)
                  :
                  order.CompleteTime.substring(0,10) +' '+ order.CompleteTime.substring(11,19)
                }
              </span>
            </p>
            <p>
              <span>类&nbsp;&nbsp;&nbsp;&nbsp;型</span>
              <span>
                {Withdrawal.State == 'Completed' || order.HasRefund ? '提现' || '违约金' : '订单收入'}
              </span>
            </p>
            <p>
              <span>交易单号</span>
              <span>{Withdrawal.State == 'Completed' ? Withdrawal.Id : order.Id}</span>
            </p>
          </article>

          <a href="tel:0371-65337727" className="footer text_center color_green">客服</a>
        </div>
      </div>
    );
  }
}

ReactMixin.onClass(PurseDetailLayout, Reflux.listenTo(OrderStore, 'onOrderLoad'));
ReactMixin.onClass(PurseDetailLayout, Reflux.listenTo(UserWithdraw, 'onFundLoad'));
ReactMixin.onClass(PurseDetailLayout, Reflux.listenTo(UserStore, 'onUserLoad'));

export default PurseDetailLayout;
