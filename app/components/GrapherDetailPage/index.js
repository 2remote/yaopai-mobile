<<<<<<< HEAD
import React from 'react'
import SidePage from '../UI/SidePage'
import GrapherIntro from './GrapherIntro'
import WorkIntroGrapherList from '../common/WorkIntroGrapherList'
=======
import React from 'react';
import DocumentTitle from 'react-document-title';
import SidePage from '../UI/SidePage';
>>>>>>> master

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
<<<<<<< HEAD
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
=======
        User: {
          NickName: '读取中...'
        }
      }
    };
  },
  componentDidMount: function() {
    const id = this.props.params.Id;
    const grapherInfo = 'Photographer.Get';
    const listWorkDetail = 'Albums.Search';
    const fields = '&Fields=Id,NickName,CityName,Avatar,Signature,TotalAlbums,Sales,Marks,';
    const filter = '&Id='+id;
    const url = API_URL + grapherInfo + fields + filter;

    $.ajax ({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({grapherInfo: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
>>>>>>> master

  onSearchSuccess(data) {
    this.setState({
      works: data.workList,
    })
  }

<<<<<<< HEAD
  render() {
    return (
      <div className="grapherDetailPage">
        <SidePage />
        <GrapherIntro id={this.props.params.Id} pathname={this.props.location.pathname} />
        <WorkIntroGrapherList data={this.state.works} />
      </div>
=======
    if(id){
      $.ajax ({
        url: worksUrl,
        dataType: 'json',
        cache: false,
        success: function(data){
          this.setState({works: data.Result});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.worksUrl, status, err.toString());
        }.bind(this)
      });
    }
  },
  render: function() {
    let pageTitle = this.state.NickName || '摄影师';
    let wechatShareTitle = 'YAOPAI 认证摄影师-'+this.state.grapherInfo.NickName;
    let wechatShareDesc = this.state.grapherInfo.NickName +' '+this.state.grapherInfo.Signature;
    return (
      <DocumentTitle title={TITLE.grapherDetailPage + pageTitle}>
        <div className="grapherDetailPage">
          <SidePage />
          <GrapherIntro data={this.state.grapherInfo} />
          <WorkIntroList data={this.state.works}/>
          <WechatShare title={wechatShareTitle} desc={wechatShareDesc} imgUrl={this.state.grapherInfo.Avatar}>
          </WechatShare>
        </div>
      </DocumentTitle>
>>>>>>> master
    );
  }
};

<<<<<<< HEAD
ReactMixin.onClass(GrapherDetailPage, Reflux.listenTo(AlbumsStore, 'onSearchSuccess'));
=======
>>>>>>> master
export {GrapherDetailPage as default};
