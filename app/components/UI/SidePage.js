import React, { Component } from 'react'
import { Link } from 'react-router'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'

import {parseImageUrl} from '../Tools'
import $ from 'jquery'

class SidePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      userData : {}
    }
  }

  componentDidMount() {
    UserActions.currentUser()

    $('#menuLink').click(() => {
      const winHeight = `${$(window).height()}px`
      $('#mask-menu').show().addClass('fade-toggle')
      $('#menu').addClass('slide-toggle')
    })

    $('#mask-menu, #menu').click(() => {
      $('#mask-menu').removeClass('fade-toggle').hide()
      $('#menu').removeClass('slide-toggle')
    })
  }

  onUserLoad(userData) {
    this.setState({ userData })
  }

  logout() {
    UserActions.logout()
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
      const userData = this.state.userData
      let accountContent = <div></div>
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
            <div className="logout" onClick={this.logout}>
              <i className="icon logout_icon"/>
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
        <section style={{minHeight: '1px'}}>
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
                  <li className="pure-menu-item nav-list-bar">
                    <Link to="/grapher" activeClassName="active">
                      <i className="menu-icon icon camera" />
                      <div className="menu-button"><span>摄影师&nbsp;&nbsp;Grapher</span></div>
                    </Link>
                  </li>
                  <li className="pure-menu-item nav-list-bar">
                    <Link to="/discover/mote/workPage" activeClassName="active">
                      <i className="menu-icon icon camera" />
                      <div className="menu-button"><span>模特&nbsp;&nbsp;Mote</span></div>
                    </Link>
                  </li>
                  <li className="pure-menu-item nav-list-bar">
                    <Link to="/discover/makeupArtist/workPage" activeClassName="active">
                      <i className="menu-icon icon camera" />
                      <div className="menu-button"><span>化妆师&nbsp;&nbsp;MakeupArtist</span></div>
                    </Link>
                  </li>
                  <li className="pure-menu-item nav-list-bar">
                    <Link className="link-box" to={userData.userType ? "/center/g":"/center/u"} activeClassName="active">
                      <i className="menu-icon icon settings" />
                      <div className="menu-button"><span>个人中心&nbsp;&nbsp;User</span></div>
                    </Link>
                  </li>
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

ReactMixin.onClass(SidePage, Reflux.listenTo(UserStore, 'onUserLoad'))

export default SidePage
