var React = require('react');
import {Link} from 'react-router';
var AvatarUploader = require('./UserCenterPage/AvatarUploader.js');

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
        width: 78,
        height: 78,
        margin: '42px 0 14px'
      },
      nick: {
        color: '#232323'
      },
      background: {
        height: 208,
        textAlign: 'center',
        backgroundImage: 'url(imgs/bookPageBg.png)'
      },
      updateInfo: {
        position: 'absolute',
        top: 80,
        right: 10
      }
    };

    var AvatarImage = (
      <div>
        <img
          style={style.avatar}
          ref="userAvatar"
          src={this.props.data.avatar || 'imgs/sidePage/default-avatar.png'}
          srcSet={this.props.data.avatar || 'imgs/sidePage/default-avatar@2X.png 2x'} />
      </div>
    );

    var AvatarUploaderImage = (
      <div>
        <AvatarUploader
          style={style.avatar}
          defaultImage={this.props.data.avatar || 'imgs/sidePage/default-avatar.png'} />
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
          {this.props.editAvatar ? "点击上传本人头像" : this.props.data.userName}
        </div>
        <div className="updateInfo" style={style.updateInfo}>{this.props.editAvatar ? "" : "更新资料>"}</div>
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

module.exports = UserAvatarBox;
