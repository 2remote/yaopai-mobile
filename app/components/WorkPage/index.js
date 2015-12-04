var React = require('react');
var Reflux = require('reflux');
import { Router, Route, Link } from 'react-router';
var DocumentTitle = require('react-document-title');
var $ = require('jquery');
var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');
var AlbumsActions = require('../../actions/AlbumsActions');
var AlbumsStore = require('../../stores/AlbumsStore');
var WorkIntroGrapherList = require('./WorkIntroGrapherList');
var HamburgMenu = require('../HamburgMenu');
var AutoLoadPageMixin = require('../AutoLoadPageMixin');
import { LIST_ALL_WORKS } from '../Tools';
import Menu from './Menu';
import ShowMenu from './ShowMenu';

var WorkPage = React.createClass({
  mixins : [Reflux.listenTo(AlbumsStore,'_onAlbumsStoreChange') ,AutoLoadPageMixin],
  getInitialState: function() {
    return {
      pageIndex : 1,
      pageCount :0,
      total : 0,
      works: [],
      categories : [],
      category : ''
    };
  },
  getDefaultProps: function() {
    return {
      url: LIST_ALL_WORKS
    };
  },
  componentDidMount: function() {
    /*$.ajax ({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({works: data.Result});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    */
    AlbumsActions.search();
    AlbumsActions.getCategories();
  },
  _onAlbumsStoreChange : function(data){
    if(data.flag == 'search'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({works : this.state.works.concat(data.workList),pageIndex: data.pageIndex,total : data.total ,pageCount:data.pageCount});
      }
    }
    if(data.flag == 'getCategories'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({categories : data.categories});
      }
    }
  },
  onChangeCategory : function(category){
    this.setState({works : [],category : category});
    AlbumsActions.search(category);
  },
  onChangePage : function(pageIndex){
    AlbumsActions.search(this.state.category,pageIndex);
  },
  render: function() {
    return (
      <DocumentTitle title="全部作品">
        <div className="workPage">
          <HamburgMenu />
          <ShowMenu categories={this.state.categories} category={this.state.category} onChangeCategory={this.onChangeCategory}/>
          <WorkIntroGrapherList data={this.state.works} />
        </div>
      </DocumentTitle>
    );
  }
});
module.exports = WorkPage;
