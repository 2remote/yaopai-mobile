import React from 'react'
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import ActivityJoinLayout from './ActivityJoinLayout'

import ActivityStore from '../../../stores/ActivityStore'

class ActivityJoin extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      display : false,
      id : this.props.source.Id,
      result : {}
    }
  }

  hideJoinPage() {
    this.props.hideJoinPage()
  }

  // 回调报名状态
  getActivityJoin(data) {
    if(data.flag === 'join'){
      if(data.add.isAdd){
        alert("报名成功！")
      }else{
        alert(data.hintMessage)
        return
      }
    }
  }

  render() {
    return (
      <div>
        <ActivityJoinLayout hideJoinPage={this.hideJoinPage.bind(this)} source={this.state}  />
      </div>
    )
  }
}

ReactMixin.onClass(ActivityJoin,Reflux.listenTo(ActivityStore, 'getActivityJoin'))
export default ActivityJoin