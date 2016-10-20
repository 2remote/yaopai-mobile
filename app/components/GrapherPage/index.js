import React from 'react'
import { History } from 'react-router'
import DocumentTitle from 'react-document-title'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import PhotographerStore from '../../stores/PhotographerStore'
import PhotographerActions from '../../actions/PhotographerActions'
import AutoLoadPageMixin from '../AutoLoadPageMixin'

import SidePage from '../UI/SidePage'
import GrapherList from './GrapherList'

import { TITLE } from '../Tools'

import './GrapherPage.scss'
import _ from 'underscore'
import $ from 'jquery'


import WechatShare from '../Weixin/WechatShare'
import Toaster from '../Toast'
import ShowMenu from './ShowMenu'
import LinkToApp from '../common/LinkToApp'

let lastQuery

class GrapherPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      graphers: [],
      pageIndex: 1,
      pageCount: 0,
      total: 0,
      searchKey: '',
      showNothingFound: false,
      componentName: 'WorkPage',
    })
  }

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
  }

  componentWillUpdate() {
    lastQuery = this.props.location.query.q
  }

  componentDidUpdate() {
    if (lastQuery !== this.props.location.query.q) {

      const thisIsACoolSearchKey = this.props.location.query.q

      this.setState({searchKey: thisIsACoolSearchKey}, () => {
          // 如果存在url的制定tag，会直接执行过滤作品
        PhotographerActions.query({key: thisIsACoolSearchKey})
      })

      console.log(this.state.searchKey)
    }
  }

  handleUpdateSearch(key) {
    console.warn(key)
    this.setState({searchKey: key}, () => {
      // 读取search过滤的数据
      PhotographerActions.query({key: this.state.searchKey})
      // 把搜索和筛选结果写入路由
      this.history.pushState(null, '/grapher', {q: key})
    })
  }

  reset() {
    // 重置 state 和接口
    this.setState({searchKey: ""})
    PhotographerActions.query()
    this.history.pushState(null, '/grapher')
  }

  _onPhotographerStoreChange(data) {
    // console.table(data.photographers)
    if(data.flag == 'list'){
      if(data.hintMessage){
        console.log(data.hintMessage)
      }else{
        this.setState({
          graphers: [...this.state.graphers, ...data.photographers],
          pageCount: data.pageCount
        })
        this.onHideToast()
      }
    }
    if(data.flag == 'photographer-query') {
      if(data.hintMessage){
        console.log(data.hintMessage)
      }else{
        this.setState({
          graphers: data.photographers,
          pageCount: data.pageCount,
          showNothingFound: true,
        })
        this.onHideToast()
      }
    }
  }

  onChangePage(pageIndex) {
    this.onShowToast('努力加载中...')
    PhotographerActions.list({
      pageIndex,
      key: this.state.searchKey
    })
  }

  render() {
    const { searchKey, graphers, showNothingFound } = this.state

    return (
      <DocumentTitle title={TITLE.grapherPage}>
        <div className="grapherPage" ref="workpage">
          <SidePage />
          <ShowMenu
            onSearch = {this.handleUpdateSearch.bind(this)}
            reset = {this.reset.bind(this)}
            searchKey = {searchKey}
          />
          <GrapherList
            data={graphers}
            showNothingFound={showNothingFound}
            searchKey = {searchKey}
          />
          <WechatShare title={TITLE.grapherPage} desc={TITLE.indexPage} />
          <Toaster ref="toast" bottom={true} duration="1000000"/>
          <LinkToApp />
        </div>
      </DocumentTitle>
    )
  }
}

ReactMixin.onClass(GrapherPage,Reflux.listenTo(PhotographerStore, '_onPhotographerStoreChange'))
ReactMixin.onClass(GrapherPage, AutoLoadPageMixin)
ReactMixin.onClass(GrapherPage, History)
export default GrapherPage
