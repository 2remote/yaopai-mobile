import React from 'react'
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import SidePage from '../UI/SidePage'
import DocumentTitle from 'react-document-title'

import {History,Location} from 'react-router'
import UserAvatarBox from '../common/UserAvatarBox'

import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'


import { makeTextButton } from '../Tools'

class UserEditProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo : {},
    }
    this.onChangeInfo = this.onChangeInfo.bind(this)
  }

  _onUserStoreChange(data){
    if(!data.isLogin){
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page')
    }else{
      this.setState({userInfo : data})
    }
  }

  componentDidMount(){
    UserActions.currentUserDetail()
  }

  onChangeInfo() {
    // 处理昵称
    let nickname = this.state.userInfo.userNickName
    let nickFlag = this.state.userInfo.newNickStatus
    if(nickFlag){
      nickname = this.state.userInfo.newNick
    }
    nickFlag = true

    // 处理性别
    let gender = this.state.userInfo.userSex
    let genderFlag = this.state.userInfo.newGenderStatus
    if(genderFlag){
      gender = this.state.userInfo.newGender
    }

    // 处理城市
    let city = this.state.userInfo.location
    let cityFlag = this.state.userInfo.newCityStatus
    if(cityFlag){
      city = this.state.userInfo.newCity
    }

    // 判断changeInfo模式
    if(nickFlag){
      console.log(this.state)
      UserActions.changeUserInfoOnServer(nickname, gender, this.state.userInfo.newCityId)
    }else{
      console.warn("输入的修改内容不全，请重试。")
      console.warn("nickname:", nickname)
      console.warn("gender:", gender)
      console.warn("city:", city)
      return
    }
    alert('修改成功')
    this.history.pushState(null, this.state.userInfo.userType==0?'/center/u':'/center/g')
    UserActions.currentUser()
  }
  render(){
    let style = {
      page: {
        backgroundColor: '#f2f2f2',
        minHeight: '100%',
        position: 'absolute',
        width: '100%'
      },
      splitLine: {
        margin: '24px 0 12px 0'
      }
    }

    let nickname = "未命名"
    if( this.state.userInfo.userNickName ){
      nickname = this.state.userInfo.userNickName
    }
    if ( this.state.userInfo.newNickStatus){
      nickname = this.state.userInfo.newNick
    }

    let city
    const {userInfo} = this.state
    if(userInfo.newCityId) {// 如果 selector 组件筛选的地区结果 ID 存在
      city = `${userInfo.newAreaName.countryName || ''} ${userInfo.newAreaName.provinceName || ''} ${userInfo.newAreaName.cityName || ''}`
    } else {
      city = `${userInfo.countryName || ''} ${userInfo.provinceName || ''} ${userInfo.cityName || ''}`
    }
    city = city.trim() ? city.trim() : '未知'

    if( this.state.userInfo.userCity){
      city = this.state.userInfo.userCity
    }
    if( this.state.userInfo.newCity){
      city = this.state.userInfo.newCityName
    }

    let gender = "未指定"
    let genderOnServer = this.state.userInfo.userSex
    if( genderOnServer == 0 ||  genderOnServer == 1){
      gender = genderOnServer
    }

    let genderOnClient = this.state.userInfo.newGender
    if ( this.state.userInfo.newGenderStatus){
      gender = genderOnClient
    }

    let genderDisplay = "男"
    if ( gender == 0){
      genderDisplay = "女"
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
    )
  }
}

ReactMixin.onClass(UserEditProfilePage, Reflux.listenTo(UserStore, '_onUserStoreChange'))
ReactMixin.onClass(UserEditProfilePage, History)
export {UserEditProfilePage as default}
