var React = require('react');

var CallGrapherBox = React.createClass({
  getDefaultProps: function() {
    return {
      data: {}
    };
  },
  render: function() {
    return (
      <a
        style={{lineHeight:'inherit'}} 
        href={"tel:" + this.props.data}>
        <div 
          style={{color:'#3c3c3c'}}
          className="callGrapherBox">
          <img 
            style={{width:55}}
            ref="callImage"
            src="imgs/common/call-logo.png"
            srcSet="imgs/common/call-logo@2X.png 2x" />
          <div ref="callText" >致电摄影师</div>
        </div>
      </a>
    );
  }
});

module.exports = CallGrapherBox;
