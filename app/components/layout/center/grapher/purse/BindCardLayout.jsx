import React from 'react';

import {Dialog, Button} from 'react-weui';
const {Alert, Confirm} = Dialog;

import Reflux from 'reflux';
import ReactMixin from 'react-mixin';

import UserActions from '../../../../../actions/UserActions';
import UserStore from '../../../../../stores/UserStore';
import UserFundActions from '../../../../../actions/UserFundActions';
import UserFundStore from '../../../../../stores/UserFundStore';

class BindCardLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alert: {
        title: '内容不能为空',
        buttons: [
          {
            label: '好的',
            onClick: this.hideAlert.bind(this)
          }
        ]
      }
    };
  }

  onUserLoad(user) {
    if(!user.isLogin){ // 用户未登录，跳转登陆页
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page');
    } else {
      OrderActions.get(this.props.params.id);
    }
  }

  onOrderLoad(data) {

  }

  submit = (e) => {
    event.preventDefault();
    let Code = this.refs.authCode.value.trim();
    let Receivable = this.refs.payId.value.trim();
    if(Receivable == '') {
      this.setState({
        alert:{
          title: '请输入支付宝账号',
          buttons: [
            {
              label: '好的',
              onClick: this.hideAlert.bind(this)
            }
          ]}
      });
      this.showAlert();
      return;
    }
    if(Code == '') {
      this.setState({
        alert:{
          title: '请输入验证码',
          buttons: [
            {
              label: '好的',
              onClick: this.hideAlert.bind(this)
            }
          ]}
      });
      this.showAlert();
      return;
    }
    UserFundActions.receiveTelAccount(Code, Receivable);
  };

  getTel = (e) => {
    let Receivable = this.refs.payId.value.trim();
    if(Receivable == '') {
      this.setState({
        alert:{
          title: '请输入支付宝账号',
          buttons: [
            {
              label: '好的',
              onClick: this.hideAlert.bind(this)
            }
          ]}
      });
      this.showAlert();
      return;
    }
    UserFundActions.sendTelAccount();//让后台发送验证码
    var i  = 60;
    let timer = setInterval(() => {
      i--;
      this.refs.numMsg.innerHTML = i;
      if (i == 0) {
        clearInterval(timer);
        this.refs.numMsg.innerHTML = '点击再次获取';
      }
    },1000);
  };

  render() {
    return (
      <div>
        <div className="weui_cells_title">绑定支付宝</div>
        <div className="weui_cells">
          <div className="weui_cell weui_cells_form">
            <div className="weui_cell_bd weui_cell_primary">
              <input ref="payId" className="weui_input" type="text" placeholder="请输入支付宝账号" />
            </div>
          </div>

          <div className="weui_cell">
            <div className="weui_cell_bd weui_cell_primary">
              <input ref="authCode" className="weui_input" type="number" pattern="[0-9]*" placeholder="请输入手机验证码" />
            </div>
            <div className="weui_cell_ft">
              <a className="color_green font_medium" href="javascript:;" ref="numMsg" onClick={this.getTel}>获取验证码</a>
            </div>
          </div>
        </div>

        <footer className="footer" style={{paddingTop:40, paddingBottom:0}}>
          <Button type="primary" onClick={this.submit}>提交绑定</Button>
        </footer>
        <Alert
          show={this.state.showAlert}
          title={this.state.alert.title}
          buttons={this.state.alert.buttons}>
        </Alert>
        <aside className="footer color_gray font_small">
          <p className="font_medium">注意：</p>
          <ul>
            <li>1.此账户为YAOPAI平台与您进行现金结算的通道此账户为YAOPAI平台与您进行现金结算的通道。</li>
            <li>2.请确认支付宝及姓名为本人使用账户。</li>
            <li>3.为确保您的资金安全，如需解绑账户，请联系人工客服认证。客服电话0371-65337727。
            </li>
          </ul>
        </aside>
      </div>
    );
  }
  showAlert(){
    this.setState({showAlert: true});
  }

  hideAlert(){
    this.setState({showAlert: false});
  }
}

ReactMixin.onClass(BindCardLayout, Reflux.listenTo(UserFundStore, 'onFundLoad'));
ReactMixin.onClass(BindCardLayout, Reflux.listenTo(UserStore, 'onUserLoad'));

export default BindCardLayout;