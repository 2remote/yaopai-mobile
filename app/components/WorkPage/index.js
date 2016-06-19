import React from 'react'
import Reflux from 'reflux'
import { History } from 'react-router'
import DocumentTitle from 'react-document-title'
import $ from 'jquery'
import AlbumsActions from '../../actions/AlbumsActions'
import AlbumsStore from '../../stores/AlbumsStore'
import WorkIntroGrapherList from '../common/WorkIntroGrapherList'
import SidePage from '../UI/SidePage'

import AutoLoadPageMixin from '../AutoLoadPageMixin'
import { LIST_ALL_WORKS, TITLE } from '../Tools'
import ShowMenu from './ShowMenu'
import _ from 'underscore'
import WechatShare from '../Weixin/WechatShare'
import Toaster from '../Toast'

const WorkPage = React.createClass({
  mixins: [Reflux.listenTo(AlbumsStore,'_onAlbumsStoreChange'), AutoLoadPageMixin, History],
  getInitialState() {
    return {
      pageIndex: 1,
      pageCount: 0,
      total: 0,
      works: [],
      searchKey: '',
      tags: [],
      selectedTags: []
    }
  },
  getDefaultProps() {
    return {
      url: LIST_ALL_WORKS
    }
  },
  componentDidMount() {
    AlbumsActions.getTagList()

    let tagListToInt = _.map(this.props.params.tag, num => parseInt(num) )
    let nonemptyTagList = _.filter(tagListToInt, num => !isNaN(num) )
    let thisIsACoolSearchKey = this.props.location.query.q

    if (nonemptyTagList[0] || thisIsACoolSearchKey){
      this.setState({selectedTags: nonemptyTagList, searchKey: thisIsACoolSearchKey}, () => {
        // 如果存在url的制定tag，会直接执行过滤作品
        AlbumsActions.query(this.state.selectedTags.join(','), this.state.searchKey)
      })
    } else {
      AlbumsActions.search()
    }
  },
  handleUpdateSearch(key) {
    this.setState({searchKey: key}, () => {
      // 读取search过滤的数据
      AlbumsActions.query(this.state.selectedTags.join(','), this.state.searchKey)
      // 把搜索和筛选结果写入路由
      this.history.pushState(null, `/work/${this.state.selectedTags.join("/")}`, {q: key})
    })
  },
  handleUpdateTags() {
    let selectedTags = []

    $('.tagColBoxActive').each(function () {
      selectedTags.push($(this).attr('id'))
    })

    this.setState({selectedTags: selectedTags}, () => {
      console.log(this.state.selectedTags)
      // 读取tag过滤的数据
      AlbumsActions.query(this.state.selectedTags.join(','), this.state.searchKey)
      // 把搜索和筛选结果写入路由
      this.history.pushState(null, `/work/${this.state.selectedTags.join("/")}`, {q: this.state.searchKey})
    })
  },
  reset(){
    // 重置 state 和接口
    this.setState({searchKey: "", selectedTags: []})
    AlbumsActions.query()
  },
  _onAlbumsStoreChange(data) {
    if(data.flag == 'search'){
      if(data.hintMessage){
        console.log(data.hintMessage)
      }else{
        this.setState({
          works: this.state.works.concat(data.workList),
          pageIndex: data.pageIndex,
          total: data.total,
          pageCount: data.pageCount
        })
        this.onHideToast()
      }
    }
    if (data.flag == 'query'){
      if (data.hintMessage){
        console.log(data.hintMessage)
      } else {
        this.setState({
          works: data.workList,
          pageIndex: data.pageIndex,
          total: data.total,
          pageCount: data.pageCount
        })
      }
    }
    if (data.flag == 'getTagList'){
      if (data.hintMessage){
        console.log(data.hintMessage)
      } else {
        console.log('getTagList', data)
        this.setState({tags : data.tags})
      }
    }
  },
  onChangePage(pageIndex) {
    this.onShowToast('努力加载中...')
    AlbumsActions.search(
      this.state.selectedTags.join(','),
      this.state.searchKey,
      pageIndex
    )
  },
  render() {

    const tagType = this.state.tags.map( x => x.Tags )

    const { searchKey, selectedTags } = this.state

    return (
      <DocumentTitle title={TITLE.workPage}>
        <div className="workPage">
          <SidePage />

          <ShowMenu
            tagType = {tagType}
            onSelectedTag = {this.handleUpdateTags}
            onSearch = {this.handleUpdateSearch}
            reset = {this.reset}
            searchKey = {searchKey}
            selectedTags = {selectedTags}
          />

          <WorkIntroGrapherList data={this.state.works} />
          <WechatShare title={TITLE.workPage} desc={TITLE.indexPage} />
          <Toaster ref="toast" isWorkPage={true} bottom={true} duration="1000000"/>
        </div>
      </DocumentTitle>
    )
  }
})

export {WorkPage as default}
