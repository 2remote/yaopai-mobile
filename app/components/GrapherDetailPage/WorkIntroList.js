import React from 'react';

import WorkIntroRow from './WorkIntroRow';

var WorkIntroList = React.createClass({
  getDefaultProps: function() {
    return {
      data: []
    };
  },
  render: function() {
    var workIntroNodes = this.props.data.map(function(work,i){
      return (<WorkIntroRow data={work} key={i}/>);
    });
    return (
      <div className="workIntroList">
        {workIntroNodes}
      </div>
    );
  }
});

export {WorkIntroList as default};
