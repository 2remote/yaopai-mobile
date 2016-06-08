import React from 'react';
import Router from'react-router';
import Reflux from'reflux';
import HamburgMenu from'../HamburgMenu';
import DocumentTitle from'react-document-title';

import {History,Location} from 'react-router';
import UserAvatarBox from '../UserAvatarBox' ;

import UserActions from'../../actions/UserActions';
import UserStore from'../../stores/UserStore';

import _ from'underscore';
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
      console.log('getCurrentUserDetail: ', data);
    }
  },

  onChangeUserNickName : function (e) {
    var nickname = this.refs.nickname.value.trim();
    console.log('onChangeUserNickName: ', nickname);
    if(_.isEmpty(nickname)){
      alert('请填入昵称');
    }else{
      UserActions.changeUserNickName(nickname);
      this.history.pushState(null, '/user_edit_profile');
    }
  },

  render: function() {
    return (
      <div className="weui_msg">
        <div className="weui_text_area">
          <h2 className="weui_msg_title">修改我的昵称</h2>
        </div>
        <div className="weui_cells weui_cells_form" >
          <DocumentTitle title="修改我的昵称" />

          <div className="weui_cell">
              <div className="weui_cell_hd">
                <label className="weui_label">昵称</label>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" ref="nickname" type="text" placeholder="请输入昵称" />
              </div>
          </div>
        </div>
        <div className="weui_opr_area">
          <p className="weui_btn_area">
            <a href="javascript:;" onClick={this.onChangeUserNickName} className="weui_btn weui_btn_primary">修改</a>
          </p>
        </div>
      </div>
    );
  }
});

export {UserEditProfilePage as default};
