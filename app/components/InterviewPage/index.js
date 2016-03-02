import React from 'react';
import Reflux from 'reflux';
import { Router, Route, Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import $ from 'jquery';
import InterviewActions from '../../actions/InterviewActions';
import InterviewStore from '../../stores/InterviewStore';
import InterviewList from './InterviewList';
import HamburgMenu from '../HamburgMenu';
import AutoLoadPageMixin from '../AutoLoadPageMixin';
import { LIST_ALL_INTERVIEWS, TITLE } from '../Tools';
import WechatShare from '../Weixin/WechatShare';
import Toaster from '../Toast';

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
        this.onHideToast()
      }
    }
  },
  onChangePage : function (pageIndex) {
    this.onShowToast('努力加载中...');
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
          <Toaster ref="toast" bottom={true} duration="1000000"/>
        </div>
      </DocumentTitle>
    );
  }
});
export {InterviewPage as default};