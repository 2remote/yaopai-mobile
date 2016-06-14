import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';
import Toaster from '../Toast';
import {History} from 'react-router';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';

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
    var newPassword = this.refs.newPassword.value.trim();
    var confirmPassword = this.refs.confirmPassword.value.trim();
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
      submit: {
        marginTop: 60,
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

export {ChangePassWordForm as default};