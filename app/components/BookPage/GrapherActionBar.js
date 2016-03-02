import React from 'react';
import CallGrapherBox from'./CallGrapherBox';
import AddWeChat from './AddWeChat' ;

var ActionBar = React.createClass({
  getDefaultProps: function() {
    return {
      data:{}
    };
  },
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
        <CallGrapherBox data={this.props.data} />
      </div>
    );
  }
});

export {ActionBar as default};
