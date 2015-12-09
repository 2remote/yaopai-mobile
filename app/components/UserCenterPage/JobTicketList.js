var React = require('react');

import JobTicketRow  from './JobTicketRow' ;

var JobTicketList = React.createClass({
  getDefaultProps: function() {
    return {
      data: []
    };
  },

  render: function() {
    var jobTicketNodes = this.props.data.map(function(jobTicket){
      return (<JobTicketRow data={jobTicket} />);
    });
    return (
      <div className="jobTicketList">
        {jobTicketNodes}
      </div>
    );
  }
});

module.exports = JobTicketList;
