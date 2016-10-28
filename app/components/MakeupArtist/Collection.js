import React from 'react'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import MakeupArtistActions from '../../actions/MakeupArtistActions'
import MakeupArtistStore from '../../stores/MakeupArtistStore'

import MoteActions from '../../actions/MoteActions'
import MoteStore from '../../stores/MoteStore'

class Collection extends React.Component {
  constructor(props) {
    super(props)
    this.state = { markState: false }
    this.onChangeMark = this.onChangeMark.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(!nextProps.albumId) return
    switch (nextProps.type)
    {
    case 'makeupArtist':
      MakeupArtistActions.markState(nextProps.isMark)
      break
    case 'mote':
      MoteActions.markState(nextProps.isMark)
      break
    default:
      return
    }
  }

  getMakeupArtistAlbumsMarkState(data){
    if(data.flag !== "onChangemarkState") return
    this.setState({
      markState: data.markState
    })
  }

  getMoteAlbumsMarkState(data){
    if(data.flag !== "onChangemarkState") return
    this.setState({
      markState: data.markState
    })
  }

  onChangeMark() {
    const {type, albumId} = this.props
    if(type === 'makeupArtist') {
      this.state.markState ?
        MakeupArtistActions.albumsUnMark(albumId)
        :
        MakeupArtistActions.albumsMark(albumId)

    } else if (type === 'mote') {
      this.state.markState ?
        MoteActions.albumsUnMark(albumId)
        :
        MoteActions.albumsMark(albumId)
    }

  }

  render() {
    return <i onClick={this.onChangeMark} id="mark" className={`icon ${this.state.markState ? 'mark_active' : 'mark'}`} />
  }
}

ReactMixin.onClass(Collection,Reflux.listenTo(MakeupArtistStore, 'getMakeupArtistAlbumsMarkState'))
ReactMixin.onClass(Collection,Reflux.listenTo(MoteStore, 'getMoteAlbumsMarkState'))
export default Collection
