import React from 'react';
import Reflux from 'reflux';
import GetCodeActions from'../../actions/GetCodeActions';
import GetCodeStore from'../../stores/GetCodeStore';
import UserActions from'../../actions/UserActions';
import UserStore from'../../stores/UserStore';
import Toaster from'../Toast';
import InputGroup from '../UI/InputGroup';
import { ButtonBlock } from '../UI/Button';
import validator from'validator';
import {History} from 'react-router';
import DocumentTitle from 'react-document-title';

var FindByMobileForm = React.createClass({
  mixins: [Reflux.listenTo(GetCodeStore, '_onGetCodeStoreChange'),
  Reflux.listenTo(UserStore, '_onverifyTel'),
  History],
  getInitialState: function () {
    return {
      codeLeft: 0,
      mobileNumber: '',
      vertificationCode: '',
    }
  },
  _onGetCodeStoreChange: function (data) {
    if (data.flag == 'resetCode') {
      if (data.left <= 0) {
        console.log(data.result);
        this.setState({codeLeft: 0});
        this.showMessage(data.result);
      } else {
        this.setState({codeLeft: data.left});
      }
    }
  },
  _onverifyTel: function (data) {
    console.log(data);
    if (data.flag == "check") {
      if (data.hintMessage) {
        this.showMessage(data.hintMessage);
        return;
      } else {
        var phone = this.state.mobileNumber;
        var code = this.state.vertificationCode;
        this.history.pushState({phone: phone, code: code}, '/changePassWordForm')
      }
    }
  },
  _handleCheck: function () {
    if (this.state.codeLeft > 0) return;
    var phone = this.state.mobileNumber;
    if (phone) {
      const telPattern = /^1[34578]\d{9}$/;
      if (telPattern.test(phone)) {
        GetCodeActions.sendTelRestPassword({tel: phone});
        return;
      } else {
        this.showMessage('手机号不正确，请输入正确手机号');
        return;
      }
    } else {
      this.showMessage('手机号不能为空');
      return;
    }
  },
  _handleNextStep: function (e) {
    e.preventDefault();
    var phone = this.state.mobileNumber;
    var code = this.state.vertificationCode;
    const telPattern = /^1[34578]\d{9}$/;
    if (!telPattern.test(phone)) {
      this.showMessage('手机号格式错误');
      return;
    }
    if (!phone) {
      this.showMessage('手机号不能为空');
      return;
    }
    if (!code) {
      this.showMessage('验证码不能为空');
      return;
    } else {
      if (code.length != 4) {
        this.showMessage('验证码长度为4');
      } else {
        UserActions.verifyTelResetPassWord({tel: phone, code: code});
      }
    }
  },
  showMessage(content) {
    this.refs.toast.show(content);
  },
  render() {
    return (
      <DocumentTitle title="重置密码第一步">
        <div>
          <Toaster ref="toast" />
          <form className="find-password">
            <InputGroup
              iconLeft="phone"
              updateValue={ mobileNumber => this.setState({mobileNumber}) }
              type="tel"
              pattern="[0-9]*"
              placeholder="请输入手机号"
            />

            <div className="get-tel-code" onClick={this._handleCheck}>
              {(this.state.codeLeft>0 ? '('+this.state.codeLeft+')' : '获取验证码')}
            </div>

            <InputGroup
              iconLeft="mima01"
              updateValue={ vertificationCode => this.setState({vertificationCode}) }
              type="tel"
              pattern="[0-9]*"
              placeholder="请输入验证码"
            />

            <ButtonBlock
              buttonType="btn-dark"
              value="下一步"
              handleSubmit={this._handleNextStep}
            />
          </form>
          <a className="find-password-go-home fr" href="#/work">返回首页</a>
        </div>
      </DocumentTitle>

    );
  }
});

export {FindByMobileForm as default};
