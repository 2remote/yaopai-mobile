import React from 'react'
import CharacterBar from '../../UI/CharacterBar'
import CharacterSelect from '../../common/CharacterSelect'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import AlbumsActions from '../../../actions/AlbumsActions'
import MakeupArtistAlbumsStore from '../../../stores/MakeupArtistAlbumsStore'

class WorkPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  _onAlbumsStoreChange(data) {

  }

  onSearch() {
    AlbumsActions.makeupArtistAlbumsSearch()
  }

  render() {
    return (
      // TODO: DocumentTitle
      <div>
        <CharacterBar />
        <CharacterSelect />
        <button onClick={this.onSearch}>测试</button>
      </div>
    )
  }
}

ReactMixin.onClass(WorkPage,Reflux.listenTo(MakeupArtistAlbumsStore, '_onAlbumsStoreChange'))
export default WorkPage
