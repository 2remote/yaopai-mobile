import React from 'react'
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import DocumentTitle from 'react-document-title'

import ActivityListLayout from './ActivityListLayout'
import SidePage from '../../UI/SidePage'

import { TITLE } from '../../Tools'

import ActivityActions from '../../../actions/ActivityActions'
import ActivityStore from '../../../stores/ActivityStore'

class ActivityList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      result : [],
    }
    ActivityActions.search()
  }

  getActivityList(data) {
    if(data.flag === 'getList'){
      if(data.list && data.list.length>0){
        this.setState({
          result : data.list
        })
      }
    }
  }

  render() {
    return (
      <div>
        <SidePage />
        <DocumentTitle title={TITLE.workPage}>
          <ActivityListLayout source={this.state.result} />
        </DocumentTitle>
      </div>
      
    )
  }
}

ReactMixin.onClass(ActivityList,Reflux.listenTo(ActivityStore, 'getActivityList'))
export default ActivityList