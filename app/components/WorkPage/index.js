import React from 'react';
import Reflux from 'reflux';
import { Router, Route, Link, History } from 'react-router';
import DocumentTitle from 'react-document-title';
import $ from 'jquery';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import AlbumsActions from '../../actions/AlbumsActions';
import AlbumsStore from '../../stores/AlbumsStore';
import WorkIntroGrapherList from './WorkIntroGrapherList';
import HamburgMenu from '../HamburgMenu';
import AutoLoadPageMixin from '../AutoLoadPageMixin';
import { LIST_ALL_WORKS, TITLE } from '../Tools';
import './index.scss';
import ShowMenu from './ShowMenu';
import _ from 'underscore';
import WechatShare from '../Weixin/WechatShare';
import Toaster from '../Toast';

var YaopaiLogo = React.createClass({
  render: function () {
    var style = {
      fontSize:20,
      backgroundColor:'white',
      color:'black',
      lineHeight:'57px',
      display:'block',
      textAlign: 'center',
      position: 'fixed',
      width:'100%',
      zIndex: '97',
      top:0,
      left:0
    };

    return (
      <div className="icon yaopainew" style={style} />
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
<<<<<<< HEAD
  componentDidMount: function() {
    AlbumsActions.search();
    AlbumsActions.getTagList();
=======
  componentDidMount() {
    AlbumsActions.search()
    AlbumsActions.getTagList()
>>>>>>> dev


    let tagListToInt = _.map(this.props.params.tag, num => parseInt(num) )
    let nonemptyTagList = _.filter(tagListToInt, num => !isNaN(num) )
    let thisIsACoolSearchKey = this.props.location.query.q

    if (nonemptyTagList[0] || thisIsACoolSearchKey){
      this.setState({selectedTags: nonemptyTagList, searchKey: thisIsACoolSearchKey}, function () {
        // 如果存在url的制定tag，会直接执行过滤作品
        AlbumsActions.searchByTags(null, 1, 10,
          this.state.selectedTags.join(','),
          this.state.searchKey
        )
      })
    }
  },
<<<<<<< HEAD
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
=======
  handleUpdateSearch(key) {
    this.setState({searchKey: key}, function () {
      // 读取search过滤的数据
      AlbumsActions.searchByTags(null, 1, 10,
        this.state.selectedTags.join(','),
        key
      )
      // 把搜索和筛选结果写入路由
      this.history.pushState(null, `/work/${this.state.selectedTags.join("/")}`, {q: key})
    })
  },
  handleUpdateTags() {

    let selectedTags = []

    $('.tagColBoxActive').each(function () {
      selectedTags.push($(this).attr('id'))
    })

    this.setState({selectedTags: selectedTags}, function () {
      console.log(this.state.selectedTags)
      // 读取tag过滤的数据
      AlbumsActions.searchByTags(null, 1, 10,
        this.state.selectedTags.join(','),
        this.state.searchKey
      )
      // 把搜索和筛选结果写入路由
      this.history.pushState(null, `/work/${this.state.selectedTags.join("/")}`, {q: this.state.searchKey})
    })
  },
  reset(){
    // 重置 state 和接口
    this.setState({searchKey: "", selectedTags: []})
    AlbumsActions.searchByTags(null, 1, 10)
  },
  _onAlbumsStoreChange(data) {
>>>>>>> dev
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
    const { searchKey, selectedTags} = this.state

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
<<<<<<< HEAD
            tagsInUrl={this.props.params.tag}
            cities={cities}
            catas={catas}
            onSelectedTag={this.handleUpdateTags} />
=======
            cities = {cities}
            catas = {catas}
            onSelectedTag = {this.handleUpdateTags}
            onSearch = {this.handleUpdateSearch}
            reset = {this.reset}
            searchKey = {searchKey}
            selectedTags = {selectedTags}
          />
>>>>>>> dev

          <WorkIntroGrapherList data={this.state.works} />
          <WechatShare title={TITLE.workPage} desc={TITLE.indexPage}>
          </WechatShare>
          <Toaster ref="toast" worfPageIs={true} bottom={true} duration="1000000"/>
        </div>
      </DocumentTitle>
    );
  }
});
export {WorkPage as default};
