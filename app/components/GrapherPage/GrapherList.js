import React from 'react';

import GrapherRow from './GrapherRow';
import DocumentTitle from 'react-document-title';
import ShowMenu from '../WorkPage/ShowMenu';
import { LIST_ALL_WORKS, TITLE } from '../Tools';
import PhotographerActions from '../../actions/PhotographerActions';


var YaopaiLogo = React.createClass({
  render: function () {
    var style = {
      fontSize:20,
      backgroundColor:'white',
      color:'black',
      lineHeight:'57px',
      display:'block',
      textAlign: 'center',
      position: 'fixed',
      width:'100%',
      zIndex: '97',
      top:0,
      left:0
    };

    return (
      <div className="icon yaopainew" style={style} />
    );
  }
});

var GrapherList = React.createClass({
  getDefaultProps: function() {
    return {
      data: []
    };
  },

  render: function() {
    var grapherNodes = this.props.data.map(function(grapher, i){
      if (grapher.User !== null){
        return (
          <GrapherRow
            data={grapher}
            key={i} />
        );
      }else{
        console.warn('User ' + grapher.Id + " don't have an User info!");
      }

    });

    return (
      <div className="grapherList">
        {grapherNodes}
      </div>
    );
  }
});

export {GrapherList as default};
