import React from 'react'
import WorkIntroGrapherRow from './WorkIntroGrapherRow'
import NothingFound from './NothingFound.js'

const WorkIntroGrapherList = ({data}) => {
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
  } else {
    return <NothingFound title="没有找到想拍的类型？"/>
  }
}

export default WorkIntroGrapherList
