import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Button, Dialog} from 'react-weui';
const {Alert} = Dialog;

import UserActions from '../../../../../actions/UserActions';
import UserStore from '../../../../../stores/UserStore';
import UserFundActions from '../../../../../actions/UserFundActions';
import UserFundStore from '../../../../../stores/UserFundStore';
import UserFundWithdrawStore from '../../../../../stores/UserWithdraw';

class WithdrawDepositLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userFund: {
        available: '0.00'
      },
      success: false,
      alert: {
        show: false,
        message: '',
      }
    };
  }
  componentDidMount() {
    UserActions.currentUser();
  }
  onUserLoad(user) {
    if(!user.isLogin){ // 用户未登录，跳转登陆页
      this.props.history.pushState({nextPage : this.props.location.pathname},'/login_page');
    } else {
      this.setState({ user });
      // 获取用户fund信息
      UserFundActions.currentAccount();
    }
  }
  onFundLoad(userFund) {
    this.setState({
      userFund: {
        available: userFund.purse.Available
      }
    });
  }
  onFundWithdrawLoad(result) {
    let self = this;
    if(result.flag === 'add') {
      self.setState({
        success: result.success
      });
      if(result.success) { // 成功
        self.setState({
          alert: {
            show: true,
            message: '提现申请已提交'
          }
        });
      } else {
        self.setState({
          alert: {
            show: true,
            message: result.hintMessage
          }
        });
      }
    }
  }
  hideAlert = () => {
    let self = this;
    self.setState({
      alert: {
        show: false,
        message: ''
      }
    });
    if(self.state.success) {
      this.props.history.pushState(null, '/center/g/purse');
    } else {
    }
  };
  doWithdraw = e => {
    e.preventDefault();

    let amount = new Number(this.refs.amount.value).valueOf();
    console.log('[Withdraw]', amount, amount.toFixed(2));
    UserFundActions.withdrawalAdd(amount);
  };
  render() {
    return (
      <div>
        <div className="weui_cells_title">提现</div>
        <form onSubmit={this.doWithdraw}>
          <div className="weui_cells">
            <div className=" weui_cell">
              <div className="weui_cell_bd weui_cell_primary">
                <p>可提余额</p>
              </div>
              <div className="weui_cell_ft color_red">
                {`￥${this.state.userFund.available}`}
              </div>
            </div>

            <div className="weui_cell weui_cells_form">
              <div className="weui_cell_hd"><label className="yp_label_fix">金额（元）</label></div>
              <div className="weui_cell_bd weui_cell_primary">
                <input ref="amount"
                       className="weui_input text_right"
                       type="number" min="100" step="0.01"
                       required="true"
                       placeholder="请输入提现的金额" />
              </div>
            </div>
          </div>

          <footer className="footer">
            <button type="submit" className="weui_btn weui_btn_primary">确&nbsp;&nbsp;定</button>
          </footer>
          <Alert
            show={this.state.alert.show}
            title={this.state.alert.message}
            buttons={[{
              label: '好的',
              type: 'primary',
              onClick: this.hideAlert
            }]}>
          </Alert>
        </form>
        <aside className="footer color_gray font_small text_center">
          温馨提示：提现至您绑定的支付宝账号中，如您未绑定支付宝账号，请您先进行绑定再进行提现<br/>
          <a className="color_green font_medium" href="#/center/g/purse/bind">
            绑定支付宝<i className="icon youjiantou" />
          </a>
        </aside>
      </div>
    );
  }
}

ReactMixin.onClass(WithdrawDepositLayout, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(WithdrawDepositLayout, Reflux.listenTo(UserFundStore, 'onFundLoad'));
ReactMixin.onClass(WithdrawDepositLayout, Reflux.listenTo(UserFundWithdrawStore, 'onFundWithdrawLoad'));

export default WithdrawDepositLayout;
