var React = require('react');
var Reflux = require('reflux');
import { Router, Route, Link } from 'react-router';
var DocumentTitle = require('react-document-title');
var $ = require('jquery');

var ActivityActions = require('../../actions/ActivityActions');
var ActivityStore = require('../../stores/ActivityStore');

var ActivityList = require('./ActivityList');

var HamburgMenu = require('../HamburgMenu');
var AutoLoadPageMixin = require('../AutoLoadPageMixin');
import { LIST_ALL_ACTIVITIES, TITLE } from '../Tools';
var WechatShare = require('../Weixin/WechatShare');
var Toaster = require('../Toast');

var ActivityPage = React.createClass({
  mixins : [Reflux.listenTo(ActivityStore,'_onActivityStoreChange') ,AutoLoadPageMixin],
  getInitialState: function() {
    return {
      pageIndex : 1,
      pageCount :0,
      total : 0,
      Activitys: [],
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
    this.onShowToast('努力加载中...')
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
          <Toaster ref="toast" css={{}} duration="1000000"/>
        </div>
      </DocumentTitle>
    );
  }
});
module.exports = ActivityPage;