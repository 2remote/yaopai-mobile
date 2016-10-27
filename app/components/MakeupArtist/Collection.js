import React from 'react'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import MakeupArtistActions from '../../actions/MakeupArtistActions'
import MakeupArtistStore from '../../stores/MakeupArtistStore'

class Collection extends React.Component {
  constructor(props) {
    super(props)
    this.state = { markState: false }
    this.onChangeMark = this.onChangeMark.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.albumId) MakeupArtistActions.markState(nextProps.isMark)
  }

  getAlbumsMarkState(data){
    if(data.flag !== "onChangemarkState") return
    this.setState({
      markState: data.markState
    })
  }

  onChangeMark() {
    this.state.markState ?
      MakeupArtistActions.albumsUnMark(this.props.albumId)
      :
      MakeupArtistActions.albumsMark(this.props.albumId)
  }

  render() {
    return <i onClick={this.onChangeMark} id="mark" className={`icon ${this.state.markState ? 'mark_active' : 'mark'}`} />
  }
}

ReactMixin.onClass(Collection,Reflux.listenTo(MakeupArtistStore, 'getAlbumsMarkState'))
export default Collection
