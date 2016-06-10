import React, { Component } from 'react'
import { Link } from 'react-router'

import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';

import {parseImageUrl} from '../Tools';
import $ from 'jquery'

const style={
  loginBox: {
    position: 'relative',
    color:'#fff',
    marginBottom:'5px'
  },
  logout:{
    position: 'absolute',
    top: '58px',
    right: '0px'
  },
  loginName: {
    marginBottom: '16px',
    color:'white'
  },
  link:{
    lineHeight: '14px',
    paddingBottom: '15px',
    display: 'block',
    textAlign: 'center',
  },
  avatar:{
    margin: '34px 0 19px',
    fontSize:'55px',
    width:'90px',
    borderRadius:'50%',
  },
  loginIcon:{
    float: 'right',
    margin: '51px 15px 0 -53px'
  },
  spliterLine:{
    borderTop:'1px solid #2b2b2b',
    margin:'0 0 0 10%'
  },
  commonIcon: {
    marginTop: '15px'
  },
  logoutIcon:{
    marginRight:'20px'
  }
};

class SidePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      userData : {}
    }
  }

  componentDidMount() {
    UserActions.currentUser();

    $('#menuLink').click(() => {
      const winHeight = `${$(window).height()}px`
      // TODO 打开侧边导航后禁止页面滚动
      // 在 Chrome 里测试正常，苹果手机测试失败，仍然可以滚动
      $('body').css({ height: winHeight, overflow: 'hidden' })
      $('#mask-menu').show().addClass('fade-toggle')
      $('#menu').addClass('actionsheet-toggle')
    })

    $('#mask-menu').click(() => {
      $('#mask-menu').removeClass('fade-toggle').hide()
      $('#menu').removeClass('actionsheet-toggle')
      $('body').css({ height: '100%', overflow: 'visible' })
    })
  }

  onUserLoad(userData) {
    this.setState({ userData })
  }

  render() {
    const userData = this.state.userData;
    let accountContent = <div></div>;
    if(userData.isLogin){ // 用户未登录，跳转登陆页
      accountContent = (
        <div className="loginBox" style={style.loginBox}>
          <Link style={style.link} to={userData.userType==0?"/user_center":"/grapher_center"}>
              <img
                width={90}
                height={90}
                style={style.avatar}
                ref="defaultAvatar"
                src={userData.avatar ? parseImageUrl(userData.avatar,90,90) : "../imgs/sidePage/default-avatar.png"} />
                <div style={style.loginName} ref="pleaseLoginText">{userData.userName}</div>
            </Link>
          <div className="logout" style={style.logout}  >
            <span
              style={style.logoutIcon}
              ref="logoutIcon"
              className="icon logout_icon"
              onClick={this.logout} />
          </div>
        </div>
      )
    } else {
      accountContent= (
          <div className="loginBox" style={style.loginBox}>
            <Link style={style.link} to="/login_page">
              <img
                style={style.avatar}
                ref="defaultAvatar"
                src="../imgs/sidePage/default-avatar.png"
                srcSet="../imgs/sidePage/default-avatar@2X.png 2x" />
              <div style={style.loginName} ref="pleaseLoginText">请登录</div>
            </Link>
        </div>
      )
    }
    return (
      <section>
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
                  <Link to="/main/work" activeClassName="active">
                    <i className="menu-icon home" />
                    <div className="menu-button"><span>首页&nbsp;&nbsp;HOME</span></div>
                  </Link>
                </li>
                <li className="pure-menu-item nav-list-bar">
                  <Link to="/main/discovery" activeClassName="active">
                    <i className="menu-icon grid" />
                    <div className="menu-button"><span>作品&nbsp;&nbsp;LIBRARY</span></div>
                  </Link>
                </li>
                <li className="pure-menu-item nav-list-bar">
                  <Link to="/main/grapher" activeClassName="active">
                    <i className="menu-icon camera" />
                    <div className="menu-button"><span>摄影师&nbsp;&nbsp;PARAGRAPHER</span></div>
                  </Link>
                </li>
                <li className="pure-menu-item nav-list-bar">
                  <Link to="/main/user" activeClassName="active">
                    <i className="menu-icon settings" />
                    <div className="menu-button"><span>个人中心&nbsp;&nbsp;USER</span></div>
                  </Link>
                </li>
              </ul>
            </nav>

            <footer className="menu-slide-footer">
              客服热线<br />
            <a href="tel:400-1122-3323">0371-65337727</a>
            </footer>
          </div>
        </div>
      </section>
    )
  }
}

ReactMixin.onClass(SidePage, Reflux.listenTo(UserStore, 'onUserLoad'));

export default SidePage
