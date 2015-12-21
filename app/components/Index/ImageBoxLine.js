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

    var filter = this.props.filter;

    var initNodes = [];
    for (var i = 0; i < this.props.number; i++) {
      // 每次load
      style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
      initNodes.push((<li style={style} className="imageCell"></li>));
    };
    
    var imgNodes = this.props.works.map(function(work, i){
      if(filter == work.Position ){
        initNodes[i] = (
          <li style={style} className="imageCell">
            <a href={work.Url} style={{display:'block'}} >
              <img style={style} src={imgModifier(work.Image)} />
            </a>
          </li>
        );  
      }
    });

    return (
      <ul className="imageBoxGrid">
        {initNodes}
      </ul>
    );
  }
});

module.exports = ImageBoxGrid;