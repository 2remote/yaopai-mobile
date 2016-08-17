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
import AnimationGuide from './AnimationGuide'
import ShowMenu from './ShowMenu'
import _ from 'underscore'
import WechatShare from '../Weixin/WechatShare'
import Toaster from '../Toast'

let lastPathname

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
      selectedTags: [],
      showNothingFound: false,
    }
  },
  componentDidMount() {
    AlbumsActions.getTagList()

    const nonemptyTagList = _.filter(this.props.params.tag, x => !_.isUndefined(x) )
    const thisIsACoolSearchKey = this.props.location.query.q

    if (nonemptyTagList[0] || thisIsACoolSearchKey){
      this.setState({selectedTags: nonemptyTagList, searchKey: thisIsACoolSearchKey}, () => {
        // 如果存在url的制定tag，会直接执行过滤作品
        AlbumsActions.query({
          tags:this.state.selectedTags.join(','),
          key:this.state.searchKey,
        })
      })
    } else {
      AlbumsActions.search()
    }
  },
  componentWillUpdate() {
    lastPathname = this.props.location.pathname + this.props.location.query.q
  },
  componentDidUpdate() {
    if (lastPathname !== this.props.location.pathname + this.props.location.query.q) {

      const nonemptyTagList = _.filter(this.props.params.tag, x => !_.isUndefined(x) )
      const thisIsACoolSearchKey = this.props.location.query.q

      this.setState({selectedTags: nonemptyTagList, searchKey: thisIsACoolSearchKey}, () => {
          // 如果存在url的制定tag，会直接执行过滤作品
        AlbumsActions.query({
          tags:this.state.selectedTags.join(','),
          key:this.state.searchKey,
        })
      })

    }
  },
  handleUpdateSearch(key) {
    this.setState({searchKey: key}, () => {
      // 读取search过滤的数据
      AlbumsActions.query({
        tags: this.state.selectedTags.join(','),
        key: this.state.searchKey
      })
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
      // 读取tag过滤的数据
      AlbumsActions.query({
        tags: this.state.selectedTags.join(','),
        key: this.state.searchKey,
      })
      // 把搜索和筛选结果写入路由
      this.history.pushState(null, `/work/${this.state.selectedTags.join("/")}`, {q: this.state.searchKey})
    })
  },
  _onAlbumsStoreChange(data) {
    const handleByFlag = {
      search: () => {
        this.setState({
          works: this.state.works.concat(data.workList),
          pageIndex: data.pageIndex,
          total: data.total,
          pageCount: data.pageCount,
        })
        this.onHideToast()
      },
      query: () => {
        this.setState({
          works: data.workList,
          pageIndex: data.pageIndex,
          total: data.total,
          pageCount: data.pageCount,
          showNothingFound: true,
        })
      },
      getTagList: () => this.setState({tags : data.tags})
    }

    data.hintMessage ? console.log(data.hintMessage) : handleByFlag[data.flag]()
  },
  onChangePage(pageIndex) {
    this.onShowToast('努力加载中...')
    AlbumsActions.search({
      tags: this.state.selectedTags.join(','),
      key: this.state.searchKey,
      pageIndex,
    })
  },
  render() {

    const { searchKey, selectedTags, works, showNothingFound, tags } = this.state

    return (
      <DocumentTitle title={TITLE.workPage}>
        <div className="workPage">
          {/* 一定要确保 AnimationGuide 这个组件在最上面 ！！！ */}
          <AnimationGuide />
          <a href="http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=2652147338&idx=1&sn=024c366da98fe7f1edda56258270cff5&scene=1&srcid=0811mhWqfkgDQCOgI2EBTFOs#rd">
            <img
               style={{
                 width: '100%',
                 height: '60%',
                 marginTop: '50px',
                 marginBottom: '-50px',
               }}
               src="http://7xte7j.com1.z0.glb.clouddn.com/join.jpg" />
          </a>
          <SidePage />

          <ShowMenu
            tags = {tags}
            onSelectedTag = {this.handleUpdateTags}
            onSearch = {this.handleUpdateSearch}
            reset = {this.reset}
            searchKey = {searchKey}
            selectedTags = {selectedTags}
          />

          <WorkIntroGrapherList
            data = {works}
            showNothingFound = {showNothingFound}
            searchKey = {searchKey}
            selectedTags = {selectedTags}
          />
          <WechatShare title={TITLE.workPage} desc={TITLE.indexPage} />
          <Toaster ref="toast" isWorkPage={true} bottom={true} duration="1000000"/>
        </div>
      </DocumentTitle>
    )
  }
})

export {WorkPage as default}
