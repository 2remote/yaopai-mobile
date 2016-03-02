import React from 'react';

var WechatLogin = require('./WechatLogin');
var WeiboLogin = require('./WeiboLogin');

var ActionBar = React.createClass({
  render: function() {
    return (
      <div 
        style={{margin: '15px 0'}}
        className="actionBar">
        <WechatLogin />
      </div>
    );
  }
});

module.exports = ActionBar;