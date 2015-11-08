var React = require('react');

import JobTicketRow  from './JobTicketRow' ;

var JobTicketList = React.createClass({
  getDefaultProps: function() {
    return {
      data: [
        {
          grapherAvatar: 'imgs/default/chenmingqiao-small.jpg',
          grapherName: '陈明乔',
          userName: '马晓驰',
          userAvatar: 'imgs/default/maxiaochi-small.jpg',
          userPhone: '13113658516',
          userBookDate: '2015/10/19',
          suggestPrice: 3000
        },{
          grapherAvatar: 'imgs/default/yinchao-small.jpg',
          grapherName: '尹超',
          userName: '张扬',
          userAvatar: 'imgs/default/maxiaochi-small.jpg',
          userPhone: '13113658516',
          userBookDate: '2015/9/19',
          suggestPrice: '面议'
        }
      ]
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
