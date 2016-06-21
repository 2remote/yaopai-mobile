import React from 'react'
import DocumentTitle from 'react-document-title'
import SidePage from '../UI/SidePage'
import GrapherIntro from './GrapherIntro'
import WorkIntroGrapherList from '../common/WorkIntroGrapherList'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import AlbumsActions from '../../actions/AlbumsActions'
import AlbumsStore from '../../stores/AlbumsStore'

import { API_URL } from '../../api'
import Share from '../Share'
import { TITLE } from '../Tools'
import WechatShare from '../Weixin/WechatShare'

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
    let pageTitle = this.state.NickName || '摄影师';
    let wechatShareTitle = 'YAOPAI 认证摄影师-'+this.state.grapherInfo.NickName;
    let wechatShareDesc = this.state.grapherInfo.NickName +' '+this.state.grapherInfo.Signature;
    return (
      <DocumentTitle title={TITLE.grapherDetailPage + pageTitle}>
        <div className="grapherDetailPage">
          <SidePage />
          <GrapherIntro id={this.props.params.Id} pathname={this.props.location.pathname} />
          <WorkIntroGrapherList data={this.state.works} />
          <WechatShare title={wechatShareTitle} desc={wechatShareDesc} imgUrl={this.state.grapherInfo.Avatar} />
        </div>
      </DocumentTitle>
    );
  }
};

ReactMixin.onClass(GrapherDetailPage, Reflux.listenTo(AlbumsStore, 'onSearchSuccess'));
export {GrapherDetailPage as default};
