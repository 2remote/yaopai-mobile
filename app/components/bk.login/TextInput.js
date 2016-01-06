let React = require('react');

let TextInput = React.createClass({
  handleChange: function(e){
    this.props.onUserInput(e.target.value);
  },

  handleBlur: function(e){
    this.props.onUserBlur();
  },

  render: function() {
    return (
      <input
        type="text"
        className="textInput"
        placeholder="手机号"
        value={this.props.phoneNumber}
        onChange={this.handleChange}
        onBlur={this.handleBlur} />
    );
  }
});

module.exports = TextInput;
