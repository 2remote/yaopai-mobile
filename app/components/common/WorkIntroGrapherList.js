import React from 'react';
import WorkIntroGrapherRow from './WorkIntroGrapherRow';

const WorkIntroGrapherList = ({data}) => {
  console.log(data)
  return (<div className="workIntroGrapherList">
    {
      data.map((work, i) =>
        <WorkIntroGrapherRow
          key={i}
          data={work}
        />
      )
    }
  </div>
)};

export default WorkIntroGrapherList;