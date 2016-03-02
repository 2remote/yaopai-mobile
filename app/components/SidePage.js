import React from 'react';

import { Link, History,Location } from 'react-router';

var UserActions = require('../actions/UserActions');
require('./SidePage.css');
import SidePageIcon from './SidePageIcon';
import {parseImageUrl} from './Tools';

var style={
  sidePage:{
    boxShadow: 'inset -2px 0px 16px 4px #C9C9C9',
    paddingRight: '14%',
    height: '100%',
    overflow: 'scroll',
    textAlign: 'center'
  },
  loginBox: {
    position: 'relative',
  },
  logout:{
    position: 'absolute',
    top: '58px',
    right: '0px'
  },
  loginName: {
    marginBottom: '15px',
  },
  link:{
    lineHeight: '14px',
    paddingBottom: '15px',
    display: 'block'
  },
  avatar:{
    margin: '34px 0 19px',
    fontSize:'55px'
  },
  loginIcon:{
    float: 'right',
    margin: '51px 15px 0 -53px'
  },
  spliterLine:{
    borderTop:'1px solid #c9c9c9',
    margin:'0 0 0 10%'
  },
  commonIcon: {
    marginTop: '15px',
  },
};


var SidePage = React.createClass({
  getInitialState: function() {
    return {
      visible: false,
      isLogin : false,
    };
  },
  show: function() {
    this.setState({ visible: true });
    //document.addEventListener("click", this.hide.bind(this));
  },

  hide: function() {
    //document.removeEventListener("click", this.hide.bind(this));
    this.setState({ visible: false });
  },
  logout : function () {
    UserActions.logout();
  },

  render: function() {
    var accountContent = '';
    if(this.props.userData && this.props.userData.isLogin){
      accountContent = (
        <div className="loginBox" style={style.loginBox}>
          <Link style={style.link} to={this.props.userData.userType==0?"/user_center":"/grapher_center"}>
              <img
                width={70}
                height={70}
                style={style.avatar}
                ref="defaultAvatar"
                src={this.props.userData.avatar ? parseImageUrl(this.props.userData.avatar,70,70) : "imgs/sidePage/default-avatar.png"} />
                <div style={style.loginName} ref="pleaseLoginText">{this.props.userData.userName}</div>
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
    }else{
      accountContent= (<div className="loginBox" style={style.loginBox}>
        <Link style={style.link} to="/login_page">
          <img
            style={style.avatar}
            ref="defaultAvatar"
            src="imgs/sidePage/default-avatar.png"
            srcSet="imgs/sidePage/default-avatar@2X.png 2x" />
          <div style={style.loginName} ref="pleaseLoginText">请登录</div>
        </Link>
      </div>
      )
    }
    return(
      <div
        className="menu">
        <div className={(this.state.visible ? "visible " : "") + 'left'}>
          <div
            style={style.sidePage}
            className="sidePage">
            
            {accountContent}

            <SidePageIcon name={'index'} text={'首页'} to={'/'} />
            <SidePageIcon name={'work'} text={'作品'} />
            <SidePageIcon name={'grapher'} text={'摄影师'} />
            <SidePageIcon name={'interview'} text={'访谈'} />
            <SidePageIcon name={'activity'} text={'活动'} />
            
            <div style={style.spliterLine} className="spliterLine" />
          </div>
        </div>
      </div>
    );
  },
});

module.exports = SidePage;
