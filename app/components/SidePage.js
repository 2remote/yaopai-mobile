import React from 'react';

import { Link, History,Location } from 'react-router';

import UserActions from '../actions/UserActions';
import './SlidePage.scss';
import SidePageIcon from './SidePageIcon';
import {parseImageUrl} from './Tools';

var style={
  sidePage:{
    height: '100%',
    background:'#282828',
    textAlign:'center',
    fontSize:'12px',

  },
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
    display: 'block'
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
  },
  service:{
    color:'#5c5c5c',
    textAlign:'left',
    padding:'20px',
    position:'absolute',
    bottom:'0'
  }
};


var SidePage = React.createClass({
  getInitialState: function() {
    return {
      visible: false,
      isLogin : false
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
                width={90}
                height={90}
                style={style.avatar}
                ref="defaultAvatar"
                src={this.props.userData.avatar ? parseImageUrl(this.props.userData.avatar,90,90) : "imgs/sidePage/default-avatar.png"} />
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
            <SidePageIcon name={'index'} icon={'home'} text={'首页 | HOME'} to={'/'} />
            <SidePageIcon name={'work'} icon={'grid'} text={'作品 | WORK'} />
            <div style={style.service}>
              <p>客服热线</p>
              <p>0371-65337727</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
});

export {SidePage as default};