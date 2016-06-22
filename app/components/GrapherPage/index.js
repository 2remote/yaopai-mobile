import React from 'react'
import Reflux from 'reflux'
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
import ShowMenu from '../WorkPage/ShowMenu'

const GrapherPage = React.createClass({
  mixins : [Reflux.listenTo(PhotographerStore,'_onPhotographerStoreChange'), AutoLoadPageMixin],
  getInitialState() {
    return {
      graphers: [],
      pageIndex: 1,
      pageCount: 0,
      total: 0,
      searchKey: '',
      tags: [],
      selectedTags: []
    }
  },
  componentDidMount() {
    //this.handleLoadGraphers(this.props.url);
    PhotographerActions.list()

  },
  _onPhotographerStoreChange(data) {
    if(data.flag == 'list'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({
          graphers: this.state.graphers.concat(_.shuffle(data.photographers)),
          pageCount: data.pageCount
        });
        this.onHideToast()
      }
    }
  },
  onChangePage(pageIndex) {
    this.onShowToast('努力加载中...')
    PhotographerActions.list(pageIndex)
  },
  render() {

    const tagType = this.state.tags.map( x => x.Tags )

    const { searchKey, selectedTags } = this.state

    return (
      <DocumentTitle title={TITLE.grapherPage}>
        <div className="grapherPage">
          <SidePage />
          <ShowMenu
            tagType = {tagType}
            onSelectedTag = {this.handleUpdateTags}
            onSearch = {this.handleUpdateSearch}
            reset = {this.reset}
            searchKey = {searchKey}
            selectedTags = {selectedTags}
          />
          <GrapherList data={this.state.graphers} />
          <WechatShare title={TITLE.grapherPage} desc={TITLE.indexPage} />
          <Toaster ref="toast" bottom={true} duration="1000000"/>
        </div>
      </DocumentTitle>
    )
  }
})

export {GrapherPage as default}
