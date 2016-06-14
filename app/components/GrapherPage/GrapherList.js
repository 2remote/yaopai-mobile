import React from 'react';
import GrapherRow from './GrapherRow';
import _ from 'underscore';

const GrapherList = ({data}) => {
  // 把个人作品数（data.TotalAlbums）为 0 的摄影师剔除掉
  const dataSift = (_.partition(data, (data) => data.TotalAlbums == 0))[1]
  return (
    <div className="grapherList">
      {
        dataSift.map((work, i) =>
          <GrapherRow
            key={i}
            data={work}
          />
        )
      }
    </div>
  )
};

export {GrapherList as default};
