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

import ShowMenu from './ShowMenu';
import _ from 'underscore';

var YaopaiLogo = React.createClass({
  render: function () {
    var style = {
      fontSize:105, 
      backgroundColor:'black', 
      color:'white', 
      lineHeight:0.3,
      display:'block',
      textAlign: 'center',
      paddingTop:'30px',
      paddingBottom: '15px',
      position: 'fixed',
      width:'100%',
      zIndex: '98',
    };

    return (
      <div className="icon yaopai_logo" style={style} />
    );
  }
});

var WorkPage = React.createClass({
  mixins : [Reflux.listenTo(AlbumsStore,'_onAlbumsStoreChange') ,AutoLoadPageMixin],
  getInitialState: function() {
    return {
      pageIndex : 1,
      pageCount :0,
      total : 0,
      works: [],
      tags: [],
      selectedTags: [],
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
    AlbumsActions.search();
    AlbumsActions.getCategories();
    AlbumsActions.getTagList();
  },
  handleUpdateTags: function (tag) {
    var tags = this.state.selectedTags;
    var foundTagLocation = _.indexOf(this.state.selectedTags,tag);
    if(  foundTagLocation >= 0 ){
      // 发现tag存在于选中tags中，判定用户反选该tag
      tags.splice(foundTagLocation, 1);
    }else{
      tags.push(tag);  
    }
    
    this.setState({selectedTags: tags}, function () {
      console.warn(this.state.selectedTags);
    });
  },
  _onAlbumsStoreChange : function(data){
    if(data.flag == 'search'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({
          works: this.state.works.concat(_.shuffle(data.workList)),
          pageIndex: data.pageIndex,
          total: data.total,
          pageCount: data.pageCount
        });

      }
    }
    if(data.flag == 'getCategories'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({categories : data.categories});
      }
    }
    if(data.flag == 'getTagList'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        console.log('getTagList', data);
        this.setState({tags : data.tags});
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
    var cities = [];
    var catas = [];
    if ( this.state.tags.length > 1 ){
      cities = this.state.tags[1].Tags;
      catas = this.state.tags[0].Tags;  
    }
    
    return (
      <DocumentTitle title="全部作品">
        <div className="workPage">
          <HamburgMenu />
          <YaopaiLogo />
          <ShowMenu 
            cities={cities} 
            catas={catas} 
            onSelectedTag={this.handleUpdateTags} />

          <WorkIntroGrapherList data={this.state.works} />
        </div>
      </DocumentTitle>
    );
  }
});
module.exports = WorkPage;
