import React from 'react'
import SidePage from '../UI/SidePage'
import GrapherIntro from './GrapherIntro'
import WorkIntroGrapherList from '../common/WorkIntroGrapherList'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import AlbumsActions from '../../actions/AlbumsActions'
import AlbumsStore from '../../stores/AlbumsStore'

import $ from 'jquery'

class GrapherDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grapherInfo:{
        User: { NickName: '读取中...', },
      },
      works: [],
    }
  }

  componentWillMount() {
    const UserId = this.props.params.Id;
    // 蛋疼的传参
    AlbumsActions.search(null, "", null, null, UserId);
  }

  onSearchSuccess(data) {
    this.setState({
      works: data.workList,
    })
  }

  render() {
    return (
      <div className="grapherDetailPage">
        <SidePage />
        <GrapherIntro id={this.props.params.Id} pathname={this.props.location.pathname} />
        <WorkIntroGrapherList data={this.state.works} />
      </div>
    );
  }
};

ReactMixin.onClass(GrapherDetailPage, Reflux.listenTo(AlbumsStore, 'onSearchSuccess'));
export {GrapherDetailPage as default};
