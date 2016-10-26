import React from 'react'
import WorkDetailLayout from './WorkDetailLayout'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import AlbumsActions from '../../../actions/AlbumsActions'
import MakeupArtistAlbumsStore from '../../../stores/MakeupArtistAlbumsStore'
import UserActions from '../../../actions/UserActions'
import UserStore from '../../../stores/UserStore'

class WorkDetailPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      albumsDetail: {
        id: '',
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
      },
      userInfo: {
        userType: '',
        userId: '',
      }
    }

    const albumsId = this.props.params.Id
    AlbumsActions.makeupArtistGetAlbumsDetail(albumsId)
    UserActions.currentUser() // 获取用户登录数据
  }

  getAlbumsDetail(data) {
    if(data.flag != 'onMakeupArtistGetAlbumsDetailSuccess') return
    const {albumId, title, description, cover, markExist, tags, photos, makeupArtist} = data.albumsDetail
    const {id, nickName, avatar, signature} = makeupArtist
    this.setState({
      albumsDetail: {
        albumId,
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

  getUserInfo(data) {
    if(data.flag !== 'currentUser') return
    this.setState({
      userInfo: {
        userType: data.userType,
        userId: data.userId,
      }
    })
  }

  render() {
    return (
      <div>
        <WorkDetailLayout data={this.state.albumsDetail} userInfo={this.state.userInfo} />
      </div>
    )
  }
}

ReactMixin.onClass(WorkDetailPage,Reflux.listenTo(MakeupArtistAlbumsStore, 'getAlbumsDetail'))
ReactMixin.onClass(WorkDetailPage,Reflux.listenTo(UserStore, 'getUserInfo'))
export default WorkDetailPage
