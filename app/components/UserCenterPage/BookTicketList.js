var React = require('react');

import BookTicketRow from './BookTicketRow';

var BookTicketList = React.createClass({
  getDefaultProps: function() {
    return {
      data: [
        {
          grapherAvatar: 'imgs/default/chenmingqiao-small.jpg',
          grapherName: '陈明乔',
          userName: '马晓驰',
          userPhone: '13113658516',
          userBookDate: '2015/10/19',
          suggestPrice: 3000
        },{
          workAvatar: 'imgs/default/yinchao-small.jpg',
          workName: '作品',
          userName: '张扬',
          userPhone: '13113658516',
          userBookDate: '2015/9/19',
          suggestPrice: '面议'
        }
      ]
    };
  },

  render: function() {
    var bookTicketNodes = this.props.data.map(function(order){
      return (<BookTicketRow data={order} />);
    });
    return (
      <div className="bookTicketList">
        {bookTicketNodes}
      </div>
    );
  }
});

module.exports = BookTicketList;
