var React = require('react');

var WorkIntroRow = require('./WorkIntroRow');

var WorkIntroList = React.createClass({
  getDefaultProps: function() {
    return {
      data: []
    };
  },
  render: function() {
    var workIntroNodes = this.props.data.map(function(work){
      return (<WorkIntroRow data={work} />);
    });
    return (
      <div className="workIntroList">
        {workIntroNodes}
      </div>
    );
  }
});

module.exports = WorkIntroList;
