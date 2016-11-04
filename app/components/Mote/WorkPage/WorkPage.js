import React from 'react'
import CharacterBar from '../../UI/CharacterBar'
import CharacterSelect from '../../common/CharacterSelect'
import WorkIntroGrapherList from '../../common/WorkIntroGrapherList'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import AlbumsActions from '../../../actions/AlbumsActions'
import MoteAlbumsStore from '../../../stores/MoteAlbumsStore'

import AutoLoadPageMixin from '../../AutoLoadPageMixin'
import Toaster from '../../Toast'

class WorkPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pageIndex: 1,
      pageCount: 0,
      total: 0,
      result: [],
      tagListResult: [],
      tagListTotal: '',
      // searchKey: '',
      // tags: [],
      // priceTag: 100,
      // selectedTags: [],
      // showNothingFound: false,
      componentName: 'moteWorkPage',
    }
    AlbumsActions.moteAlbumsSearch()
    AlbumsActions.moteTagList()
  }

  _onAlbumsStoreChange(data) {
    if(data.flag == 'onMoteAlbumsSearchSuccess') {
      const {pageIndex, pageCount, total, result} = data
      this.setState({
        pageIndex,
        pageCount,
        total,
        result,
      })
    } else if (data.flag == 'onMoteTagListuccess') {
      const {tagListResult, tagListTotal} = data
      this.setState({
        tagListResult,
        tagListTotal,
      })
    }
  }

  onChangePage(pageIndex) {
    if(pageIndex === 1) return
    this.onShowToast('努力加载中...')
    AlbumsActions.moteAlbumsSearch(50, pageIndex)
  }

  render() {
    return (
      // TODO: DocumentTitle
      <div>
        <CharacterBar />
        <CharacterSelect data={this.state.tagListResult} character="模特 / Model"  />
        <Toaster ref="toast" isWorkPage={true} bottom={true} duration="1000000"/>
        <WorkIntroGrapherList data={this.state.result} character="mote" />
      </div>
    )
  }
}

ReactMixin.onClass(WorkPage,Reflux.listenTo(MoteAlbumsStore, '_onAlbumsStoreChange'))
ReactMixin.onClass(WorkPage, AutoLoadPageMixin)
export default WorkPage
