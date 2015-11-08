var React = require('react');
import { Router, Route, Link } from 'react-router';
require('./ImageVerticalGrid.css');

var ImageVerticalGrid = React.createClass({
  // getDefaultProps: function() {
  //   return {
  //     works: [
  //       {src: "imgs/vertical1.png", url: "http://www.baidu.com", w: 170},
  //       {src: "imgs/vertical2.png", url: "http://www.baidu.com", w: 170}, 
  //       {src: "imgs/vertical3.png", url: "http://www.baidu.com", w: 170},
  //       {src: "imgs/vertical4.png", url: "/grapher", w: 240}
  //     ]
  //   };
  // },
  render: function() {
    console.log(this.props.works)
    var imgNodes = '';
    if(this.props.works.length > 0){
      imgNodes = this.props.works.map(function(grapher,i){
        return (
          <div style={{lineHeight:0}}>
            <Link to={"/grapherDetail/"+grapher.User.Id} style={{display:'block'}} >
              <img height="209" src={grapher.HomeCover} />
            </Link>
          </div>
        );
      });
    }
    return (
      <div
        style={{lineHeight:0}}
        className="imageVerticalGrid">
        {imgNodes}
        <div style={{lineHeight:0}}>
          <Link to="/grapher">
            <img height="209" 
              src="imgs/indexPage/find-master-image.jpg"
              srcSet="imgs/indexPage/find-master-image@2X.jpg 2x" />
          </Link>
        </div>
      </div>
    );
  }
});

module.exports = ImageVerticalGrid;