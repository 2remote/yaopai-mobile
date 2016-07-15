import React from 'react';
import Reflux from 'reflux';
import SidePage from '../UI/SidePage';
import DocumentTitle from 'react-document-title';

import {History,Location} from 'react-router';
import UserAvatarBox from '../common/UserAvatarBox' ;

import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';

import { makeTextButton } from '../Tools';

var UserEditProfilePage = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),History],
  getInitialState : function(){
    return {
      userInfo : {}
    }
  },
  _onUserStoreChange : function(data){
    if(!data.isLogin){
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page');
    }else{
      this.setState({userInfo : data});
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
    var gender = this.state.userInfo.userSex;
    var genderFlag = this.state.userInfo.newGenderStatus;
    if(genderFlag){
      gender = this.state.userInfo.newGender;
    }

    // 处理城市
    var city = this.state.userInfo.location;
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

    this.history.pushState(null, this.state.userInfo.userType==0?'/center/u':'/center/g');
    UserActions.currentUser();
  },
  render: function() {
    var style = {
      page: {
        backgroundColor: '#f2f2f2',
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

    var city = "未知";
    if( this.state.userInfo.userCity){
      city = this.state.userInfo.userCity;
    }
    if( this.state.userInfo.newCity){
      city = this.state.userInfo.newCityName;
    }

    var gender = "未指定";
    var genderOnServer = this.state.userInfo.userSex;
    if( genderOnServer == 0 ||  genderOnServer == 1){
      gender = genderOnServer;
    }

    var genderOnClient = this.state.userInfo.newGender;
    if ( this.state.userInfo.newGenderStatus){
      gender = genderOnClient;
    }

    var genderDisplay = "男";
    if ( gender == 0){
      genderDisplay = "女";
    }

    return (
      <div
        style={style.page}
        className="userEditProfile">
        <SidePage />
        <DocumentTitle title="编辑我的资料" />
        <UserAvatarBox
          background={true}
          editAvatar={true}
          data={this.state.userInfo}
        />

          {makeTextButton('昵称', nickname, 'center/user_edit_profile/user_nickname_change', 'react-router')}
          {makeTextButton('性别', genderDisplay, 'center/user_edit_profile/user_gender_change', 'react-router')}
          {makeTextButton('城市', city, 'center/user_edit_profile/user_city_change', 'react-router')}

        <div className="weui_opr_area">
          <p className="weui_btn_area">
            <a href="javascript:;" onClick={this.onChangeInfo} className="weui_btn weui_btn_primary color_white">保存</a>
          </p>
        </div>

      </div>
    );
  }
});

export {UserEditProfilePage as default};
