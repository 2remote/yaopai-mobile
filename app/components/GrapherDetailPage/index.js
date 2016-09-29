import React from 'react'
import SidePage from '../UI/SidePage'
import GrapherIntro from './GrapherIntro'
import WorkIntroGrapherList from '../common/WorkIntroGrapherList'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import AlbumsActions from '../../actions/AlbumsActions'
import AlbumsStore from '../../stores/AlbumsStore'
import LinkToApp from '../common/LinkToApp'
import _ from 'underscore'

import $ from 'jquery'

class GrapherDetailPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      grapherInfo:{
        User: { NickName: '读取中...', },
      },
      works: [],
      shareFrom: this.props.location.query.sharefrom,
    }
  }

  componentWillMount() {
    const userId = this.props.params.Id
    // 蛋疼的传参
    AlbumsActions.search({userId})
  }

  onSearchSuccess(data) {
    this.setState({
      works: data.workList,
    })
  }

  render() {
    let activityId
    _.map(this.state.works, (data, i) => {
      if(i == 0) {
        activityId = data.Photographer.Id
      }
    })
    return (
      <div className="grapherDetailPage">
        <SidePage shareFrom={this.state.shareFrom} />
        {
          activityId == 7300 ? ''
          :
          <GrapherIntro id={this.props.params.Id} pathname={this.props.location.pathname} />
        }
        <WorkIntroGrapherList data={this.state.works} />
        <LinkToApp />
      </div>
    )
  }
}

ReactMixin.onClass(GrapherDetailPage, Reflux.listenTo(AlbumsStore, 'onSearchSuccess'))
export {GrapherDetailPage as default}
