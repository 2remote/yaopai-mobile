import React from 'react';

import WechatLogin from './WechatLogin';
import WeiboLogin from './WeiboLogin';

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

export {ActionBar as default};