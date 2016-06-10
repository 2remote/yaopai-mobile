import React from 'react';
import Reflux from 'reflux';
import validator from 'validator';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import GetCodeActions from '../../actions/GetCodeActions';
import GetCodeStore from '../../stores/GetCodeStore';
import { Link, History } from 'react-router';
import Toaster from '../Toast';
import './index.scss';

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
  _getHeight: function(){
    return '600px';
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
    var isMobile = validator.isMobilePhone(phone,'zh-CN');
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
      backgroundColor: 'inherit',
      width: '100%',
      fontSize: '14px',
      lineHeight: '50px',
      borderWidth: '0 0 1px',
      borderRadius: 0,
      color:'#fff',
      borderColor: 'transparent transparent #333'
    };
    var mobileNumber = {
      backgroundColor: 'inherit',
      width:'100%',
      fontSize: '14px',
      color:'#fff',
      lineHeight: '50px',
      borderWidth: '0 0 1px',
      borderRadius: 0,
      borderColor: 'transparent transparent #333',

    };
    return (
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          position: 'absolute',
          height:this._getHeight,
        }}
        className="signupPage">
        <div className="loginCover" style={{backgroundImage:`url('http://ww2.sinaimg.cn/large/006gDr5Tjw1f453zyd9jjj30v91ao7h0.jpg')`}}>
          <i className="icon yaopainew"></i>
          <p style={{color:'#000'}}>全球&nbsp;预约&nbsp;摄影师&nbsp;平台</p>
        </div>
        <div className="regForm">
          <div>
            <Link to="/login_page">
              <span className="login">
                登录 | Login
              </span>
            </Link>
            <span className="reg" >
              注册 | Register
            </span>

          </div>
          <div
            style={{
              position: 'relative',
              textAlign: 'center',
              margin: '0 auto',
              padding:'0 20px',
              height:'600px',
              overflow:'hidden'
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
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: 'inherit',
                color: '#fff',
                float: 'right',
                padding:'8px',
                position:'absolute',
                right:0,
                top:'-20px',
                margin:'25px 20px'
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
                border: '1px solid #fff',
                fontSize: '14px',
                color: '#fff',
                height:'50px',
                lineHeight:'50px',
                marginTop:'10px'
              }}
              onClick = {this._handleRegister}
              ref="signupButton">
              创建账号
            </div>
          </div>
          <Toaster ref="toast"/>
        </div>
      </div>
    );
  }
});

export {SignupPage as default};
