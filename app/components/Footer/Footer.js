var React = require("react");

var NavBar = React.createClass({
  render: function(){
    return(
        <nav className="navbar navbar-default navbar-fixed-bottom" >
          <div className="navbar-brand">
            YAOPAI
          </div>
          <div className="navbar-text navbar-right">
            公司联系方式及备案信息
          </div>
        </nav>
    );
  }
});

module.exports = NavBar;