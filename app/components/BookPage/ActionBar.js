var React = require('react');

var CallBox = require('./CallBox');
import AddWeChat from './AddWeChat' ;

var ActionBar = React.createClass({
  render: function() {
    var style = {
      actionBar: {
        width: '81%',
        margin: '21px auto'
      }
    };
    return (
      <div 
        style={style.actionBar}
        className="actionBar">
        <CallBox />
        <AddWeChat />
      </div>
    );
  }
});

module.exports = ActionBar;
