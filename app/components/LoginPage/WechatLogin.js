var React = require('react');

var UserActions = require('../../actions/UserActions');
var WechatLogin = React.createClass({
  _weChatLogin : function(){
    UserActions.openLogin();
  },
  render: function() {
    return (
      <div onClick={this._weChatLogin} className="wechatLogin">
        <img
          ref="wechatLogo"
          src="imgs/common/wechat-logo.png"
          srcSet="imgs/common/wechat-logo@2X.png 2x" />
        <div ref="wechatText">微信帐号登录</div>
      </div>
    );
  }
});

module.exports = WechatLogin;
