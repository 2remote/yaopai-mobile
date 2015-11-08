var React = require('react');

var WeiboLogin = React.createClass({
  render: function() {
    return (
      <div className="weiboLogin">
        <img ref="weiboLogo"
          src="imgs/loginPage/weibo-logo.png"
          srcSet="imgs/loginPage/weibo-logo@2X.png 2x" />
        <span ref="weiboText">微博账号登录</span>
      </div>
    );
  }
});

module.exports = WeiboLogin;
