import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';
import PhotographerActions from '../../actions/PhotographerActions';
import PhotographerStore from '../../stores/PhotographerStore';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import { ButtonAttention } from '../UI/Button';
import {imgModifier} from '../Tools';
import Toaster from '../Toast';
import WechatShare from '../Weixin/WechatShare'
import DocumentTitle from 'react-document-title'

import $ from 'jquery';

var browser = {
  versions: function() {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return { //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象

class GrapherIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData : {},
      data: {},
      isClickMark: false,
      markExist: false,
      marks: 0,
    }
    this.attention = this.attention.bind(this)
    this.unAttention = this.unAttention.bind(this)
  }

  componentWillMount() {
    PhotographerActions.get(this.props.id)
    UserActions.currentUser()
  }
  // 获取登录信息
  onUserLoad(userData) {
    this.setState({ userData })
  }

  // 获取摄影师基本信息
  onGetSuccess(data) {
    this.setState({
      data: data.photographer,
      // markExist: data.photographer.MarkExist,
    })
  }

  // 点击关注
  attention() {
    if(!this.state.userData.isLogin){ // 用户未登录
      const confirmMsg = confirm("是否前往登录，然后关注？");
      if (confirmMsg == true) {
        this.history.pushState({nextPage : this.props.pathname},'/login_page');
      }

    } else if(this.state.userData.UserId == this.props.id) {
      this.showMessage('您不能关注自己');
      return;

    } else {
      $('#collect-icon').removeClass('mark').addClass('mark_active color_red');
      this.setState({isClickMark: true})
      // TODO 如何防止用户多次提交
      PhotographerActions.mark(this.props.id)
      this.setState({
        marks: 1,
      })
    }
  }
  // 点击取消关注
  unAttention() {
    $('#collect-icon').removeClass('mark_active color_red').addClass('mark');
    this.setState({isClickMark: true})
    // TODO 如何防止用户多次提交
    // confirm('确定取消关注吗')
    PhotographerActions.unMark(this.props.id)
    this.setState({
      marks: 0,
    })
  }

  onMarkSuccess(data){
    if (data.markExist.id == this.props.id) {
      this.setState({
        markExist: data.markExist.isMark,
      })
    }
  }

  onUnMarkSuccess(data){
    if (data.markExist.id == this.props.id) {
      this.setState({
        markExist: data.markExist.isMark,
      })
    }
  }

  showMessage (content) {
    this.refs.toast.show(content)
  }

  downloadApp () {
    if (browser.versions.mobile && browser.versions.iOS && ua.match(/MicroMessenger/i) == "micromessenger") {
      alert('由于微信限制，请在 Safari 浏览器里打开本网页，再点击下载 APP')
      return;
    }
  }

  render() {
    const {data} = this.state
    const title = this.state.NickName || '摄影师'
    const wechatShareTitle = 'YAOPAI 认证摄影师-' + data.NickName
    const wechatShareDesc = data.NickName + ':' + data.Signature

    let isShow = false;
    if (browser.versions.mobile && browser.versions.iOS /*&& ua.match(/MicroMessenger/i) == "micromessenger" */) {
      isShow = true;
    }
    return (
      <section className="grapherIntro">
        <DocumentTitle title={title} />
        <WechatShare title={wechatShareTitle} desc={wechatShareDesc} imgUrl={data.Avatar} />
        <Toaster ref="toast"/>

        <div className="baseInfo">
          <div className="avatar" style={{backgroundImage:`url('${data.Avatar}')`}} />
          <p className="nickname">{data.NickName}</p>
          <p className="font_small">{data.Signature}</p>
          <p className="font_small"><i className="icon didian"></i>{data.CityName}</p>
          {
            (this.state.isClickMark ? this.state.markExist : data.MarkExist)
            ?
            <ButtonAttention
              buttonType="btn-dark"
              value="已关注"
              handleSubmit={this.unAttention}
              iconType="mark_active color_red"
            />
            :
            <ButtonAttention
              buttonType="btn-dark"
              value="关注我"
              handleSubmit={this.attention}
              iconType="mark"
            />
          }

          {/* 注释在下面 */}
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
    );
  }
};

ReactMixin.onClass(GrapherIntro,Reflux.listenTo(PhotographerStore, 'onMarkSuccess'));
ReactMixin.onClass(GrapherIntro,Reflux.listenTo(PhotographerStore, 'onUnMarkSuccess'));
ReactMixin.onClass(GrapherIntro, Reflux.listenTo(PhotographerStore, 'onGetSuccess'));
ReactMixin.onClass(GrapherIntro, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(GrapherIntro, History);

export {GrapherIntro as default};

// isShow ?
// <a
//   href="https://itunes.apple.com/us/app/yaopai/id1105711466?l=zh&ls=1&mt=8"
//   className="button btn-dark download-app"
//   onClick={this.downloadApp}
// >
//   <i className="icon talk" /> 下载 APP 联系我
// </a>
// : ''
