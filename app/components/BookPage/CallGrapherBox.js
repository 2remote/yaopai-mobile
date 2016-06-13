import React from 'react';

var CallGrapherBox = React.createClass({
  getDefaultProps() {
    return {
      data: {}
    };
  },
  render() {
    return (
      <a
        style={{lineHeight:'inherit'}}
        href={"tel:" + this.props.data}
      >
        <div style={{color:'#3c3c3c'}}>
          <span
            ref="callImage"
            className="icon phone_circle_icon"
            style={{fontSize: 55}}
          />
          <div ref="callText" >致电摄影师</div>
        </div>
      </a>
    );
  }
});

export {CallGrapherBox as default};
