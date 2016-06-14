import React from 'react';
import GrapherRow from './GrapherRow';

const GrapherList = ({data}) => (
  <div className="grapherList">
    {
      data.map((work, i) =>
        <GrapherRow
          key={i}
          data={work}
        />
      )
    }
  </div>
);

export {GrapherList as default};
