import React from 'react';

import JobTicketRow  from './JobTicketRow' ;

var JobTicketList = React.createClass({
  getDefaultProps: function() {
    return {
      data: []
    };
  },

  render: function() {
    var jobTicketNodes = this.props.data.map(function(jobTicket,i){
      return (<JobTicketRow key={i} data={jobTicket} />);
    });
    return (
      <div className="jobTicketList">
        {jobTicketNodes}
      </div>
    );
  }
});

module.exports = JobTicketList;
