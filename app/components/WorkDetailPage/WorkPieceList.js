var React = require('react');

var WorkPieceRow = require('./WorkPieceRow');

var WorkPieceList = React.createClass({
  getDefaultProps: function() {
    return {
      workPieces: []
    };
  },
  render: function() {
    var workNodes = this.props.workPieces.map(function(img, i){
      return (<WorkPieceRow data={img} key={i} />);
    });

    return (
      <div className="workPieceList">
        <div 
          style={{fontSize: '4em',fontWeight: 'lighter',color: '#a7a7a7',margin:'0 0 10px 28px'}}
          ref="pieceCount">{this.props.workPieces.length+"P"}</div>
        {workNodes}
      </div>
    );
  }
});

module.exports = WorkPieceList;
