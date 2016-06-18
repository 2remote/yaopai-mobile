import React from 'react';
import DocumentTitle from 'react-document-title';
import SidePage from '../UI/SidePage';
import GrapherIntro from './GrapherIntro';
import WorkIntroGrapherList from '../common/WorkIntroGrapherList';

import { API_URL } from '../../api';
import Share from '../Share';
import { TITLE } from '../Tools';
import WechatShare from '../Weixin/WechatShare';

import $ from 'jquery';

class GrapherDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grapherInfo:{
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
    const fields = '&Fields=Id,NickName,CityName,Avatar,Signature,TotalAlbums,Sales,Marks,MarkExist';
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

  render() {
    let pageTitle = this.state.NickName || '摄影师';
    let wechatShareTitle = 'YAOPAI 认证摄影师-'+this.state.grapherInfo.NickName;
    let wechatShareDesc = this.state.grapherInfo.NickName +' '+this.state.grapherInfo.Signature;
    return (
      <DocumentTitle title={TITLE.grapherDetailPage + pageTitle}>
        <div className="grapherDetailPage">
          <SidePage />
          <GrapherIntro data={this.state.grapherInfo} />
          {this.state.works ? <WorkIntroGrapherList data={this.state.works} /> : ''}
          <WechatShare title={wechatShareTitle} desc={wechatShareDesc} imgUrl={this.state.grapherInfo.Avatar} />
        </div>
      </DocumentTitle>
    );
  }
};

export {GrapherDetailPage as default};
