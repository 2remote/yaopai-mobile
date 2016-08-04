import React, { Component } from 'react'
import { Link } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'

import {parseImageUrl} from '../Tools'
import $ from 'jquery'

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

class SidePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      userData : {}
    }
  }

  componentDidMount() {
    UserActions.currentUser();

    /**
     * 设备判断
     * browser.versions.mobile 是否移动端
     * browser.versions.ios    是否 ios 设备
     * ua.match(/MicroMessenger/i) == "micromessenger" 是否在微信里
     */

    if (browser.versions.mobile && browser.versions.iOS /*&& ua.match(/MicroMessenger/i) == "micromessenger" */) {
      $('#downloadAppMessage').show();
    }


    $('#menuLink').click(() => {
      const winHeight = `${$(window).height()}px`
      // TODO 打开侧边导航后禁止页面滚动
      // 在 Chrome 里测试正常，苹果手机测试失败，仍然可以滚动
      $('body').css({ height: winHeight, overflow: 'hidden' })
      $('#mask-menu').show().addClass('fade-toggle')
      $('#menu').addClass('slide-toggle')
    })

    $('#mask-menu, #menu').click(() => {
      $('#mask-menu').removeClass('fade-toggle').hide()
      $('#menu').removeClass('slide-toggle')
      $('body').css({ height: '100%', overflow: 'visible' })
    })
  }

  onUserLoad(userData) {
    this.setState({ userData })
  }

  logout() {
    UserActions.logout();
  }

  downloadApp() {
    $('#menu').removeClass('slide-toggle'); // 隐藏左侧菜单
    $('#mask-menu').removeClass('fade-toggle').hide(); // 隐藏黑色蒙版
    $('#downloadApp').show(); // 现实组件
    $('#app-close').click(() => $('#downloadApp').hide()) // 点击关闭隐藏组件
    $('#app-load').click(() => {
      if (browser.versions.mobile && browser.versions.iOS && ua.match(/MicroMessenger/i) == "micromessenger" ) {
        alert('由于微信限制，请在 Safari 浏览器里打开本网页，再点击下载 APP')
      }
    })
  }

  render() {
    // 判断侧边栏「首页」激活状态
    const isWorkActive = window.location.hash.indexOf("#/work?") > -1 || window.location.hash.indexOf("#/work/") > -1

    // iOS 分享过来的链接隐藏掉菜单栏
    if (this.props.shareFrom == 'ios') {
      return (
        <div />
      )
    } else {
      const userData = this.state.userData;
      let accountContent = <div></div>;
      if(userData.isLogin){ // 用户已登录
        accountContent = (
          <div className="menu-slide-header">
            <Link className="link-box" to={userData.userType ? '/center/g' : 'center/u'}>
              <img
                width={90}
                height={90}
                src={userData.avatar ? parseImageUrl(userData.avatar,90,90) : "../imgs/sidePage/default-avatar.png"}
              />
              <div className="nick-name">{userData.userName}</div>
            </Link>
            <div className="logout">
              <span
                className="icon logout_icon"
                onClick={this.logout}
              />
            </div>
          </div>
        )
      } else { // 用户未登录，跳转登录页
        accountContent= (
            <div className="menu-slide-header">
              <Link className="link-box" to="/login_page">
                <img
                  src="../imgs/sidePage/default-avatar.png"
                  srcSet="../imgs/sidePage/default-avatar@2X.png 2x"
                />
                <div className="login-msg">请登录</div>
              </Link>
          </div>
        )
      }
      return (
        <section>
          {/* 引导 APP 下载 */}
          <div id="downloadApp">
            <img id="app-close" src="http://7xte7j.com1.z0.glb.clouddn.com/app-close.png" />
            <img id="app-phone" src="http://7xte7j.com1.z0.glb.clouddn.com/app-phone.png" />
            <a href="https://itunes.apple.com/us/app/yaopai/id1105711466?l=zh&ls=1&mt=8">
              <img id="app-load" src="http://7xte7j.com1.z0.glb.clouddn.com/app-load.png" />
            </a>
            <p>-&nbsp;体验更流畅的预约服务&nbsp;-</p>
          </div>
          {/* Hamburger icon */}
          <div id="menuLink" className="menu-link">
            <i className="icon hamburgermenu"/>
          </div>
          <div id="actionSheet-wrap">
            { /* 透明遮罩层 */ }
            <div className="mask-transition" id="mask-menu"></div>

            <div className="actionsheet" id="menu">
              {accountContent}

              <nav className="menu-slide-nav pure-menu">
                <ul className="pure-menu-list">
                  <li className="pure-menu-item nav-list-bar">
                    <Link to="/work"
                          className={isWorkActive && "active"}>
                      <i className="menu-icon icon home" />
                      <div className="menu-button"><span>首页&nbsp;&nbsp;Home</span></div>
                    </Link>
                  </li>
                  {/*<li className="pure-menu-item nav-list-bar">
                    <Link to="/main/discovery" activeClassName="active">
                      <i className="menu-icon grid" />
                      <div className="menu-button"><span>作品&nbsp;&nbsp;LIBRARY</span></div>
                    </Link>
                  </li>*/}
                  <li className="pure-menu-item nav-list-bar">
                    <Link to="/grapher" activeClassName="active">
                      <i className="menu-icon icon camera" />
                      <div className="menu-button"><span>摄影师&nbsp;&nbsp;Grapher</span></div>
                    </Link>
                  </li>
                  <li className="pure-menu-item nav-list-bar">
                    <Link className="link-box" to={userData.userType ? "/center/g":"/center/u"} activeClassName="active">
                      <i className="menu-icon icon settings" />
                      <div className="menu-button"><span>个人中心&nbsp;&nbsp;USER</span></div>
                    </Link>
                  </li>
                  {/* 注释在下面 */}
                </ul>
              </nav>

              <footer className="menu-slide-footer">
                客服热线<br />
              <a href="tel:400-876-5981">400-876-5981</a>
              </footer>
            </div>
          </div>
        </section>
      )
    }
  }
}

ReactMixin.onClass(SidePage, Reflux.listenTo(UserStore, 'onUserLoad'));

export default SidePage;
// <li
//   style={{/*display: 'none'*/}}
//   id="downloadAppMessage"
//   className="pure-menu-item nav-list-bar"
//   onClick={/*this.downloadApp*/}>
//   <a href="javascript:void(0);" className="link-box">
//     <i className="menu-icon icon app" />
//     <div className="menu-button"><span>客户端下载&nbsp;&nbsp;APP</span></div>
//   </a>
// </li>
