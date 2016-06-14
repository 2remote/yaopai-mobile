import React from 'react';
import DocumentTitle from 'react-document-title';
import HamburgMenu from '../HamburgMenu';

import $ from 'jquery';

import GrapherIntro from './GrapherIntro';
import WorkIntroList from './WorkIntroList';
import ActionBar from './ActionBar';
import { API_URL } from '../../api';
import Share from '../Share';
import { TITLE } from '../Tools';
import WechatShare from '../Weixin/WechatShare';

var GrapherDetailPage = React.createClass({
  getInitialState: function() {
    return {
      grapherInfo:{
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
    const fields = '&Fields=Id,User.NickName,CityName,User.Avatar,Signature';
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

    const worksUrl = API_URL + listWorkDetail + '&Fields=Id,Cover,Cut,Title,Price,Photos.id' + '&UserId=' + id;

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
    let pageTitle = this.state.grapherInfo.User.NickName || '摄影师';
    let wechatShareTitle = 'YAOPAI 认证摄影师-'+this.state.grapherInfo.User.NickName;
    let wechatShareDesc = this.state.grapherInfo.User.NickName +' '+this.state.grapherInfo.Signature;
    return (
      <DocumentTitle title={TITLE.grapherDetailPage + pageTitle}>
        <div className="grapherDetailPage">
          <HamburgMenu />
          <GrapherIntro data={this.state.grapherInfo} />
          <WorkIntroList data={this.state.works}/>
          <ActionBar data={this.state.grapherInfo}/>
          <Share />
          <WechatShare title={wechatShareTitle} desc={wechatShareDesc} imgUrl={this.state.grapherInfo.User.Avatar}>
          </WechatShare>
        </div>
      </DocumentTitle>
    );
  }
});

export {GrapherDetailPage as default};