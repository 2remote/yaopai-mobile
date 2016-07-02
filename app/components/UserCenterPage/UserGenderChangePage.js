import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';

import {History,Location} from 'react-router';

import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';

import _ from 'underscore';
import { makeTextButton } from '../Tools';

var UserGenderChange = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),History],
  getInitialState : function(){
    return {
      userInfo : {},
      gender: ''

    }
  },
  _onUserStoreChange : function(data){
    if(!data.isLogin){
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page');
    }else{
      this.setState({userInfo : data})
    }
  },

  componentDidMount : function(){

  },

  onChangeUserGender : function (e) {
    var gender = this.state.gender;
    console.log('onChangeUserGender: ', gender);
    if(_.isEmpty(gender)){
      alert('请选择性别');
    }else{
      UserActions.changeUserGender(gender);
      this.history.pushState(null, '/user_edit_profile');
    }
  },

  onChangeCurrentGender : function (e) {
    var flag = e.target.value.trim();
    this.setState({gender: flag});
    console.log("flag changed to:", flag);
  },

  render: function() {

    return (
      <div className="weui_msg">
        <div className="weui_text_area">
          <h2 className="weui_msg_title">修改我的性别</h2>
        </div>
        <div className="weui_cells weui_cells_form" >
          <DocumentTitle title="修改我的性别" />
          <div className="weui_cells weui_cells_radio">
              <label className="weui_cell weui_check_label" htmlFor="x11" >
                  <div className="weui_cell_bd weui_cell_primary">
                      <p>男</p>
                  </div>
                  <div className="weui_cell_ft" >
                      <input type="radio"
                        className="weui_check" name="radio1"
                        id="x11" value="1"
                        onClick={this.onChangeCurrentGender} />
                      <span className="weui_icon_checked"></span>
                  </div>
              </label>
              <label className="weui_cell weui_check_label" htmlFor="x12" >

                  <div className="weui_cell_bd weui_cell_primary">
                      <p>女</p>
                  </div>
                  <div className="weui_cell_ft" >
                      <input type="radio" name="radio1"
                        className="weui_check" id="x12"
                        value="0" onClick={this.onChangeCurrentGender} />
                      <span className="weui_icon_checked"></span>
                  </div>
              </label>
          </div>

        </div>
        <div className="weui_opr_area">
          <p className="weui_btn_area">
              <a href="javascript:;" onClick={this.onChangeUserGender} className="weui_btn weui_btn_primary">修改</a>
          </p>
        </div>
      </div>
    );
  }
});

export {UserGenderChange as default};
