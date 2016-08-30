import React from 'react'
import Reflux from 'reflux'
import { History } from 'react-router'
import $ from 'jquery'
import DocumentTitle from 'react-document-title'
import SidePage from '../UI/SidePage'
import GrapherList from './GrapherList'
import PhotographerStore from '../../stores/PhotographerStore'
import PhotographerActions from '../../actions/PhotographerActions'
import AutoLoadPageMixin from '../AutoLoadPageMixin'
import { TITLE } from '../Tools'
import './GrapherPage.scss'
import _ from 'underscore'
import WechatShare from '../Weixin/WechatShare'
import Toaster from '../Toast'
import ShowMenu from './ShowMenu'

let lastQuery

const GrapherPage = React.createClass({
  mixins : [Reflux.listenTo(PhotographerStore,'_onPhotographerStoreChange'), AutoLoadPageMixin, History],
  getInitialState() {
    return {
      graphers: [],
      pageIndex: 1,
      pageCount: 0,
      total: 0,
      searchKey: '',
      showNothingFound: false,
    }
  },
  componentDidMount() {
    const 众里寻她千百度 = this.props.location.query.q

    if (众里寻她千百度){
      this.setState({searchKey: 众里寻她千百度}, () => {
        // 如果存在url的制定tag，会直接执行过滤作品
        PhotographerActions.query({key: this.state.searchKey})
      })
    } else {
      PhotographerActions.list()
    }
  },
  componentWillUpdate() {
    lastQuery = this.props.location.query.q
  },
  componentDidUpdate() {
    if (lastQuery !== this.props.location.query.q) {

      const thisIsACoolSearchKey = this.props.location.query.q

      this.setState({searchKey: thisIsACoolSearchKey}, () => {
          // 如果存在url的制定tag，会直接执行过滤作品
        PhotographerActions.query({key: thisIsACoolSearchKey})
      })

      console.log(this.state.searchKey);
    }
  },
  handleUpdateSearch(key) {
    console.warn(key);
    this.setState({searchKey: key}, () => {
      // 读取search过滤的数据
      PhotographerActions.query({key: this.state.searchKey})
      // 把搜索和筛选结果写入路由
      this.history.pushState(null, '/grapher', {q: key})
    })
  },
  reset() {
    // 重置 state 和接口
    this.setState({searchKey: ""})
    PhotographerActions.query()
    this.history.pushState(null, '/grapher')
  },
  _onPhotographerStoreChange(data) {
    console.table(data.photographers)
    if(data.flag == 'list'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({
          graphers: this.state.graphers.concat(data.photographers),
          pageCount: data.pageCount
        });
        this.onHideToast()
      }
    }
    if(data.flag == 'photographer-query') {
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({
          graphers: data.photographers,
          pageCount: data.pageCount,
          showNothingFound: true,
        });
        this.onHideToast()
      }
    }
  },
  onChangePage(pageIndex) {
    this.onShowToast('努力加载中...')
    PhotographerActions.list({
      pageIndex,
      key: this.state.searchKey
    })
  },
  render() {

    const { searchKey, graphers, showNothingFound } = this.state

    return (
      <DocumentTitle title={TITLE.grapherPage}>
        <div className="grapherPage">
          <SidePage />
          <ShowMenu
            onSearch = {this.handleUpdateSearch}
            reset = {this.reset}
            searchKey = {searchKey}
          />
          <GrapherList
            data={graphers}
            showNothingFound={showNothingFound}
            searchKey = {searchKey}
          />
          <WechatShare title={TITLE.grapherPage} desc={TITLE.indexPage} />
          <Toaster ref="toast" bottom={true} duration="1000000"/>
        </div>
      </DocumentTitle>
    )
  }
})

export {GrapherPage as default}
