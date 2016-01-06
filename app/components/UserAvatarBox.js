var React = require('react');

var UserAvatarBox = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
        userAvatar: 'imgs/default/maxiaochi-small.jpg',
        userName: 'MA XIAOCHI'

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
      }
    };

    return (
      <div
        style={this.props.background?style.background:{}}
        className="userAvatarBox">
        <img
          style={style.avatar}
          ref="userAvatar"
          src={this.props.data.avatar || 'imgs/sidePage/default-avatar.png'}
          srcSet={this.props.data.avatar || 'imgs/sidePage/default-avatar@2X.png 2x'} />
        <div style={style.nick} ref="userNick" >{this.props.data.userName}</div>
      </div>
    );
  }
});

module.exports = UserAvatarBox;
