import React from 'react';


var WorkTitle = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
        title: "标题",
        subTitle: "副标题",
        cover:"http://7xrgj6.com1.z0.glb.clouddn.com/10/da81e0de-2be8-4eda-b553-99a5aabae25e.jpg?imageMogr2/auto-orient/thumbnail/600x/interlace/1",
        price:"12",
      }
    };
  },
  render: function() {
    return (
        <div className="workTitlePanel">
          <div className="cover" style={{backgroundImage:`url(${this.props.data.Cover})`,backgroundSize:'cover'}}/>
          <p className="title-a">
            <span className="title">{this.props.data.Title}</span>
            <span className="price">￥{this.props.data.Price}</span>
          </p>
          <p className="sub-title">{ this.props.data.Description}</p>
        </div>

      //<!-- <div
      //  style={{padding:'50px 0 0 11px',marginBottom:-5,width:265}}
      //  className="workTitle">
      //  <div
      //    style={{fontSize: '2.334em',fontWeight:'bold',color: '#050505',marginLeft:19}}
      //    ref="workHeader">{this.props.data.header}</div>
      //  <img
      //    ref="workSplitLine"
      //    src="imgs/workDetailPage/work-split-line.png"
      //    srcSet="imgs/workDetailPage/work-split-line@2X.png 2x" />
      //  <div
      //    style={{fontSize: '1.334em',fontWeight:'lighter',color: '#050505',marginLeft:19}}
      //    ref="workSubHeader">{this.props.data.subHeader}</div>
      //</div>
      //-->
    );
  }
});

export {WorkTitle as default};