import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';

import WorkTitle from './WorkTitle';
import WorkPieceList from './WorkPieceList';
import GrapherAvatar from '../common/GrapherAvatar';
import ActionBar from './ActionBar';
import WorkDetail from './WorkDetail';
import AboutGrapher from './AboutGrapher';
import AboutYAOPAI from './AboutYAOPAI';
import HamburgMenu from '../HamburgMenu';
import UserActions from '../../actions/UserActions';
import AlbumsStore from '../../stores/AlbumsStore';
import AlbumsActions from '../../actions/AlbumsActions';
import { GET_WORK_DETAIL, TITLE } from '../Tools';
import {History} from 'react-router'
import Share from '../Share';
import './index.scss';
import WechatShare from '../Weixin/WechatShare';

var WorkDetailPage = React.createClass({
  mixins : [Reflux.listenTo(AlbumsStore,'_onAlbumsStoreChange'),History],
  getInitialState: function() {
    return {
      data: {
        Photographer: {},
        Detail:{},
      }
    };
  },
  
  componentDidMount: function() {
    if(!this.props.params.Id)
      return this.history.pushState(null,'/work');
    AlbumsActions.get(this.props.params.Id);
  },
  _onAlbumsStoreChange :function(data){
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
    return (
      <div className="workDetailPage">
        <HamburgMenu />
        <WorkTitle data={this.state.data} />
        <WorkDetail data={this.state.data} />
        <AboutGrapher data={this.state.data} />
        <WorkPieceList workPieces={this.state.data.Photos} />
        <ActionBar data={this.state.data} />
        <AboutYAOPAI />
        <WechatShare title={this.state.data.Title} desc={this.state.data.Description} imgUrl={this.state.data.Cover}>
        </WechatShare>
      </div>
    );
  }
});

export {WorkDetailPage as default};