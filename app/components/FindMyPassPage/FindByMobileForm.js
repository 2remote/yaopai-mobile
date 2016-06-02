import React from 'react';
import Reflux from 'reflux';
import GetCodeActions from'../../actions/GetCodeActions';
import GetCodeStore from'../../stores/GetCodeStore';
import UserActions from'../../actions/UserActions';
import UserStore from'../../stores/UserStore';
import Toaster from'../Toast';
import validator from'validator';
import {History} from 'react-router';
import DocumentTitle from 'react-document-title';

var FindByMobileForm = React.createClass({
  mixins: [Reflux.listenTo(GetCodeStore, '_onGetCodeStoreChange'),
  Reflux.listenTo(UserStore, '_onverifyTel'),
  History],
  getInitialState: function () {
    return {
      codeLeft: 0
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
        var phone = this.refs.mobileNumber.value.trim();
        var code = this.refs.vertificationCode.value.trim();
        this.history.pushState({phone: phone, code: code}, '/find_my_pass_page2')
      }
    }
  },
  _handleCheck: function () {
    if (this.state.codeLeft > 0) return;
    var phone = this.refs.mobileNumber.value.trim();
    if (phone) {
      var isMobile = validator.isMobilePhone(phone,['zh-CN']);
      if (isMobile) {
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
    var phone = this.refs.mobileNumber.value.trim();
    var code = this.refs.vertificationCode.value.trim();
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
  showMessage: function (content) {
    this.refs.toast.show(content);
  },
  render: function() {
    var style = {
      form: {
        position: 'relative',
        textAlign: 'center',
        margin: '0 auto',
        padding:'0 20px'
      },
      mobileNumber: {
        backgroundColor: 'inherit',
        width:'100%',
        fontSize: '14px',
        color:'#fff',
        lineHeight: '50px',
        borderWidth: '0 0 1px',
        borderRadius: 0,
        borderColor: 'transparent transparent #333',
      },
      input: {
        backgroundColor: 'inherit',
        width: '100%',
        fontSize: '14px',
        lineHeight: '50px',
        borderWidth: '0 0 1px',
        borderRadius: 0,
        color:'#fff',
        borderColor: 'transparent transparent #333'
      },
      captcha: {
        padding: '8px 0',
        marginTop : 51,
        border: 0,
        fontSize: '.8333em',
        fontWeight: 600,
        backgroundColor: 'inherit',
        color: '#6a6a6a',
        marginLeft: -63,
      },
      submits: {
        marginTop: 10,
        border: '1px solid #fff',
        fontSize: '14px',
        color: '#fff',
        height:'50px',
        lineHeight:'50px',
        width:'100%',
        background:'transparent',
        borderRadius:'0'
      }
    };
    return (
      <DocumentTitle title="重置密码第一步">
        <div className="findMyPassPage">
          <div className="findByMobileForm">
            <Toaster ref="toast" />
            <form 
              style={style.form}
              ref="mobileForm" >
              <input 
                style={style.mobileNumber}
                ref="mobileNumber"
                type="text" placeholder="输入手机号" />
              <input
                style={style.captcha} 
                ref="getVertificationCode"
                onClick={this._handleCheck}
                type="button" 
                value={(this.state.codeLeft>0 ? '( '+this.state.codeLeft+' )' : '获取验证码')} />
              <input 
                style={style.input}
                ref="vertificationCode"
                type="text" placeholder="输入验证码" />
              <input 
                style={style.submits}
                ref="submitButton"
                onClick={this._handleNextStep}
                type="submit" value="下一步" />
            </form>
          </div>
        </div>
      </DocumentTitle>
      
    );
  }
});

export {FindByMobileForm as default};