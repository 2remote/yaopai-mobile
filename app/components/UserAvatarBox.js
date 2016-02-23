var React = require('react');
import {Link} from 'react-router';

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

    let linkTo = '/user_edit_profile';
    if (this.props.userType === 'grapher') {
      linkTo = '/grapher_center';
    }
    return (
      <div>
        <Link to={linkTo}>
          <div 
            style={this.props.background?style.background:{}}
            className="userAvatarBox">
            <img 
              style={style.avatar}
              ref="userAvatar"
              src={this.props.data.avatar || 'imgs/sidePage/default-avatar.png'}
              srcSet={this.props.data.avatar || 'imgs/sidePage/default-avatar@2X.png 2x'} />
            <div style={style.nick} ref="userNick" >{this.props.editAvatar ? "点击上传本人头像" : this.props.data.userName}</div>
            <div className="updateInfo" style={style.updateInfo}>{(this.props.editAvatar || this.props.userType === 'grapher' ) ? "" : "更新资料>"}</div>
          </div>
        </Link>
      </div>
    );
  }
});

module.exports = UserAvatarBox;
