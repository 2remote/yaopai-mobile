import React from 'react'
import Router from 'react-router'
import Reflux from 'reflux'
import DocumentTitle from 'react-document-title'

import AreaSelector from './AreaSelector'

import {History,Location} from 'react-router'

import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'

import _ from 'underscore'
import { makeTextButton } from '../Tools'

var UserCityChangePage = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),History],
  getInitialState : function(){
    return {
      userInfo : {},
      areaId: '0',
      areaName: '未知',
    }
  },
  _onUserStoreChange : function(data){
    if(!data.isLogin){
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page')
    }else{
      this.setState({userInfo : data})
      console.log('getCurrentUserDetail: ', data)
    }
  },

  onChangeUserCity : function (e) {
    var areaId = this.state.areaId
    var areaName = this.state.areaName
    console.log(areaId, areaName)
    if(areaId != "0") {
      UserActions.changeUserCity(areaId, areaName)
      this.props.history.pushState(null, '/center/user_edit_profile')
    }else{
      alert('请选择所在城市')
    }
  },

  onAreaChange : function  (areaId, areaName) {
    this.setState({areaId: areaId})
    this.setState({areaName : areaName})
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
          onDistrictChange={this.onAreaChange}
        />

        <div className="weui_opr_area">
          <p className="weui_btn_area">
            <a href="javascript:;" onClick={this.onChangeUserCity} className="weui_btn weui_btn_primary">修改</a>
          </p>
        </div>
      </div>
    )
  }
})

export {UserCityChangePage as default}
