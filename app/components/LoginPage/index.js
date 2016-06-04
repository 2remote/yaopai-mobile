import React from 'react';
import Reflux from 'reflux';
import { Router, Route, Link, History,Location } from 'react-router';
import DocumentTitle from 'react-document-title';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import './index.scss';
import LoginForm from './LoginForm';

import Toaster from '../Toast';

var LoginPage = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),History,Location],
  _onUserStoreChange : function(data){
    console.log('登录页面 后台data', data);
    if(data.flag == 'login'){
      if(data.hintMessage){
        this.showMessage(data.hintMessage);
        console.log(data.hintMessage);
      }else{
        UserActions.currentUser();
      }
    }
    if(data.flag == 'currentUser'){
      if(data.hintMessage || !data.isLogin){
        console.log(data.hintMessage);
      }else{
        //获取当前用户成功
        console.log('登录成功');
        if(this.props.location && this.props.location.state && this.props.location.state.nextPage)
          this.history.replaceState(null,this.props.location.state.nextPage);
        else
          this.history.replaceState(null,'/');
      }
    }
  },

  handleLoginPost: function (data) {
    UserActions.login(data);
  },

  showMessage: function (content) {
    this.refs.toast.show(content);
  },
  render: function() {
    return (
      <DocumentTitle title="登录">
        <div style={{ height: this._getHeight }}
          className="loginPage">
          <div className="loginCover">
            <i className="icon yaopainew"></i>
            <p>全球&nbsp;预约&nbsp;摄影师&nbsp;平台</p>
          </div>

          <div>
            <section className="login-register-switch">
              <span>登录 | Login</span>
              <Link to="/signupPage">
                <span ref="signupButton">注册 | Register</span>
              </Link>
            </section>
            <LoginForm showMessage={this.showMessage} onLogin={this.handleLoginPost} />
          </div>
          <Toaster ref="toast"/>
        </div>
      </DocumentTitle>
    );
  }
});

export {LoginPage as default};
