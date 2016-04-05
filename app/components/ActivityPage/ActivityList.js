import React from 'react';
import ActivityRow from'./ActivityRow';

var ActivityList = React.createClass({
  getDefaultProps: function() {
    return {
      data: []
    };
  },

  render: function() {
    var workNodes = this.props.data.map(function(work, i){
      if(work.User !== null){
        return(
          <ActivityRow 
            key={i}
            data={work} />
        );  
      }else{
        console.warn('User data should not be null, checkout back-end database!');
      }
      
    });

    return (
      <div className="workIntroGrapherList">
        {workNodes}
      </div>
    );
  }
});

export {ActivityList as default};