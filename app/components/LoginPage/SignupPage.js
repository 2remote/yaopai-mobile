import React from 'react'
import Reflux from 'reflux'
import UserEntryLayout from './UserEntryLayout'
import { ButtonBlock } from '../UI/Button'
import InputGroup from '../UI/InputGroup'
import validator from 'validator'
import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'
import GetCodeActions from '../../actions/GetCodeActions'
import GetCodeStore from '../../stores/GetCodeStore'
import { Link, History } from 'react-router'
import { RouteTransition, presets } from 'react-router-transition'
import Toaster from '../Toast'

let SignupPage = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),Reflux.listenTo(GetCodeStore,'_onGetCodeStoreChange'),History],
  getInitialState : function(){
    return {
      phone : '',
      code : '',
      password1 : '',
      codeLeft : 0
    }
  },
  _onUserStoreChange : function(data){
    if(data.flag == 'register'){
      if(data.hintMessage){
        this.showMessage(data.hintMessage)
      }else{
        //注册成功
        this.showMessage('注册成功！请重新登录')
        setTimeout(() => this.history.pushState(null, '/login_page'), 2000)
      }
    }
  },

  _onGetCodeStoreChange : function(data){
    if (data.flag == 'registerCode') {
      if (data.left == 0) {
        this.showMessage(data.result)
        return
      }
      this.setState({codeLeft : data.left})
    }
  },

  _handleGetCode : function(){
    if(this.state.codeLeft > 0) return
    let phone = this.state.phone
    const pattern = /^1[34578]\d{9}$/
    if(pattern.test(phone)){
      GetCodeActions.sendTelRegister({tel:phone})
    }else{
      this.showMessage('请输入正确的手机号码')
    }
    return false
  },
  _handleRegister : function(){
    let phone = this.state.phone
    let code = this.state.code
    let password1 = this.state.password1

    const pattern = /^1[34578]\d{9}$/
    if(!pattern.test(phone)){
      this.showMessage('请输入正确的手机号码')
      return
    }
    if(!password1){
      this.showMessage('请输入密码')
      return
    }
    if(password1.length < 6 || password1.length > 18){
      this.showMessage('密码长度应在6-18之间')
      return
    }
    if(!code){
      this.showMessage('请输入验证码')
      return
    }
    if(!validator.isNumeric(code) || !validator.isLength(code,4,4)){
      this.showMessage('请输入4位数字验证码')
      return
    }
    let registerData = {tel : phone,password : password1,code : code}
    UserActions.register(registerData)
    return false
  },
  showMessage: function (content) {
    this.refs.toast.show(content)
  },

  goEmailSignup: function() {
    this.history.pushState({nextPage : this.props.pathname},'/email_signup')
  },
  render() {
    return (
      <div className="login-register-container">
        <UserEntryLayout />
        <RouteTransition { ...presets.slideRight } pathname="/signupPage">
          <form className="signup-page">
            <InputGroup
              iconLeft="phone"
              updateValue={ phone => this.setState({phone}) }
              type="tel"
              pattern="[0-9]*"
              placeholder="请输入手机号"
            />

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

            <div className="get-tel-code" onClick={this._handleGetCode}>
              {(this.state.codeLeft>0 ? '('+this.state.codeLeft+')' : '获取验证码')}
            </div>
          </form>
           <a className="terms" href="http://mp.weixin.qq.com/s?__biz=MzA4MzMxNTA1Mg==&mid=402209588&idx=1&sn=52c84ffcaba44931aaf1e49d1a41e3ed">
             点击创建帐号表示同意《服务条款》
           </a>
          <span className="email_signup" onClick={this.goEmailSignup}>邮箱注册</span>
          <ButtonBlock
            buttonType="btn-dark"
            value="创建账号"
            handleSubmit={this._handleRegister}
          />
        </RouteTransition>
        <Toaster ref="toast"/>
      </div>
    )
  }
})

export {SignupPage as default}
