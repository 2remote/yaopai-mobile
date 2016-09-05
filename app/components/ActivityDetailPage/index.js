import React from 'react';
import Reflux from 'reflux';
import $ from 'jquery';
import DocumentTitle from 'react-document-title';

import GrapherIntro from '../GrapherDetailPage/GrapherIntro';
import SidePage from '../UI/SidePage';
import UserActions from '../../actions/UserActions';
import ActivityStore from '../../stores/ActivityStore';
import ActivityActions from '../../actions/ActivityActions';
import { GET_WORK_DETAIL, imgModifier, TITLE } from '../Tools';
import {History, Link} from 'react-router';
import Share from '../Share';
import WechatShare from '../Weixin/WechatShare';

var ActivityDetailPage = React.createClass({
  mixins : [Reflux.listenTo(ActivityStore,'_onActivityStoreChange'),History],
  getInitialState: function() {
    return {
      data:[]
    };
  },

  componentDidMount: function() {
    if(!this.props.params.Id)
      return this.history.pushState(null,'/Activity');
    ActivityActions.get(this.props.params.Id);
  },
  _onActivityStoreChange :function(data){
    if(data.flag == 'get'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({data : data.workData});
      }
    }
  },
  renderPrice: function(){
    const negotiable = this.state.data.Negotiable;
    const price = this.state.data.Price;
    let priceResult = "面议";

    if(!negotiable){
      priceResult = price;
    }
    return (
    <span
      style={{color:'#050505',fontWeight:'bold'}}
      ref="workPrice"
      className="workPrice">{priceResult}</span>
    )
  },
  render: function() {
    const contentText = this.state.data.Content;
    function makeContent() {return {__html: contentText};};

    let coverSoruce = this.state.data.Cover;
    const cover = imgModifier(coverSoruce, "ad");

    let grapherId = '';
    if (this.state.data.User) {
      grapherId = this.state.data.User.Id;
    }
    let wechatShareTitle = this.state.data.Title;
    let wechatShareDesc = this.state.data.Title +' YAOPAI，一个全球预约摄影师的平台';
    return (
      <div style={{height: '100%'}} className="ActivityDetailPage">
        <SidePage />
        <DocumentTitle title={this.state.data.Title + TITLE.activityDetailPage} />

        <div style={{margin:'56px 20% 0 11%'}}>
          <span style={{color:'green',float:'left',fontSize:'2em',marginRight:3}}>-</span>
          <h1>{this.state.data.Title}</h1>
        </div>

        <img
          style={{width: '70%', margin: '-10px 0 20px 8%'}}
          src="imgs/workDetailPage/work-split-line.png"
          srcSet="imgs/workDetailPage/work-split-line@2X.png 2x" />

        <div className="ActivityCover" >
          <img
            style={{width:'100%',height:210/375*innerWidth, marginBottom: 15}}
            src={cover} />
        </div>

        <div
          className="ActivityContent"
          dangerouslySetInnerHTML={makeContent()} />

        <div style={{textAlign:'center',color:'gray',fontSize:18}}>END</div>
        <img
          style={{width: '70%', marginLeft: '15%'}}
          src="imgs/workDetailPage/work-split-line.png"
          srcSet="imgs/workDetailPage/work-split-line@2X.png 2x" />

        <Share />
        <WechatShare title={wechatShareTitle} desc={wechatShareDesc}>
        </WechatShare>
      </div>
    );
  }
});

export {ActivityDetailPage as default};
