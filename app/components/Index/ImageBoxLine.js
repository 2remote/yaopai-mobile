var React = require('react');
import { Router, Route, Link } from 'react-router';
require('./ImageBoxGrid.css');
import {imgModifier} from '../Tools'

var ImageBoxGrid = React.createClass({
  getDefaultProps: function() {
    var deviceWidth = parseInt(window.innerWidth);
    return {
      deviceWidth: deviceWidth,
      workCover:  [{
        src: "imgs/indexPage/view-picture-image.jpg", 
        srcset: "imgs/indexPage/view-picture-image@2X.jpg 2x", 
        url: "/work"}],
      works: []
    };
  },
  render: function() {
    var deviceWidth = this.props.deviceWidth;
    var style = {
      width: deviceWidth/3,
      height: deviceWidth/3
    };
    var coverStyle = {
      width: deviceWidth/3,
      height: deviceWidth/3-0.9
    };
    
    var workCover = this.props.workCover.map(function(img){
      return (
        <li style={coverStyle} className="imageCell">
          <Link style={coverStyle} to={img.url} >
            <img style={{width: deviceWidth/3,height: deviceWidth/3}} 
              src={img.src} 
              srcSet={img.srcSet} />
          </Link>
        </li>
      );
    });

    var imgNodes = this.props.works.map(function(work, i){
      return (
        <li style={style} className="imageCell">
          <Link to={"/workDetail/"+work.Id} style={{display:'block'}} >
            <img style={style} src={imgModifier(work.Cover)} />
          </Link>
        </li>
      );  
    });

    var firstPic = imgNodes.shift();
    imgNodes.unshift(workCover);
    imgNodes.unshift(firstPic);

    return (
      <ul className="imageBoxGrid">
        {imgNodes}
      </ul>
    );
  }
});

module.exports = ImageBoxGrid;