import React from 'react';
var Reflux = require('reflux');
import { Router, Route, Link, History,Location } from 'react-router';
var DocumentTitle = require('react-document-title');
var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');

var LoginForm = require('./LoginForm');
import ActionBar from './ActionBar';
var Toaster = require('../Toast');

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
    this.refs.toast.show(content)
  },
  render: function() {
    return (
      <DocumentTitle title="登录">
        <div  
        style={{
          position: 'absolute',
          width: '100%',
          minHeight: '100%',
          margin: '0 auto',
          textAlign: 'center',
          padding: '60px 0 30px'
        }}
        className="loginPage">
        <span
          className="icon yaopai_logo"
          ref="yaopaiLogo"
          style={{fontSize:140,lineHeight:0.3,display:'block'}} />
        <LoginForm showMessage={this.showMessage} onLogin={this.handleLoginPost} />
        <Toaster ref="toast"/>
        <div style={{margin: '44px 0 5px'}}>
          <Link to="/signupPage">
            <span 
            style={{
              color: '#636363',
              fontSize: '1.2em'
            }}
            ref="signupButton">新建帐号</span>
          </Link>
        </div>
        <span ref="splitText">
          <img 
            src="imgs/common/spliter-line.png"
            srcSet="imgs/common/spliter-line@2X.png 2x" />
          <div 
          style={{
            position: 'relative',
            marginTop: -21,
            color: '#c4c4c4'
          }}>OR</div>
        </span>
          <ActionBar />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = LoginPage;