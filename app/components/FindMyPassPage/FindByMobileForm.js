var React = require('react');
var Reflux = require('reflux');
var GetCodeActions = require('../../actions/GetCodeActions');
var GetCodeStore = require('../../stores/GetCodeStore');
var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');
var Toaster = require('../Toast');
var validator = require('validator');
import {History} from 'react-router';
var DocumentTitle = require('react-document-title');

var FindByMobileForm = React.createClass({
  mixins: [Reflux.listenTo(GetCodeStore, '_onGetCodeStoreChange'),
  Reflux.listenTo(UserStore, '_onverifyTel'),
  History],
  getInitialState: function () {
    return {
      codeLeft: 0,
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
        var phone = this.refs.mobileNumber.getDOMNode().value.trim();
        var code = this.refs.vertificationCode.getDOMNode().value.trim();
        this.history.pushState({phone: phone, code: code}, '/find_my_pass_page2')
      }
    }
  },
  _handleCheck: function () {
    if (this.state.codeLeft > 0) return;
    var phone = this.refs.mobileNumber.getDOMNode().value.trim();
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
    var phone = this.refs.mobileNumber.getDOMNode().value.trim();
    var code = this.refs.vertificationCode.getDOMNode().value.trim();
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
        width: 212
      },
      mobileNumber: {
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
      },
      input: {
        padding: '8px 10px',
        marginTop: '48px',
        backgroundColor: 'inherit',
        width: 200,
        fontSize: '1.2em',
        lineHeight: '19px',
        borderWidth: '0 0 2px',
        borderRadius: 0,
        borderColor: 'transparent transparent #c4c4c4'
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
      submit: {
        width: 212,
        height: 50,
        marginTop: 39,
        borderRadius: 30,
        padding: 0,
        border: 0,
        fontSize: '1.5em',
        backgroundColor: '#3c3c3c',
        color: '#ffffff',
        fontWeight: 'lighter'
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
                style={style.submit}
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

module.exports = FindByMobileForm;
