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
import { LIST_ALL_WORKS } from '../Tools';
import Menu from './Menu';
import ShowMenu from './ShowMenu';

var WorkPage = React.createClass({
  mixins : [Reflux.listenTo(AlbumsStore,'_onAlbumsStoreChange')],
  getInitialState: function() {
    return {
      pageIndex : 1,
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
    AlbumsActions.search(null);
    AlbumsActions.getCategories();
  },
  _onAlbumsStoreChange : function(data){
    if(data.flag == 'search'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({works : data.workList,pageIndex: data.pageIndex,total : data.total});
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
    this.setState({category : category});
    AlbumsActions.search(category);
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
