import React from 'react';

import {Dialog, Button, Toast} from 'react-weui';
const {Alert, Confirm} = Dialog;
import {LoadingToast} from '../../../../UI/WeuiToast';

import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';
import UserActions from '../../../../../actions/UserActions';
import UserStore from '../../../../../stores/UserStore';
import UserFundActions from '../../../../../actions/UserFundActions';
import UserFundStore from '../../../../../stores/UserFundStore';

import $ from 'jquery';

let timer;
class BindCardLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      showToast: false,
      clickSendTel: false,//是否点击了获取验证码按钮
      clickSendTelAgain: false, //无奈又加了一次,只用于判断用户是否没获取验证码就点击了提交
      countDown: 60,//发送验证码后的倒计时
      alert: {
        title: '',
        buttons: [
          {
            label: '好的',
            onClick: this.hideAlert.bind(this)
          }
        ]
      },
      checkingState: {
        send: '',
        receive: ''
      }
    };
  }

  componentDidMount() {
    UserActions.currentUser();
  }

  onUserLoad(user) {
    if(!user.isLogin){ // 用户未登录，跳转登陆页
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page');
    }
  }

  onTelLoad(data) {
    this.setState({
      checkingState: data.checkingState
    });
// TODO 可能有BUG: 第二次修改绑定的支付宝账号时,点击获取验证码会报错
    if (this.state.checkingState.send == '验证码发送成功') {
      if (this.state.checkingState.receive === '验证码错误') {
        this.showAlert('验证码错误！');
      } else if (this.state.checkingState.receive === '验证码正确') {
        this.setState({
          showToast: true,
          checkingState: {
            send: '',
            receive: ''
          }
        });
        setTimeout(() => {
          this.setState({showToast: false});
        },800);
        this.history.pushState(null, 'center/g/purse/bindDetail');
      }
    } else if(this.state.checkingState.receive === '不满足发送间隔时长') {
      this.showAlert('提交太频繁,请稍后再试！');
    }
  }

  getTel = (e) => {//点击'获取验证码'
    let Receivable = this.refs.payId.value.trim();
    if (!Receivable) {
      this.showAlert('请输入支付宝账号！');
      return
    }
    this.setState({
      clickSendTel: true,
      clickSendTelAgain: true
    });
    UserFundActions.sendTelAccount();//让后台发送验证码
    let i = 60;
    timer = setInterval(() => {
      i--;
      this.setState({
        countDown: i
      });
      if (i == 0) {
        clearInterval(timer);
        this.setState({
          clickSendTel: false,
          countDown: 60
        })
      }
    },1000);
  };

  submit = (e) => {//点击'提交绑定'
    event.preventDefault();
    let Code = this.refs.authCode.value.trim();
    let Receivable = this.refs.payId.value.trim();
    if (!Receivable) {
      this.showAlert('请输入支付宝账号！');
      return
    } else if (!this.state.clickSendTelAgain) {
      this.showAlert('请先获取验证码！');
      return
    } else if (!Code) {
      this.showAlert('请输入验证码！');
      return
    }
    clearInterval(timer);
    UserFundActions.receiveTelAccount(Code, Receivable);//把用户填写的验证码发给后台
  };

  showAlert(message) {
    this.setState({
      showAlert: true,
      alert:{
        title: message,
        buttons: [
          {
            label: '好的',
            onClick: this.hideAlert
          }
        ]
      }
    });
  }

  hideAlert = (e) => {
    this.setState({showAlert: false});
  };

  render() {
    return (
      <div>
        <Alert
          show={this.state.showAlert}
          title={this.state.alert.title}
          buttons={this.state.alert.buttons}>
        </Alert>
        <Toast show={this.state.show}>绑定成功！</Toast>

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
            <div className="getTelAgain weui_cell_ft">
              {
                !this.state.clickSendTel
                ?
                  <a className="color_green font_medium" href="javascript:;" onClick={this.getTel}>获取验证码</a>
                :
                  <a className="color_gray font_medium" href="javascript:;">{this.state.countDown}秒后重新获取验证码</a>
              }
            </div>
          </div>
        </div>

        <footer className="footer" style={{paddingTop:40, paddingBottom:0}}>
          <Button type="primary" onClick={this.submit}>提交绑定</Button>
        </footer>
        <aside className="footer color_gray font_small">
          <p className="font_medium">注意：</p>
          <ul>
            <li>1.此账户为YAOPAI平台与您进行现金结算的通道此账户为YAOPAI平台与您进行现金结算的通道。</li>
            <li>2.请确认支付宝及姓名为本人使用账户。</li>
            <li>3.为确保您的资金安全，如需解绑账户，请联系人工客服认证。客服电话
              <a className="color_green" href="tel:0371-65337727">0371-65337727</a>。
            </li>
          </ul>
        </aside>
      </div>
    );
  }
}

ReactMixin.onClass(BindCardLayout, Reflux.listenTo(UserFundStore, 'onTelLoad'));
ReactMixin.onClass(BindCardLayout, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(BindCardLayout, History);

export default BindCardLayout;
