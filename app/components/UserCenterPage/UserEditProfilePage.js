var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var HamburgMenu = require('../HamburgMenu');
var DocumentTitle = require('react-document-title');

import {History,Location} from 'react-router';
import UserAvatarBox from '../UserAvatarBox' ;

var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');

var _ = require('underscore');
import { makeTextButton } from '../Tools';

var UserEditProfilePage = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),History],
  getInitialState : function(){
    return {
      userInfo : {},
    }
  },
  _onUserStoreChange : function(data){
    if(!data.isLogin){
      this.history.pushState({netxPage : this.props.location.pathname},'/login_page');
    }else{
      this.setState({userInfo : data})
      console.log(data);
    }
  },

  componentDidMount : function(){
    UserActions.currentUserDetail();
  },

  onChangeInfo : function () {
    // 处理昵称
    var nickname = this.state.userInfo.userNickName;
    var nickFlag = this.state.userInfo.newNickStatus;
    if(nickFlag){ 
      nickname = this.state.userInfo.newNick;
    }
    nickFlag = true;

    // 处理性别
    var gender = this.state.userInfo.userSex == '男' ? 1 : 0;
    var genderFlag = this.state.userInfo.newGenderStatus;
    if(genderFlag){
      gender = this.state.userInfo.newGender;
    }

    // 处理城市
    var city = this.state.userInfo.userCity;
    var cityFlag = this.state.userInfo.newCityStatus;
    if(cityFlag){
      city = this.state.userInfo.newCity;
    } 

    // 判断changeInfo模式
    if(nickFlag){
      UserActions.changeUserInfoOnServer(nickname, gender, city);
    }else{
      console.warn("输入的修改内容不全，请重试。");
      console.warn("nickname:", nickname);
      console.warn("gender:", gender);
      console.warn("city:", city);
      return ;
    }
    
    this.history.pushState(null, '/user_center');
    UserActions.currentUser();
  },
  render: function() {
    var style = {
      page: {
        backgroundColor: '#f2f2f2',
        textAlign: 'center',
        minHeight: '100%',
        position: 'absolute',
        width: '100%'
      },
      splitLine: {
        margin: '24px 0 12px 0'
      }
    };
    
    var nickname = "未命名";
    if( this.state.userInfo.userNickName ){
      nickname = this.state.userInfo.userNickName;
    }
    if ( this.state.userInfo.newNickStatus){
      nickname = this.state.userInfo.newNick;
    }
    return (
      <div 
        style={style.page}
        className="userEditProfile">
        <HamburgMenu />
        <DocumentTitle title="编辑我的资料" />
        <UserAvatarBox 
          background={true}
          editAvatar={true}
          data={this.state.userInfo}/>

          {makeTextButton('昵称', nickname, 'user_nickname_change', 'react-router')}
          {makeTextButton('性别', this.state.userInfo.userSex, 'user_gender_change', 'react-router')}
          {makeTextButton('城市', this.state.userInfo.userCity, 'user_city_change', 'react-router')}

        <div className="weui_opr_area">
          <p className="weui_btn_area">
            <a href="javascript:;" onClick={this.onChangeInfo} className="weui_btn weui_btn_primary">保存</a>
          </p>
        </div>
       
      </div>
    );
  }
});

module.exports = UserEditProfilePage;
