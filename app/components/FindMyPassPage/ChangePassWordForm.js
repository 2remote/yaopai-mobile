var React = require('react');
var Reflux = require('reflux')
var DocumentTitle = require('react-document-title');
var Toaster = require('../Toast');
import {History} from 'react-router';
var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');

var ChangePassWordForm = React.createClass({
  mixins: [Reflux.listenTo(UserStore, '_onPdSubmit'),History],
  _onPdSubmit: function (data) {
    console.log(data);
    if (data.flag == 'resetPassword') {
      if (data.hintMessage) {
        this.showMessage(data.hintMessage);
        return;
      } else {
        this.showMessage('修改成功，请登录');
        this.history.pushState(null, '/login_page');
      }
    }
  },
  _handleSubmit: function (e) {
    e.preventDefault();
    var newPassword = this.refs.newPassword.getDOMNode().value.trim();
    var confirmPassword = this.refs.confirmPassword.getDOMNode().value.trim();
    if (!newPassword) {
      this.showMessage("新密码不能为空！");
      return;
    }
    if (newPassword != confirmPassword) {
      this.showMessage("前后密码不一样！");
      return;
    }
    var data = {tel: this.props.location.state.phone, code: this.props.location.state.code, password: newPassword};
    console.log(data);
    UserActions.receiveTelResetPassWord(data);
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
      input: {
        padding: '8px 10px',
        marginTop: '48px',
        backgroundColor: 'inherit',
        width: '170px',
        fontSize: '1.2em',
        lineHeight: '19px',
        borderWidth: '0 0 2px',
        borderRadius: 0,
        borderColor: 'transparent transparent #c4c4c4'
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
      <DocumentTitle title="重置密码第二步">
        <div className="findMyPassPage">
            <div className="changePassWordForm">
            <Toaster ref="toast" />
            <form style={style.form} ref="changePassForm" >
              <input style={style.input} ref="newPassword"
                type="password" placeholder="输入新密码" />
              <input style={style.input} ref="confirmPassword"
                type="password" placeholder="确认密码" />
              <input style={style.submit} ref="changePassButton"
                type="submit" value="确认修改" onClick={this._handleSubmit} />
            </form>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = ChangePassWordForm;
