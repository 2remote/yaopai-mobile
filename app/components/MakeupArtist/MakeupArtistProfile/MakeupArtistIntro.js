import React from 'react'
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import { History } from 'react-router'

import MakeupArtistActions from '../../../actions/MakeupArtistActions'
import MakeupArtistStore from '../../../stores/MakeupArtistStore'
import UserActions from '../../../actions/UserActions'
import UserStore from '../../../stores/UserStore'

import { ButtonAttention } from '../../UI/Button'
import {imgModifier} from '../../Tools'
import Toaster from '../../Toast'
import WechatShare from '../../Weixin/WechatShare'
import DocumentTitle from 'react-document-title'

import $ from 'jquery'

class MakeupArtistIntro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      makeupArtistInfo: {
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
    MakeupArtistActions.getInfo(this.props.id)
    // UserActions.currentUser()
  }
  // 获取登录信息
  // onUserLoad(userData) {
  //   this.setState({ userData })
  // }

  // 获取摄影师基本信息
  onGetMakeupArtistInfo(data) {
    console.log(data)
    if(data.hintMessage == '数据未找到') {
      // alert('该摄影师已被禁用！')
      this.history.replaceState(null, '/work')
      return
    }
    const {cityName, marks, nickName, signature, totalAlbums, views, avatar, tags} = data
    this.setState({
      cityName,
      marks,
      nickName,
      signature,
      totalAlbums,
      views,
      avatar,
      tags,
    })
  }

  showMessage (content) {
    this.refs.toast.show(content)
  }

  render() {
    const {data} = this.state
    console.log(data)
    const title = this.state.NickName || '摄影师'
    const wechatShareTitle = 'YAOPAI 认证摄影师-' + data.NickName
    const wechatShareDesc = data.NickName + ':' + data.Signature

    return (
      <section className="grapherIntro">
        <DocumentTitle title={title} />
        <WechatShare title={wechatShareTitle} desc={wechatShareDesc} imgUrl={data.Avatar} />
        <Toaster ref="toast"/>

        <div className="baseInfo">
          <div className="avatar" style={{backgroundImage:`url('${data.Avatar}')`}}>

          </div>
          <p className="nickname">{data.CityName}·<strong>{data.NickName}</strong>&nbsp;<i className="icon renzheng"/></p>
          <p className="font_small"><i className="icon pencil" />&nbsp;{data.Signature}</p>
        </div>

        <div className="order">
          <ul>
            <li><span className="count">{data.TotalAlbums}</span>作品</li>
            <li><span className="count">{data.Sales}</span>订单</li>
            {
              data.Marks !== undefined?
              <li><span className="count">{data.Marks + this.state.marks}</span>关注</li>
              :
              null
            }
          </ul>
        </div>
      </section>
    )
  }
}

ReactMixin.onClass(MakeupArtistIntro, Reflux.listenTo(MakeupArtistStore, 'onGetMakeupArtistInfo'))
ReactMixin.onClass(MakeupArtistIntro, History)

export default MakeupArtistIntro
