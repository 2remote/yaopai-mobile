import React from 'react';

var CallBox = React.createClass({
  render: function() {
    return (
      <div 
        style={{color:'#3c3c3c'}}
        className="callBox">
        <span 
          ref="callImage"
          className="icon phone_icon"
          style={{fontSize:55}} />
        <div ref="callText" >致电咨询</div>
      </div>
    );
  }
});

export {CallBox as default};
