'use strict';

var React = require ('react');
var Header = require('./Header/Header');
var Footer = require('./Footer/Footer');
var MainContent = require('./Content/MainContent');

var Main = React.createClass({
  render(){
    return (
      <div className="container">
        <Header /> 
        <MainContent />
        <Footer />
      </div>
    );
  }
});

module.exports = Main;