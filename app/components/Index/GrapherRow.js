var React = require('react');

import { Router, Route, Link } from 'react-router';

var deviceWidth = parseInt(window.innerWidth);

var GrapherRow = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
        img: "imgs/default/grapher-default.png",

      }
    };
  },
  render: function() {
    var grapherPageIntro = {
      height: deviceWidth/2
    };
    var nickStyle = {
      marginTop: -4*deviceWidth/375,
      marginBottom: 5*deviceWidth/375
    };
    var grapherSpliterLineStyle ={
      top: -5*deviceWidth/375
    };
    return (
      <div className="grapherRow">
        <Link to={"/grapherDetail/?id="+this.props.data.id} >
        <div className="grapherAvatar">
          <img 
            ref="avatar"
            src={this.props.data.img} />
        </div>
        <div className="grapherPageIntro" style={grapherPageIntro}>
          <div className="grapherIntroContainer">
            <div 
              ref="name">{this.props.data.name}</div>
            <div 
              style={nickStyle}
              ref="nick">{this.props.data.nick}</div>
           <img 
              style={{marginRight:6}}
              ref="locationIcon"
              src="imgs/indexPage/location-image.png"
              srcSet="imgs/indexPage/location-image@2X.png 2x" />
            <span
              ref="location">{this.props.data.location}</span>     
            <img 
              ref="grapherSpliterLine"
              style={grapherSpliterLineStyle}
              src="imgs/indexPage/grapher-spliter-line.png"
              srcSet="imgs/indexPage/grapher-spliter-line@2X.png 2x" />
            <button 
              ref="book">预约</button>
          </div>
        </div>
        </Link>
      </div>
    );
  }
});

module.exports = GrapherRow;