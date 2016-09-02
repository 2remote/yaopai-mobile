import Reflux from 'reflux'

import GetCodeActions from '../actions/GetCodeActions'
var data = []
var timer = null
var timerMail = null

/*
  获取验证码store
*/
var GetCodeStore = Reflux.createStore({

  init: function() {
    console.log('GetCodeStore initialized')
    //记录发送验证码的时间
    this.data = {
      flag: '',
      left : 0,
      result : ''
    }
    this.listenTo(GetCodeActions.sendTelRegister.success,this.onTelRegisterSucess)
    this.listenTo(GetCodeActions.sendTelRegister,this.onBeginTelRegister)
    this.listenTo(GetCodeActions.sendTelRestPassword.success, this.onTelRestPasswordSuccess)
    this.listenTo(GetCodeActions.sendTelRestPassword, this.onBeginTelRestPassword)

    this.listenTo(GetCodeActions.sendMailRegister.success,this.onMailRegisterSucess)
    this.listenTo(GetCodeActions.sendMailRegister,this.onBeginMailRegister)
    this.listenTo(GetCodeActions.receiveMailRegister.success, this.onReceiveMailSuccess)
    this.listenTo(GetCodeActions.receiveMailRegister, this.onBeginMailSuccess)
  },
  onBeginTelRegister : function(){
    this.data.left = 60
    var countLeft = function(){
      this.data.left = this.data.left -1
      this.trigger(this.data)
      setTimeout(countLeft, 1000)
    }.bind(this)
    countLeft()
  },
  onTelRegisterSucess : function(data){
    this.data.flag = 'registerCode'
    if(data.Success){
      this.data.result = '验证码已发送'
    }else{
      this.data.result = data.ErrorMsg
      this.data.left = 0
    }
    this.trigger(this.data)
  },
  onBeginTelRestPassword: function () {
    this.data.left = 60
    var countLeft = function () {
      this.data.left -= 1
      this.trigger(this.data)
      timer = setTimeout(countLeft, 1000)
      /*清除定时器*/
      if (this.data.left <= 0) {
        clearTimeout(timer)
      }
    }.bind(this)
    countLeft()
  },
  onTelRestPasswordSuccess: function (data) {
    this.data.flag = 'resetCode'
    if(data.Success){
      this.data.result = '验证码已发送'
    }else{
      clearTimeout(timer)
      this.data.result = data.ErrorMsg
      this.data.left = 0
    }
    this.trigger(this.data)
  },

  // 邮箱注册
  onBeginMailRegister : function(){
    this.data.left = 60
    var countLeftMail = function(){
      this.data.left = this.data.left -1
      this.trigger(this.data)
      setTimeout(countLeftMail, 1000)
    }.bind(this)
    countLeftMail()
  },
  onMailRegisterSucess : function(data){
    this.data.flag = 'registerCode'
    if(data.Success){
      this.data.result = '验证码已发送到您邮箱'
    }else{
      this.data.result = data.ErrorMsg
      this.data.left = 0
    }
    this.trigger(this.data)
  },
  onBeginMailSuccess: function () {
    this.data.left = 60
    var countLeftMail = function () {
      this.data.left -= 1
      this.trigger(this.data)
      timerMail = setTimeout(countLeftMail, 1000)
      /*清除定时器*/
      if (this.data.left <= 0) {
        clearTimeout(timerMail)
      }
    }.bind(this)
    countLeftMail()
  },
  onReceiveMailSuccess: function (data) {
    this.data.flag = 'resetCode'
    if(data.Success){
      this.data.result = '验证码已发送到您邮箱'
    }else{
      clearTimeout(timerMail)
      this.data.result = data.ErrorMsg
      this.data.left = 0
    }
    this.trigger(this.data)
  }
})

export {GetCodeStore as default}
