var React = require('react');
var Reflux = require('reflux');
const $ = require('jquery');
var DocumentTitle = require('react-document-title');


var GrapherAvatar = require('../common/GrapherAvatar');
var ActionBar = require('./ActionBar');
var HamburgMenu = require('../HamburgMenu');
var UserActions = require('../../actions/UserActions');
var InterviewStore = require('../../stores/InterviewStore');
var InterviewActions = require('../../actions/InterviewActions');
import { GET_WORK_DETAIL } from '../Tools';
import {History} from 'react-router'

var interviewDetailPage = React.createClass({
  mixins : [Reflux.listenTo(InterviewStore,'_onInterviewStoreChange'),History],
  getInitialState: function() {
    return {
      data:[],
    };
  },
  
  componentDidMount: function() {
    if(!this.props.params.Id)
      return this.history.pushState(null,'/interview');
    InterviewActions.get(this.props.params.Id);
  },
  _onInterviewStoreChange :function(data){
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
      <div className="interviewDetailPage">
        <HamburgMenu />
        <DocumentTitle title={this.state.data.Title || '作品'} />
        
        <GrapherAvatar data={this.state.data.User} />
        <ActionBar workId={this.state.data.Id} />
      </div>
    );
  }
});

module.exports = interviewDetailPage;