let React = require('react');
let classnames = require('classnames');

let HintBox = React.createClass({
  getDefaultProps: function() {
    return {
      message: ''
    }
  },

  render: function() {
    return (
      <div className = {classnames({
        hintBox: true,
        show: (this.props.message.length > 0)
      })} >
        {this.props.message}
      </div>
    );
  }
});

module.exports = HintBox;
