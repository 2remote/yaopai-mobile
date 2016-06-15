import React from 'react';
import GrapherRow from './GrapherRow';
<<<<<<< HEAD

var GrapherList = React.createClass({
  getDefaultProps: function() {
    return {
      data: []
    };
  },
  render: function() {
    var grapherNodes = this.props.data.map(function(grapher, i){
      if (grapher.User !== null){
        return (
          <GrapherRow 
            data={grapher}
            key={i} />
        );  
      }else{
        console.warn('User ' + grapher.Id + " don't have an User info!");
      }
      
    });

    return (
      <div className="grapherList">
        {grapherNodes}
      </div>
    );
  }
});
=======
import _ from 'underscore';

const GrapherList = ({data}) => {
  // 接口 Photographer.Search （查询摄影师列表）拿到的 data
  // 把个人作品数（data.TotalAlbums）为 0 的摄影师剔除掉
  const dataFilter = _.filter(data, data => data.TotalAlbums !== 0)
  return (
    <div className="grapherList">
      {
        dataFilter.map((work, i) =>
          <GrapherRow
            key={i}
            data={work}
          />
        )
      }
    </div>
  )
};
>>>>>>> dev

export {GrapherList as default};