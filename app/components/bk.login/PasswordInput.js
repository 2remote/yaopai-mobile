var React = require('react');

var PasswordInput = React.createClass({
  handleChange: function(e){
    this.props.onPassInput(e.target.value);
  },

  handleBlur: function(){
    this.props.onUserBlur();
  },

  render: function(){
    return (
      <input
        className="passwordInput"
        type="password"
        placeholder="密码"
        value={this.props.password}
        onChange={this.handleChange}
        onBlur={this.handleBlur} />
    )
  }
});

module.exports = PasswordInput;
