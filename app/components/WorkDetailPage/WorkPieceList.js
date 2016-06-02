import React from 'react';

import WorkPieceRow from './WorkPieceRow';

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
        <hr className="moreWork"/>
        <span className="des">客片展示</span>
        {workNodes}
      </div>
    );
  }
});
export {WorkPieceList as default};
