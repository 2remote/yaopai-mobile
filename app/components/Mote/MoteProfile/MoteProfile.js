import React from 'react'
import SidePage from '../../UI/SidePage'
import MakeupArtistIntro from '../../MakeupArtist/MakeupArtistProfile/MakeupArtistIntro'
import WorkIntroGrapherList from '../../common/WorkIntroGrapherList'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import AlbumsActions from '../../../actions/AlbumsActions'
import AlbumsStore from '../../../stores/MoteAlbumsStore'
import MoteActions from '../../../actions/MoteActions'
import MoteStore from '../../../stores/MoteStore'

import LinkToApp from '../../common/LinkToApp'
import _ from 'underscore'

import $ from 'jquery'

class MoteProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: [],
      info: {
        cityName: '',
        marks: '',
        nickName: '',
        signature: '',
        totalAlbums: '',
        views: '',
        avatar: '',
        tags: [],
      }
    }
  }

  componentWillMount() {
    const userId = this.props.params.Id
    MoteActions.getInfo(userId)
    AlbumsActions.moteAlbumsSearch({userId})
  }

  onSearchSuccess(data) {
    if(data.flag != 'onMoteAlbumsSearchSuccess') return
    this.setState({
      result: data.result,
    })
  }

  // 获取摄影师基本信息
  onGetMakeupArtistInfo(data) {
    if(data.flag != 'getInfo') return
    if(data.hintMessage == '数据未找到') {
      alert('该模特已被禁用！')
      this.history.replaceState(null, '/work')
      return
    }
    const {cityName, marks, nickName, signature, totalAlbums, views, avatar, tags} = data.info
    this.setState({
      info: {
        cityName,
        marks,
        nickName,
        signature,
        totalAlbums,
        views,
        avatar,
        tags,
      }
    })
  }

  render() {
    return (
      <div className="grapherDetailPage">
        <SidePage shareFrom={this.props.location.query.sharefrom} />
        <MakeupArtistIntro data={this.state.info} pathname={this.props.location.pathname} />
        <WorkIntroGrapherList data={this.state.result} character="mote" />
        <LinkToApp />
      </div>
    )
  }
}

ReactMixin.onClass(MoteProfile, Reflux.listenTo(AlbumsStore, 'onSearchSuccess'))
ReactMixin.onClass(MoteProfile, Reflux.listenTo(MoteStore, 'onGetMakeupArtistInfo'))
export default MoteProfile
