var React = require('react');

var AddWeChat = React.createClass({
  render: function() {
    return (
      <div 
        style={{float:'left',width:'50%',color:'#3c3c3c'}}
        className="addWeChat">
        <img 
          style={{width:55}}
          ref="weChatImage"
          src="imgs/common/wechat-logo.png"
          srcSet="imgs/common/wechat-logo@2X.png 2x" />
        <div ref="weChatText" >添加微信</div>
      </div>
    );
  }
});

module.exports = AddWeChat;
