import React from 'react';
import {Link} from 'react-router';
import AvatarUploader from './UserCenterPage/AvatarUploader.js';
import {parseImageUrl} from './Tools';

var UserAvatarBox = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
        userName: '未命名',
        editAvatar: false
      }
    };
  },

  render: function() {
    var style = {
      avatar: {
        width: 90,
        height: 90,
        margin: '50px 0 0px',
        borderRadius:'50%'
      },
      nick: {
        color: '#999',
        padding: '10px 0 30px'
      },
      background: {
        padding: '20px 0',
        textAlign: 'center',
        background:'#282828'
      },
      updateInfo: {
        position: 'absolute',
        top: 20,
        right: 10,
        color:'#fff'
      }
    };

    var avatar = this.props.data.avatar?parseImageUrl(this.props.data.avatar,78,78):null
    var AvatarImage = (
      <div>
        <img
          style={style.avatar}
          ref="userAvatar"
          src={avatar || 'imgs/sidePage/default-avatar.png'}
          srcSet={avatar || 'imgs/sidePage/default-avatar@2X.png 2x'} />
      </div>
    );

    var AvatarUploaderImage = (
      <div>
        <AvatarUploader
          style={style.avatar}
          defaultImage={avatar || 'imgs/sidePage/default-avatar.png'} />
      </div>
    );

    if(this.props.editAvatar){
      AvatarImage = AvatarUploaderImage;
    }
    var content = (
      <div
        style={this.props.background?style.background:{}}
        className="userAvatarBox">
        {AvatarImage}
        <div style={style.nick} ref="userNick" >
          {this.props.editAvatar ? "点击头像上传" : this.props.data.userName}
        </div>
        <div className="updateInfo" style={style.updateInfo}>{this.props.editAvatar ? "" : "修改资料>"}</div>
      </div>
    );
    var children = (
      <Link to="/user_edit_profile">{content}</Link>
    );
    if(this.props.editAvatar){
      children = (<div>{content}</div>)
    }
    return (
      <div>
        {children}
      </div>
    );
  }
});

export {UserAvatarBox as default};