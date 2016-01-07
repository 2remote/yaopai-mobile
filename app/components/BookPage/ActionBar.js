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
      console.info('If you see this, plz just delete the console.info in components/BookPage/ActionBar.js. If nobody see this, plz delete the whole file');
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
