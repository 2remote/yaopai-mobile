import React from 'react';

import WechatLogin from './WechatLogin';

var ActionBar = React.createClass({
  render() {
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
