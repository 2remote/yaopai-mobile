import React from 'react';
import Reflux from 'reflux';
import UserEntryLayout from './UserEntryLayout';
import { ButtonBlock } from '../UI/Button';
import InputGroup from '../UI/InputGroup';
import validator from 'validator';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import GetCodeActions from '../../actions/GetCodeActions';
import GetCodeStore from '../../stores/GetCodeStore';
import { Link, History } from 'react-router';
import { RouteTransition, presets } from 'react-router-transition'
import Toaster from '../Toast';

let EmailSignupPage = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),Reflux.listenTo(GetCodeStore,'_onGetCodeStoreChange'),History],
  getInitialState : function(){
    return {
      email : '',
      code : '',
      password1 : '',
      codeLeft : 0
    }
  },
  _onUserStoreChange : function(data){
    if(data.flag == 'register'){
      if(data.hintMessage){
        this.showMessage(data.hintMessage);
      }else{
        //注册成功
        this.history.pushState('/login_page');
      }
    }
  },

  _onGetCodeStoreChange : function(data){
    if (data.flag == 'registerCode') {
      if (data.left == 0) {
        this.showMessage(data.result);
        return;
      }
      this.setState({codeLeft : data.left});
    }
  },

  _handleGetCode : function(){
    if(this.state.codeLeft > 0) return;
    let email = this.state.email;
    const mailFilter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let isEmail = mailFilter.test(email);

    if(isEmail){
      GetCodeActions.sendMailRegister({email: email});
    } else {
      this.showMessage('请输入正确的邮箱');
    }
    return false;
  },
  _handleRegister : function(){
    let email = this.state.email;
    let code = this.state.code;
    let password1 = this.state.password1;

    const mailFilter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let isEmail = mailFilter.test(email);
    if(!isEmail){
      this.showMessage('请输入正确的邮箱');
      return;
    }
    if(!password1){
      this.showMessage('请输入密码');
      return;
    }
    if(password1.length < 6 || password1.length > 18){
      this.showMessage('密码长度应在6-18之间');
      return;
    }
    if(!code){
      this.showMessage('请输入验证码');
      return;
    }
    if(!validator.isNumeric(code) || !validator.isLength(code,4,4)){
      this.showMessage('请输入4位数字验证码');
      return;
    }
    let registerData = {email : email, password : password1, code : code};
    UserActions.receiveMailRegister(registerData);
    return false;
  },
  goTelSignup: function() {
    this.history.pushState({nextPage : this.props.pathname},'/signupPage');
  },
  render() {
    return (
      <div className="login-register-container">
        <UserEntryLayout />
        <RouteTransition { ...presets.slideRight } pathname="/signupPage">
          <form className="signup-page">
            <InputGroup
              iconLeft="phone"
              updateValue={ email => this.setState({email}) }
              type="tel"
              pattern="[0-9]*"
              placeholder="请输入邮箱"
            />
            <div className="get-tel-code" onClick={this._handleGetCode}>
              {(this.state.codeLeft>0 ? '('+this.state.codeLeft+')' : '获取邮箱验证码')}
            </div>

            <InputGroup
              iconLeft="mima01"
              updateValue={ password1 => this.setState({password1}) }
              type="password"
              placeholder="请输入密码"
            />

            <InputGroup
              iconLeft="mima01"
              updateValue={ code => this.setState({code}) }
              type="tel"
              pattern="[0-9]*"
              placeholder="请输入验证码"
            />
          </form>
          <ButtonBlock
            buttonType="btn-dark"
            value="创建账号"
            handleSubmit={this._handleRegister}
          />

          <ButtonBlock
            buttonType="btn-dark"
            value="手机号注册"
            handleSubmit={this.goTelSignup}
          />
        </RouteTransition>
        <Toaster ref="toast"/>
      </div>
    );
  }
});

export {EmailSignupPage as default};
