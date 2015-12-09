var React = require('react');

var BookIntro = React.createClass({
  render: function() {
    return (
      <div 
        style={{
          paddingTop: 15,
          backgroundImage: 'url(imgs/bookIntroBg.png)',
          height: 140,
          width: '87.2%',
          margin: '0 auto 18px'
        }}
        className="bookIntro">
        <span ref="currentTitle" >当前订单</span>
        <div 
          style={{margin: '-25px 0 19px'}}
          className="splitLine" >
          src="imgs/common/spliter-line.png"
          srcSet="imgs/common/spliter-line@2X.png 2x" />
        </div>
        <img 
          style={{width:52}}
          ref="grapherAvatar"
          src="" />
        <div ref="grapherName"></div>
      </div>
    );
  }
});

module.exports = BookIntro;