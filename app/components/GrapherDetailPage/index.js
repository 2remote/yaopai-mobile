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
<<<<<<< HEAD
        User: { NickName: '读取中...', },
      },
      works: [],
    }
  }
=======
        User: {
          NickName: '读取中...'
        }
      }
    }
  }

  componentWillMount() {
    const id = this.props.params.Id;
    const grapherInfo = 'Photographer.Get';
    const listWorkDetail = 'Albums.Search';
    const fields = '&Fields=Id,NickName,CityName,Avatar,Signature,TotalAlbums,Sales,Marks,';
    const filter = '&Id='+id;
    const url = API_URL + grapherInfo + fields + filter;
>>>>>>> dev

  componentWillMount() {
    const UserId = this.props.params.Id;
    // 蛋疼的传参
    AlbumsActions.search(null, null, null, null, "", UserId);
  }

<<<<<<< HEAD
  onSearchSuccess(data) {
    this.setState({
      works: data.workList,
    })
  }

=======
    const worksUrl = API_URL + listWorkDetail + '&Fields=Id,Cover,Cut,Title,Price,Photos.id,Views' + '&UserId=' + id;

    if(id){
      $.ajax ({
        url: worksUrl,
        dataType: 'json',
        cache: false,
        success: function(data){
          console.log(data)
          this.setState({works: data.Result});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.worksUrl, status, err.toString());
        }.bind(this)
      });
    }
  }

>>>>>>> dev
  render() {
    let pageTitle = this.state.NickName || '摄影师';
    let wechatShareTitle = 'YAOPAI 认证摄影师-'+this.state.grapherInfo.NickName;
    let wechatShareDesc = this.state.grapherInfo.NickName +' '+this.state.grapherInfo.Signature;
    console.log(this.state.works)
    return (
      <DocumentTitle title={TITLE.grapherDetailPage + pageTitle}>
        <div className="grapherDetailPage">
          <SidePage />
<<<<<<< HEAD
          <GrapherIntro id={this.props.params.Id} />
          <WorkIntroGrapherList data={this.state.works} />
=======
          <GrapherIntro data={this.state.grapherInfo} />
          {this.state.works ? <WorkIntroGrapherList data={this.state.works} /> : ''}
>>>>>>> dev
          <WechatShare title={wechatShareTitle} desc={wechatShareDesc} imgUrl={this.state.grapherInfo.Avatar} />
        </div>
      </DocumentTitle>
    );
  }
};

ReactMixin.onClass(GrapherDetailPage, Reflux.listenTo(AlbumsStore, 'onSearchSuccess'));
export {GrapherDetailPage as default};
