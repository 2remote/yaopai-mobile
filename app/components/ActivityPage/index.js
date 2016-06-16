import React from 'react';
import Reflux from 'reflux';
import { Router, Route, Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import $ from 'jquery';

import ActivityActions from '../../actions/ActivityActions';
import ActivityStore from '../../stores/ActivityStore';

import ActivityList from './ActivityList';

import HamburgMenu from '../HamburgMenu';
import AutoLoadPageMixin from '../AutoLoadPageMixin';
import { LIST_ALL_ACTIVITIES, TITLE } from '../Tools';
import WechatShare from '../Weixin/WechatShare';
import Toaster from '../Toast';

var ActivityPage = React.createClass({
  mixins : [Reflux.listenTo(ActivityStore,'_onActivityStoreChange') ,AutoLoadPageMixin],
  getInitialState: function() {
    return {
      pageIndex : 1,
      pageCount :0,
      total : 0,
      Activitys: []
    };
  },
  getDefaultProps: function() {
    return {
      url: LIST_ALL_ACTIVITIES
    };
  },
  componentDidMount: function() {
    ActivityActions.search();
  },
  _onActivityStoreChange : function(data){
    if(data.flag == 'search'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({Activitys : this.state.Activitys.concat(data.workList),pageIndex: data.pageIndex,total : data.total ,pageCount:data.pageCount});
        this.onHideToast()
      }
    }
  },
  onChangePage : function (pageIndex) {
    this.onShowToast('努力加载中...');
    ActivityActions.search(pageIndex);
  },
  render: function() {
    return (
      <DocumentTitle title={TITLE.activityPage}>
        <div className="activityPage">
          <HamburgMenu />
          <ActivityList data={this.state.Activitys} />
          <WechatShare title={TITLE.activityPage} desc={TITLE.indexPage}>
          </WechatShare>
          <Toaster ref="toast" bottom={true} duration="1000000"/>
        </div>
      </DocumentTitle>
    );
  }
});
export {ActivityPage as default};