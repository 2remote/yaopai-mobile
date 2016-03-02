import React from 'react';

import BookTicketRow from './BookTicketRow';

var BookTicketList = React.createClass({
  getDefaultProps: function() {
    return {
      data: []
    };
  },

  render: function() {
    var bookTicketNodes = this.props.data.map(function(order,i){
      return (<BookTicketRow key={i} data={order} />);
    });
    return (
      <div className="bookTicketList">
        {bookTicketNodes}
      </div>
    );
  }
});

module.exports = BookTicketList;
