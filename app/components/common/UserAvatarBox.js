import React from 'react';
import {Link} from 'react-router';
import AvatarUploader from '../UserCenterPage/AvatarUploader.js';
import {parseImageUrl} from '../Tools';

let UserAvatarBox = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
        userName: '未命名',
        editAvatar: false
      }
    };
  },

  render: function() {
    let style = {
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

    const avatar = this.props.data.avatar ? parseImageUrl(this.props.data.avatar,78,78) : null

    let goCenterPath = '';
    if (this.props.data.userType === 0) { // 如果登录的是普通用户
      goCenterPath = "/center/u";
    } else if (this.props.data.userType === 1) { // 如果登录的用户是摄影师
      goCenterPath = "/center/g";
    }

    return (
      <div>
        <div style={this.props.background?style.background:{}}>
          {
            this.props.editAvatar ?
            <div>
              <AvatarUploader
                style={style.avatar}
                defaultImage={avatar || 'imgs/sidePage/default-avatar.png'}
              />
            </div>
            :
            <div>
              <img
                style={style.avatar}
                ref="userAvatar"
                src={avatar || 'imgs/sidePage/default-avatar.png'}
                srcSet={avatar || 'imgs/sidePage/default-avatar@2X.png 2x'} />
            </div>
          }

          <div style={style.nick} ref="userNick" >
            {this.props.editAvatar ? "点击头像上传" : this.props.data.userName}
          </div>

          <Link
            to={this.props.editAvatar ? goCenterPath : "/center/user_edit_profile"}
            style={style.updateInfo}
          >
            {this.props.editAvatar ? "个人中心>" : "修改资料>"}
          </Link>
        </div>
      </div>
    );
  }
});

export {UserAvatarBox as default};
