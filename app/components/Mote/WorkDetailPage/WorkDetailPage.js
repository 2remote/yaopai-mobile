import React from 'react'
import WorkDetailLayout from '../../MakeupArtist/WorkDetailPage/WorkDetailLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import AlbumsActions from '../../../actions/AlbumsActions'
import MoteAlbumsStore from '../../../stores/MoteAlbumsStore'

class WorkDetailPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      albumsDetail: {
        title: '',
        description: '',
        cover: '',
        markExist: '',
        tags: [],
        photos: [],
        mote: {
          id: '',
          nickName: '',
          avatar: '',
          signature: '',
        },
      }
    }

    const albumsId = this.props.params.Id
    AlbumsActions.moteGetAlbumsDetail(albumsId)
  }

  getAlbumsDetail(data) {
    if(data.flag != 'onMoteGetAlbumsDetailSuccess') return
    const {title, description, cover, markExist, tags, photos, mote} = data.albumsDetail
    const {id, nickName, avatar, signature} = mote
    this.setState({
      albumsDetail: {
        title,
        description,
        cover,
        markExist,
        tags,
        photos,
        mote: {
          id,
          nickName,
          avatar,
          signature,
        },
      }
    })
  }

  render() {
    return (
      <div>
        <WorkDetailLayout data={this.state.albumsDetail} />
      </div>
    )
  }
}

ReactMixin.onClass(WorkDetailPage,Reflux.listenTo(MoteAlbumsStore, 'getAlbumsDetail'))
export default WorkDetailPage
