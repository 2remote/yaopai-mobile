import React from 'react';
import { Link } from 'react-router';

import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';
import AlbumsActions from '../../actions/AlbumsActions';
import AlbumsStore from '../../stores/AlbumsStore';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import Toaster from '../Toast'

import {imgModifier} from '../Tools';
import LazyLoad from 'react-lazy-load';

class WorkIntroGrapherRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData : {},
      isClickMark: false,
      markExist: false,
    }
    this.attention = this.attention.bind(this)
    this.unAttention = this.unAttention.bind(this)
  }

  componentWillMount() {
    UserActions.currentUser()
  }
  // 获取登录信息
  onUserLoad(userData) {
    this.setState({ userData })
  }

  // 点击关注
  attention() {
    if(!this.state.userData.isLogin){ // 用户未登录
      const confirmMsg = confirm("是否前往登录，然后关注？");
      if (confirmMsg == true) {
        this.history.pushState({nextPage : this.props.pathname},'/login_page');
      }

    } else if(this.state.userData.UserId == this.props.data.UserId) {
      this.showMessage('您不能收藏自己的作品');
      return;

    } else {
      this.setState({isClickMark: true})
      // TODO 如何防止用户多次提交
      AlbumsActions.mark(this.props.data.Id)
    }
  }
  // 点击取消关注
  unAttention() {
    this.setState({isClickMark: true})
    // TODO 如何防止用户多次提交
    // confirm('确定取消关注吗')
    AlbumsActions.unMark(this.props.data.Id)
  }

  onMarkSuccess(data){
    if (data.markExist.id == this.props.data.Id) {
      this.setState({
        markExist: data.markExist.isMark,
      })
    }
  }

  onUnMarkSuccess(data){
    if (data.markExist.id == this.props.data.Id) {
      this.setState({
        markExist: data.markExist.isMark,
      })
    }
  }

  showMessage(content) {
    this.refs.toast.show(content)
  }

  render() {
    const {data} = this.props
    let cover
    if(data.Cut) {
      try {
        const cut = JSON.parse(data.Cut)
        cover = data.Cover + cut.w
      } catch(err) {
        console.log(err)
        cover = imgModifier(data.Cover, "workCover")
      }
    } else {
      cover = imgModifier(data.Cover, "workCover")
    }

    let grapherAvatar
    if (data.Photographer.Avatar) {
      grapherAvatar = <Link className="card-head-face" to={"/grapherDetail/"+data.UserId} >
                        <img src={imgModifier(data.Photographer.Avatar, "avatar")} />
                      </Link>
    } else {
      grapherAvatar = <div className="card-head-null"></div>
    }

    return (
      <div className="workIntroGrapherRow">
        <Toaster ref="toast"/>

        {
          (this.state.isClickMark ? this.state.markExist : data.MarkExist)
          ?
          <div className="work-collect" onClick={this.unAttention}>
            <i className="button-collect-active icon mark_active"/>
          </div>
          :
          <div className="work-collect" onClick={this.attention}>
            <i className="button-collect icon mark"/>
          </div>
        }
        <Link to={`/workDetail/${data.Id}`}>
          <div className="card-work" style={{height: 254/375*innerWidth}}>
            <LazyLoad threshold={100} once>
              <div className="card-price">
                ￥{data.Price} <span className="font_small">/套</span>
                <div className="triangle-top-left"></div>
                <div className="triangle-bottom-left"></div>
              </div>

              <img
                style={{width:'100%',height:254/375*innerWidth}}
                src={cover}
              />
            </LazyLoad>

          </div>
        </Link>

        {grapherAvatar}

        <div className="card-info">
          <p className="info-title">{data.Title}</p>
          <p className="info-Subtitle">有{data.Marks}人想拍</p>
        </div>
      </div>
    );
  }
}

ReactMixin.onClass(WorkIntroGrapherRow,Reflux.listenTo(AlbumsStore, 'onMarkSuccess'));
ReactMixin.onClass(WorkIntroGrapherRow,Reflux.listenTo(AlbumsStore, 'onUnMarkSuccess'));
ReactMixin.onClass(WorkIntroGrapherRow, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(WorkIntroGrapherRow, History);
export default WorkIntroGrapherRow;
