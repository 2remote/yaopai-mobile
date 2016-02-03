var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var HamburgMenu = require('../HamburgMenu');
var DocumentTitle = require('react-document-title');

var AreaSelector = require('./AreaSelector');

import {History,Location} from 'react-router';
import UserAvatarBox from '../UserAvatarBox' ;

var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');

var _ = require('underscore');
import { makeTextButton } from '../Tools';

var UserCityChangePage = React.createClass({
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
      console.log('getCurrentUserDetail: ', data);
    }
  },

  componentDidMount : function(){
    
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

  onAreaChange : function  (areaId) {
    console.log('onAreaChange:', areaId);  
  },

  render: function() {
    return (
      <div className="weui_msg">
        <div className="weui_text_area">
          <h2 className="weui_msg_title">修改我的城市</h2>
        </div>
        <AreaSelector 
          onProvinceChange={this.onAreaChange}
          onCityChange={this.onAreaChange}
          onDistrictChange={this.onAreaChange} />
        <div className="weui_cell weui_cell_select weui_select_after">
          <div className="weui_cell_hd">
            省份
          </div>
          <div className="weui_cell_bd weui_cell_primary">
            <select className="weui_select" name="select2">
              <option value="1">中国</option>
              <option value="2">美国</option>
              <option value="3">英国</option>
            </select>
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

module.exports = UserCityChangePage;
