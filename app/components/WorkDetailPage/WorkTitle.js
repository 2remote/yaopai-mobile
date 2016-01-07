var React = require('react');

var WorkTitle = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
        header: "可以拍摄的水果",
        subHeader: "普通的水果也可以呈现出别样的一面 :)"
      }
    };
  },
  render: function() {
    return (
      <div 
        style={{padding:'50px 0 0 11px',marginBottom:-5,width:265}}
        className="workTitle">
        <div
          style={{fontSize: '2.334em',fontWeight:'bold',color: '#050505',marginLeft:19}}
          ref="workHeader">{this.props.data.header}</div>
        <img
          ref="workSplitLine"
          src="imgs/workDetailPage/work-split-line.png"
          srcSet="imgs/workDetailPage/work-split-line@2X.png 2x" />
        <div
          style={{fontSize: '1.334em',fontWeight:'lighter',color: '#050505',marginLeft:19}}
          ref="workSubHeader">{this.props.data.subHeader}</div>
      </div>
    );
  }
});

module.exports = WorkTitle;
