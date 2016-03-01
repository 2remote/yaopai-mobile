var React = require('react');
var Reflux = require('reflux');
import { Router, Route, Link, History } from 'react-router';
var DocumentTitle = require('react-document-title');
var $ = require('jquery');
var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');
var AlbumsActions = require('../../actions/AlbumsActions');
var AlbumsStore = require('../../stores/AlbumsStore');
var WorkIntroGrapherList = require('./WorkIntroGrapherList');
var HamburgMenu = require('../HamburgMenu');
var AutoLoadPageMixin = require('../AutoLoadPageMixin');
import { LIST_ALL_WORKS, TITLE } from '../Tools';

import ShowMenu from './ShowMenu';
import _ from 'underscore';
var WechatShare = require('../Weixin/WechatShare');
var Toaster = require('../Toast');

var YaopaiLogo = React.createClass({
  render: function () {
    var style = {
      fontSize:105,
      backgroundColor:'black',
      color:'white',
      lineHeight:0.3,
      display:'block',
      textAlign: 'center',
      paddingTop: 13,
      paddingBottom: '5px',
      position: 'fixed',
      width:'100%',
      zIndex: '97',
      top:0,
      left:0,
    };

    return (
      <div className="icon yaopai_logo" style={style} />
    );
  }
});

var WorkPage = React.createClass({
  mixins : [Reflux.listenTo(AlbumsStore,'_onAlbumsStoreChange'), AutoLoadPageMixin, History],
  getInitialState: function() {
    return {
      pageIndex : 1,
      pageCount :0,
      total : 0,
      works: [],
      tags: [],
      selectedTags: []
    };
  },
  getDefaultProps: function() {
    return {
      url: LIST_ALL_WORKS
    };
  },
  componentDidMount: function() {
    AlbumsActions.search();
    AlbumsActions.getTagList();
    let tags = _.map(this.props.params.tag, function(num){ return parseInt(num); });
    if (tags[0]){
      console.log('old selectedTags:'+this.state.selectedTags);
      this.setState({selectedTags: tags}, function () {
        console.log('new selectedTags:'+this.state.selectedTags);
        // 如果存在url的制定tag，会直接执行过滤作品
        AlbumsActions.searchByTags(null, 
        1,
        10,
        this.state.selectedTags.join(","));
      });
    }
  },
  handleUpdateTags: function (tag) {
    var tags = this.state.selectedTags;
    if (this.props.params.tag[0]) {
      this.history.push('/work');
      tags = [];
    }
    var foundTagLocation = _.indexOf(tags, tag);
    if(  foundTagLocation >= 0 ){
      // 发现tag存在于选中tags中，判定用户反选该tag
      tags.splice(foundTagLocation, 1);
    }else{
      tags.push(tag);
    }

    this.setState({selectedTags: tags}, function () {
      console.log(this.state.selectedTags);
      // 读取tag过滤的数据
      AlbumsActions.searchByTags(null,
      1,
      10,
      this.state.selectedTags.join(","));
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
        this.onHideToast()
      }
    }
    if(data.flag == 'searchByTags'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({
          works: _.shuffle(data.workList),
          pageIndex: data.pageIndex,
          total: data.total,
          pageCount: data.pageCount
        });

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
    this.onShowToast('努力加载中...')
    AlbumsActions.search(null,pageIndex, 10, this.state.selectedTags.join(','));
  },
  render: function() {
    var cities = [];
    var catas = [];
    if ( this.state.tags.length > 1 ){
      cities = this.state.tags[1].Tags;
      catas = this.state.tags[0].Tags;
    }

    return (
      <DocumentTitle title={TITLE.workPage}>
        <div className="workPage">
          <HamburgMenu style={{
            position: 'fixed',
            top: 5,
            padding: 10,
            margin: -10,
            left: 22,
            zIndex: 99}}/>
          <YaopaiLogo />
          <ShowMenu 
            tagsInUrl={this.props.params.tag}
            cities={cities} 
            catas={catas} 
            onSelectedTag={this.handleUpdateTags} />

          <WorkIntroGrapherList data={this.state.works} />
          <WechatShare title={TITLE.workPage} desc={TITLE.indexPage}>
          </WechatShare>
          <Toaster ref="toast" worfPageIs={true} bottom={true} duration="1000000"/>
        </div>
      </DocumentTitle>
    );
  }
});
module.exports = WorkPage;
