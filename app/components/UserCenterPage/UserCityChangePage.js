import React from 'react'
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import {History,Location} from 'react-router'
import AreaSelector from './AreaSelector'
import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'

import WeUI from 'react-weui'
const {Button} = WeUI

class UserCityChangePage extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      userInfo : {},
      areaId: '0',
      areaName: '未知',
    })
  }

  _onUserStoreChange(data){
    if(!data.isLogin){
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page')
    }else{
      this.setState({userInfo : data})
      console.log('getCurrentUserDetail: ', data)
    }
  }

  onSubmit() {
    let selectList = document.querySelectorAll('.select')
    selectList.forEach(item => console.log(item.value))
    // UserActions.changeUserCity(areaId, areaName)
    // this.props.history.pushState(null, '/center/user_edit_profile')
  }

  render() {
    return (
      <div className="weui_msg">
        <div className="weui_text_area">
          <h2 className="weui_msg_title">修改我的城市</h2>
        </div>

        <AreaSelector/>
        <Button type="primary" onClick={this.onSubmit.bind(this)}>确认</Button>
      </div>
    )
  }
}

ReactMixin.onClass(UserCityChangePage, Reflux.listenTo(UserStore, '_onUserStoreChange'))
ReactMixin.onClass(UserCityChangePage, History)
export default UserCityChangePage
