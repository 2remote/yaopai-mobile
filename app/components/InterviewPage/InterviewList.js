import React from 'react';

var InterviewRow = require('./InterviewRow');

var InterviewList = React.createClass({
  getDefaultProps: function() {
    return {
      data: []
    };
  },

  render: function() {
    var workNodes = this.props.data.map(function(work, i){
      if(work.User !== null){
        return(
          <InterviewRow 
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

module.exports = InterviewList;