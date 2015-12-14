var React = require('react');
import { Router, Route,Link } from 'react-router';
require('./ImageBoxGrid.css');
import {imgModifier} from '../Tools'

var ImageBoxGrid = React.createClass({
  getDefaultProps: function() {
    var deviceWidth = parseInt(window.innerWidth);
    return {
      deviceWidth: deviceWidth,
      workCover:  [{
        src: "imgs/indexPage/interview-image.jpg", 
        srcset: "imgs/indexPage/interview-image@2X.jpg 2x", 
        url: "/interview"}],
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
          <Link to={img.url} style={coverStyle} >
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
          <a href={work.Link} style={{display:'block'}} >
            <img style={style} src={imgModifier(work.Cover)} />
          </a>
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