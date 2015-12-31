var React = require('react');

var AddWeChat = React.createClass({
  render: function() {
    return (
      <div 
        style={{float:'left',width:'50%',color:'#3c3c3c'}}
        className="addWeChat">
        <span 
          ref="weChatImage"
          className="icon wechat_logo"
          style={{fontSize:55}} />
        <div ref="weChatText" >添加微信</div>
      </div>
    );
  }
});

module.exports = AddWeChat;
