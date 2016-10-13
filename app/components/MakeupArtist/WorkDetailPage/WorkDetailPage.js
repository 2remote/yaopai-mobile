import React from 'react'
import WorkDetailLayout from './WorkDetailLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import AlbumsActions from '../../../actions/AlbumsActions'
import MakeupArtistAlbumsStore from '../../../stores/MakeupArtistAlbumsStore'

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
        makeupArtist: {
          id: '',
          nickName: '',
          avatar: '',
          signature: '',
        },
      }
    }

    const albumsId = this.props.params.Id
    AlbumsActions.makeupArtistGetAlbumsDetail(albumsId)
  }

  getAlbumsDetail(data) {
    if(data.flag != 'onMakeupArtistGetAlbumsDetailSuccess') return
    const {title, description, cover, markExist, tags, photos, makeupArtist} = data.albumsDetail
    const {id, nickName, avatar, signature} = makeupArtist
    console.log(id)
    this.setState({
      albumsDetail: {
        title,
        description,
        cover,
        markExist,
        tags,
        photos,
        makeupArtist: {
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

ReactMixin.onClass(WorkDetailPage,Reflux.listenTo(MakeupArtistAlbumsStore, 'getAlbumsDetail'))
export default WorkDetailPage
