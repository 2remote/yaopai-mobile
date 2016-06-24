import React from 'react'
import WorkIntroGrapherRow from './WorkIntroGrapherRow'
import NothingFound from './NothingFound.js'

const WorkIntroGrapherList = ({ data, searchKey = "", selectedTags = [] }) => {
  if (data.length > 0) {
    return (
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
  } else if ( searchKey || selectedTags[0] ) {
    return <NothingFound title="没有找到想拍的类型？"/>
  } else {
    return (
      <div />
    )
  }
}

export default WorkIntroGrapherList
