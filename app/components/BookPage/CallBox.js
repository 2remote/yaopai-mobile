var React = require('react');

var CallBox = React.createClass({
  render: function() {
    return (
      <div 
        style={{color:'#3c3c3c'}}
        className="callBox">
        <img 
          style={{width:55}}
          ref="callImage"
          src="imgs/common/call-logo.png"
          srcSet="imgs/common/call-logo@2X.png 2x" />
        <div ref="callText" >致电咨询</div>
      </div>
    );
  }
});

module.exports = CallBox;
