var React = require('react');
import { Router, Route, Link } from 'react-router';
require('./ImageBoxGrid.css');
import {imgModifier} from '../Tools'

var ImageBoxGrid = React.createClass({
  getDefaultProps: function() {
    var deviceWidth = parseInt(window.innerWidth);
    return {
      deviceWidth: deviceWidth,
      works: []
    };
  },
  render: function() {
    var deviceWidth = this.props.deviceWidth;
    var style = {
      width: deviceWidth/3,
      height: deviceWidth/3
    };

    var imgNodes = this.props.works.map(function(work, i){
      return (
        <li style={style} className="imageCell">
          <a href={work.Link} style={{display:'block'}} >
            <img style={style} src={imgModifier(work.Cover)} />
          </a>
        </li>
      );  
    });

    return (
      <ul className="imageBoxGrid">
        {imgNodes}
      </ul>
    );
  }
});

module.exports = ImageBoxGrid;