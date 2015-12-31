var React = require('react');

var AddWeChat = React.createClass({
  render: function() {
    return (
      console.info('If you see this, plz just delete the console.info in components/BookPage/AddWeChat.js. If nobody see this, plz delete the whole file');
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
