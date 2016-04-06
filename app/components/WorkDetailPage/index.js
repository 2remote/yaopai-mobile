import React from 'react';
import Reflux from 'reflux';
import DocumentTitle from 'react-document-title';

import WorkTitle from './WorkTitle';
import WorkPieceList from './WorkPieceList';
import GrapherAvatar from '../common/GrapherAvatar';
import ActionBar from './ActionBar';
import HamburgMenu from '../HamburgMenu';
import UserActions from '../../actions/UserActions';
import AlbumsStore from '../../stores/AlbumsStore';
import AlbumsActions from '../../actions/AlbumsActions';
import { GET_WORK_DETAIL, TITLE } from '../Tools';
import {History} from 'react-router'
import Share from '../Share';
import WechatShare from '../Weixin/WechatShare';

var WorkDetailPage = React.createClass({
  mixins : [Reflux.listenTo(AlbumsStore,'_onAlbumsStoreChange'),History],
  getInitialState: function() {
    return {
      data:[]
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
        <DocumentTitle title={this.state.data.Title + TITLE.workDetailPage} />
        <WorkTitle data={{header: this.state.data.Title}} />
        <WorkPieceList workPieces={this.state.data.Photos} />
        <div style={{textAlign:'center',margin: '34px 0 13px'}}>
        
          <span
            ref="workPriceIcon"
            className="icon price_icon" 
            style={{fontSize:18,marginRight: 8}} />

          {this.renderPrice()}

          <div 
            style={{marginTop:20,color:'#373737',fontWeight:'bold'}}>
            包含服务
          </div>  
          <div 
            style={{
              height: 1,
              width: '84%',
              background: '#ddd',
              overflow: 'hidden',
              margin:'13px 0 14px 8%'
            }}>
          </div>
          <div 
            style={{color:'#a7a7a7', marginBottom:-8, paddingLeft:15, paddingRight:15}}>
            {this.state.data.Service}
          </div>
          <img
            ref="workSplitLine"
            src="imgs/workDetailPage/work-split-line.png"
            srcSet="imgs/workDetailPage/work-split-line@2X.png 2x" />
        </div>
        <GrapherAvatar data={this.state.data.User} />
        <ActionBar workId={this.state.data.Id} />
        <Share />
        <WechatShare title={this.state.data.Title} desc={this.state.data.Description} imgUrl={this.state.data.Cover}>
        </WechatShare>
      </div>
    );
  }
});

export {WorkDetailPage as default};