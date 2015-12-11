var React = require('react');
var Reflux = require('reflux');
const $ = require('jquery');
var DocumentTitle = require('react-document-title');

var WorkTitle = require('./WorkTitle');
var WorkPieceList = require('./WorkPieceList');
var GrapherAvatar = require('./GrapherAvatar');
var ActionBar = require('./ActionBar');
var HamburgMenu = require('../HamburgMenu');
var UserActions = require('../../actions/UserActions');
var AlbumsStore = require('../../stores/AlbumsStore');
var AlbumsActions = require('../../actions/AlbumsActions');
import { GET_WORK_DETAIL } from '../Tools';
import {History} from 'react-router'

var WorkDetailPage = React.createClass({
  mixins : [Reflux.listenTo(AlbumsStore,'_onAlbumsStoreChange'),History],
  getInitialState: function() {
    return {
      data:[],
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
        <DocumentTitle title={this.state.data.Title || '作品'} />
        <WorkTitle data={{header: this.state.data.Title}} />
        <WorkPieceList workPieces={this.state.data.Photos} />
        <div style={{textAlign:'center',margin: '34px 0 13px'}}>
          <img 
            style={{margin:'0 8px -3px 0'}}
            ref="workPriceIcon"
            src="imgs/common/work-price.png"
            srcSet="imgs/common/work-price@2X.png 2x" />

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
            style={{color:'#a7a7a7',marginBottom:-8}}>
            {this.state.data.Service}
          </div>
          <img
            ref="workSplitLine"
            src="imgs/workDetailPage/work-split-line.png"
            srcSet="imgs/workDetailPage/work-split-line@2X.png 2x" />
        </div>
        <GrapherAvatar data={this.state.data.User} />
        <ActionBar workId={this.state.data.Id} />
      </div>
    );
  }
});

module.exports = WorkDetailPage;
