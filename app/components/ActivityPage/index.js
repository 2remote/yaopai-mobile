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
import { LIST_ALL_ACTIVITIES } from '../Tools';

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
      }
    }
  },
  onChangePage : function (pageIndex) {
    ActivityActions.search(pageIndex);
  },
  render: function() {
    return (
      <DocumentTitle title="全部活动">
        <div className="activityPage">
          <HamburgMenu />
          <ActivityList data={this.state.Activitys} />
        </div>
      </DocumentTitle>
    );
  }
});
module.exports = ActivityPage;