import React from 'react';
import Reflux from 'reflux';
import { History } from 'react-router';
import DocumentTitle from 'react-document-title';
import $ from 'jquery';
import AlbumsActions from '../../actions/AlbumsActions';
import AlbumsStore from '../../stores/AlbumsStore';
import WorkIntroGrapherList from './WorkIntroGrapherList';
import SidePage from '../UI/SidePage';

import AutoLoadPageMixin from '../AutoLoadPageMixin';
import { LIST_ALL_WORKS, TITLE } from '../Tools';
import ShowMenu from './ShowMenu';
import _ from 'underscore';
import WechatShare from '../Weixin/WechatShare';
import Toaster from '../Toast';

var WorkPage = React.createClass({
  mixins : [Reflux.listenTo(AlbumsStore,'_onAlbumsStoreChange'), AutoLoadPageMixin, History],
  getInitialState: function() {
    return {
      pageIndex : 1,
      pageCount :0,
      total : 0,
      works: [],
      searchKey: '',
      tags: [],
      selectedTags: []
    };
  },
  getDefaultProps() {
    return {
      url: LIST_ALL_WORKS
    };
  },
  componentDidMount() {
    AlbumsActions.search();
    AlbumsActions.getTagList();

    let tagListToInt = _.map(this.props.params.tag, num => parseInt(num) );
    let nonemptyTagList = _.filter(tagListToInt, num => !isNaN(num) );

    if (nonemptyTagList[0]){
      this.setState({selectedTags: nonemptyTagList}, function () {
        // 如果存在url的制定tag，会直接执行过滤作品
        AlbumsActions.searchByTags(null,
        1,
        10,
        this.state.selectedTags.join(","));
      });
    }
  },
  handleUpdateSearch(key) {
    this.setState({searchKey: key}, function () {
      // 读取search过滤的数据
      AlbumsActions.searchByKey(null,
      1,
      10,
      this.state.selectedTags.join(","),
      key);
    });
  },
  handleUpdateTags(tag) {
    if (this.props.params.tag[0]) {
      this.history.push('/work')
    }

    let selectedTags = []

    $('.tagColBoxActive').each(function () {      //注意input前面有个空格
      selectedTags.push($(this).attr('id'))
    })

    this.setState({selectedTags: selectedTags}, function () {
      console.log(this.state.selectedTags)
      // 读取tag过滤的数据
      AlbumsActions.searchByTags(null, 1, 10,
        this.state.selectedTags.join(","),
        this.state.searchKey
      )
    })
  },
  reset(){
    // 重置 state 和接口
    this.setState({searchKey: "", selectedTags: []})
    AlbumsActions.searchByTags(null, 1, 10)
  },
  _onAlbumsStoreChange(data) {

    if(data.flag == 'search'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({
          works: this.state.works.concat(data.workList),
          pageIndex: data.pageIndex,
          total: data.total,
          pageCount: data.pageCount
        });
        this.onHideToast()
      }
    }
    if(data.flag == 'searchByKey'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({
          works: data.workList,
          pageIndex: data.pageIndex,
          total: data.total,
          pageCount: data.pageCount
        });

      }
    }
    if(data.flag == 'searchByTags'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({
          works: data.workList,
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
    if(this.state.searchKey){
      AlbumsActions.searchByKey(null, pageIndex, 10, null, this.state.searchKey)
    } else {
      AlbumsActions.search(null,pageIndex, 10, this.state.selectedTags.join(','));
    }
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
          <SidePage />

          <ShowMenu
            tagsInUrl={this.props.params.tag}
            cities={cities}
            catas={catas}
            onSelectedTag={this.handleUpdateTags}
            onSearch = {this.handleUpdateSearch}
            reset = {this.reset}
          />

          <WorkIntroGrapherList data={this.state.works} />
          <WechatShare title={TITLE.workPage} desc={TITLE.indexPage} />
          <Toaster ref="toast" worfPageIs={true} bottom={true} duration="1000000"/>
        </div>
      </DocumentTitle>
    );
  }
});
export {WorkPage as default};
