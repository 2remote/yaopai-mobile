var React = require('react');

var WeiboLogin = React.createClass({
  render: function() {
    return (
      <div className="weiboLogin">
        <span
          className="icon weibo_icon"
          style={{fontSize:55}}
          ref="weiboLogo" />
        <span ref="weiboText">微博账号登录</span>
      </div>
    );
  }
});

module.exports = WeiboLogin;
