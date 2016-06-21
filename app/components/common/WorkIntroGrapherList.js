import React from 'react';
import WorkIntroGrapherRow from './WorkIntroGrapherRow';

const WorkIntroGrapherList = ({data}) => (
   <div className="workIntroGrapherList">
    {
      data.map((work, i) =>
        <WorkIntroGrapherRow
          key={i}
          data={work}
        />
      )
    }
  </div>
)

export default WorkIntroGrapherList;
