var React = require('react');

var GrapherRow = require('./GrapherRow');

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

module.exports = GrapherList;
