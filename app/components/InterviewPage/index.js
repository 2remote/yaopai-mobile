var React = require('react');
var Reflux = require('reflux');
import { Router, Route, Link } from 'react-router';
var DocumentTitle = require('react-document-title');
var $ = require('jquery');
var InterviewActions = require('../../actions/InterviewActions');
var InterviewStore = require('../../stores/InterviewStore');
var InterviewList = require('./InterviewList');
var HamburgMenu = require('../HamburgMenu');
var AutoLoadPageMixin = require('../AutoLoadPageMixin');
import { LIST_ALL_INTERVIEWS, TITLE } from '../Tools';
var WechatShare = require('../Weixin/WechatShare');

var InterviewPage = React.createClass({
  mixins : [Reflux.listenTo(InterviewStore,'_onInterviewStoreChange') ,AutoLoadPageMixin],
  getInitialState: function() {
    return {
      pageIndex : 1,
      pageCount :0,
      total : 0,
      interviews: [],
    };
  },
  getDefaultProps: function() {
    return {
      url: LIST_ALL_INTERVIEWS
    };
  },
  componentDidMount: function() {
    InterviewActions.search();
  },
  _onInterviewStoreChange : function(data){
    if(data.flag == 'search'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({interviews : this.state.interviews.concat(data.workList),pageIndex: data.pageIndex,total : data.total ,pageCount:data.pageCount});
      }
    }
  },
  onChangePage : function (pageIndex) {
    InterviewActions.search(pageIndex);
  },
  render: function() {
    return (
      <DocumentTitle title={TITLE.interviewPage}>
        <div className="interviewPage">
          <HamburgMenu />
          <InterviewList data={this.state.interviews} />
          <WechatShare title={TITLE.interviewPage} desc={TITLE.indexPage}>
          </WechatShare>
        </div>
      </DocumentTitle>
    );
  }
});
module.exports = InterviewPage;