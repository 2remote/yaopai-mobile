'use strict';

import React from 'react';
import Header from './Header/Header';
import MainContent from './Content/MainContent';

var Main = React.createClass({
  render(){
    return (
      <div className="container">
        <Header /> 
        <MainContent />
      </div>
    );
  }
});

export {Main as default};