import React from 'react';

import WorkIntroGrapherRow from './WorkIntroGrapherRow';

var WorkIntroGrapherList = React.createClass({
  render() {
    return (
      <div className="workIntroGrapherList" style={{marginTop:49}}>
        {
          this.props.data.map((work, i) =>
            <WorkIntroGrapherRow
              key={i}
              data={work}
            />
          )
        }
      </div>
    );
  }
});

export {WorkIntroGrapherList as default};
