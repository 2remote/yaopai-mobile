import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import validator from 'validator';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import GetCodeActions from '../actions/GetCodeActions';
import GetCodeStore from '../stores/GetCodeStore';
import { Router, Route, Link, History } from 'react-router';
import Toaster from './Toast';

var SignupPage = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),Reflux.listenTo(GetCodeStore,'_onGetCodeStoreChange'),History],
  getInitialState : function(){
    return {
      phone : '',
      code : '',
      password1 : '',
      password2 : '',
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
  _handlePhoneChange : function(event){
    this.setState({phone : event.target.value});
  },
  _handlePassword1Change : function(event){
    this.setState({password1 : event.target.value});
  },
  _handlePassword2Change : function(event){
    this.setState({password2 : event.target.value});
  },
  _handleCodeChange : function(event){
    this.setState({code : event.target.value})
  },
  _handleGetCode : function(){
    if(this.state.codeLeft > 0) return;
    var phone = this.state.phone;
    var isMobile = validator.isMobilePhone(phone,'zh-CN')
    if(isMobile){
      GetCodeActions.sendTelRegister({tel:phone});
    }else{
      this.showMessage('请输入正确的手机号码');
    }
    return false;
  },
  _handleRegister : function(){
    var phone = this.state.phone;
    var code = this.state.code;
    var password1 = this.state.password1;
    var password2 = this.state.password2;
    var isMobile = validator.isMobilePhone(phone,'zh-CN');
    if(!isMobile){
      this.showMessage('请输入正确的手机号码');
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
    var registerData = {tel : phone,password : password1,code : code};
    UserActions.register(registerData);
    return false;
  },
  showMessage: function (content) {
    this.refs.toast.show(content)
  },
  render: function() {
    var inputStyle={
      padding: '8px 10px',
      marginTop: '48px',
      backgroundColor: 'inherit',
      width: 200,
      fontSize: '1.2em',
      lineHeight: '19px',
      borderWidth: '0 0 2px',
      borderRadius: 0,
      borderColor: 'transparent transparent #c4c4c4'
    };
    var mobileNumber = {
      padding: '8px 10px',
      marginTop: '48px',
      backgroundColor: 'inherit',
      width: 200,
      fontSize: '1.2em',
      lineHeight: '19px',
      borderWidth: '0 0 2px',
      borderRadius: 0,
      borderColor: 'transparent transparent #c4c4c4',
      float: 'left'
    };
    return (
      <div 
        style={{
          width: '100%',
          textAlign: 'center',
          minHeight: '100%',
          position: 'absolute'
        }}
        className="signupPage">
        <DocumentTitle title="新建帐号" />
        <Toaster ref="toast"/>
        <div 
          style={{
            position: 'relative',
            textAlign: 'center',
            margin: '0 auto',
            width: 212
          }}
          className="signupForm">
          <input
            value = {this.state.phone}
            onChange = {this._handlePhoneChange}
            style={mobileNumber}
            ref="mobileNumber"
            type="text" 
            placeholder="手机号" />

          <div
            style={{
              padding: '8px 0',
              border: 0,
              fontSize: '.8333em',
              fontWeight: 600,
              backgroundColor: 'inherit',
              color: '#6a6a6a',
              marginTop: -38,
              float: 'right'
            }}
            onClick={this._handleGetCode}
            ref="getVerificationCode" >
            {(this.state.codeLeft>0 ? '('+this.state.codeLeft+')' : '获取验证码')}
          </div>

          <input
            value = {this.state.password1}
            onChange = {this._handlePassword1Change}
            style={inputStyle}
            ref="passWord"
            type="password" 
            placeholder="输入密码" />

          <input 
            style={inputStyle}
            value = {this.state.code}
            onChange = {this._handleCodeChange}
            ref="verificationCode"
            type="text" 
            placeholder="验证码" />
            <div 
              style={{  
                width: '212px',
                padding : '5px',
                height : '40px',
                marginTop: '54px',
                borderRadius: '25px',
                border: '0',
                fontSize: '1.5em',
                backgroundColor: '#3c3c3c',
                color: '#ffffff',
                fontWeight: 'lighter'
              }}
              onClick = {this._handleRegister}
              ref="signupButton">
              创建账号
            </div>
        </div>
      </div>
    );
  }
});

export {SignupPage as default};