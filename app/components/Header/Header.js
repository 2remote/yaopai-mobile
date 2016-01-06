var React = require('react');
var Acount = require('../User/Acount');
var LoginButton = React.createClass({
  render : function(){
    return (
      <button className="btn btn-default navbar-btn" >登录</button>
    );
  }
});

var RegisterButton = React.createClass({
  render : function(){
    return (

      <button className="btn btn-default navbar-btn" >注册</button>
    );
  }
});

var NavBar = React.createClass({
  render: function(){
    return(
        <nav className="navbar navbar-inverse navbar-fixed-top" >
          <div className="navbar-brand">
            YAOPAI
          </div>
          <div className="navbar-form navbar-right">
            <LoginButton />
            <RegisterButton />
            <Acount />
          </div>
        </nav>
    );
  }
});

module.exports = NavBar;
