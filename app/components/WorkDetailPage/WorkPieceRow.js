var React = require('react');

import {imgModifier} from '../Tools';

var WorkPieceRow = React.createClass({

  render: function() {

    const workImage = imgModifier(this.props.data.Url, "work");

    return (
      <div
        style={{lineHeight: 0}}
        className="workPieceRow">
        <img
          style={{width:'100%'}}
          ref="workImage"
          src={workImage} />
      </div>
    );
  }
});

module.exports = WorkPieceRow;
