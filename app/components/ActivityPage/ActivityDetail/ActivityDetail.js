import React from 'react'
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import ActivityDetailLayout from './ActivityDetailLayout'
import ActivityJoin from '../ActivityJoin/ActivityJoin'
import SidePage from '../../UI/SidePage'

import ActivityActions from '../../../actions/ActivityActions'
import ActivityStore from '../../../stores/ActivityStore'

class ActivityDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      item : {
        Id : '',
        Content : ''
      },
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

  showJoinPage() {
    this.setState({
      showJoinPage : true
    })
    return
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
        <ActivityDetailLayout showPage={this.showJoinPage.bind(this)} source={this.state.item} />
        {
          this.state.showJoinPage ? <ActivityJoin hideJoinPage={this.hideJoinPage.bind(this)} source={this.state.item}/> : null
        }
      </div>
    )
  }
}

ReactMixin.onClass(ActivityDetail,Reflux.listenTo(ActivityStore, 'getActivityDetail'))
export default ActivityDetail