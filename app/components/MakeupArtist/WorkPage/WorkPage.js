import React from 'react'
import CharacterBar from '../../UI/CharacterBar'
import CharacterSelect from '../../common/CharacterSelect'
import WorkIntroGrapherList from '../../common/WorkIntroGrapherList'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import AlbumsActions from '../../../actions/AlbumsActions'
import MakeupArtistAlbumsStore from '../../../stores/MakeupArtistAlbumsStore'

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
      componentName: 'WorkPage' // 请和组件的名字保持一致
    }
    AlbumsActions.makeupArtistAlbumsSearch()
    AlbumsActions.makeupArtistTagList()
  }

  _onAlbumsStoreChange(data) {
    if(data.flag == 'onMakeupArtistAlbumsSearchSuccess') {
      const {pageIndex, pageCount, total, result} = data
      this.setState({
        pageIndex,
        pageCount,
        total,
        result,
      })
    } else if (data.flag == 'onMakeupArtistTagListuccess') {
      const {tagListResult, tagListTotal} = data
      this.setState({
        tagListResult,
        tagListTotal,
      })
    }
  }

  onChangePage(pageIndex) {
    this.onShowToast('努力加载中...')
    AlbumsActions.makeupArtistAlbumsSearch(50, pageIndex)
  }

  render() {
    return (
      // TODO: DocumentTitle
      <div>
        <CharacterBar />
        <CharacterSelect data={this.state.tagListResult} />
        <Toaster ref="toast" isWorkPage={true} bottom={true} duration="1000000"/>
        {<WorkIntroGrapherList data={this.state.result} />}
      </div>
    )
  }
}

ReactMixin.onClass(WorkPage,Reflux.listenTo(MakeupArtistAlbumsStore, '_onAlbumsStoreChange'))
ReactMixin.onClass(WorkPage, AutoLoadPageMixin)
export default WorkPage
