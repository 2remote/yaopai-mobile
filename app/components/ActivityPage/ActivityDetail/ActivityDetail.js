import React from 'react'
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import ActivityDetailLayout from './ActivityDetailLayout'
import ActivityJoin from '../ActivityJoin/ActivityJoin'
import SidePage from '../../UI/SidePage'

import ActivityActions from '../../../actions/ActivityActions'
import ActivityStore from '../../../stores/ActivityStore'
import UserStore from '../../../stores/UserStore'

class ActivityDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      item : {
        Id : '',
        Content : '',
        Deadline : ''
      },
      isLogin : false,
      showJoinPage : false
    }
    ActivityActions.getDetail(this.props.params.Id)
  }

  getActivityDetail(data) {
    if(data.flag === 'getDetail'){
      this.setState({
        item : data.detail
      })
    }
  }

  getCurrentUser(userData) {
    // 判断用户是否登录
    if(userData.isLogin) {
      this.setState({
        isLogin : true
      })
    }
  }

  showButton() {
    let date1 = new Date()
    let date2 = this.state.item.Deadline
    return Date.parse(new Date(date2))>Date.parse(date1)
  }

  showJoinPage() {
    if(this.state.isLogin){
      this.setState({
        showJoinPage : true
      })
      return
    }else{
      if(confirm('限登录用户报名，是否登录？')){
        this.props.history.pushState({nextPage : this.props.location.pathname},'/login_page')
      }
    }
  }

  hideJoinPage() {
    this.setState({
      showJoinPage : false
    })
    return
  }

  render() {
    return (
      <div>
        <SidePage />
        <ActivityDetailLayout showPage={this.showJoinPage.bind(this)} isShowButton={this.showButton()} source={this.state.item} />
        {
          this.state.showJoinPage ? <ActivityJoin hideJoinPage={this.hideJoinPage.bind(this)} source={this.state.item}/> : null
        }
      </div>
    )
  }
}

ReactMixin.onClass(ActivityDetail,Reflux.listenTo(UserStore, 'getCurrentUser'))
ReactMixin.onClass(ActivityDetail,Reflux.listenTo(ActivityStore, 'getActivityDetail'))
export default ActivityDetail