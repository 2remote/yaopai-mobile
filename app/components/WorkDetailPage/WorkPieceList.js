import React from 'react'
import {imgModifier} from '../Tools'
import _ from 'underscore'

const WorkPieceList = ({workPieces}) => {
  let activityAlbumsId;
  _.map(workPieces, (photo, i) => {
    if (i == 0) {
      activityAlbumsId = photo.AlbumsId
    }
  })

  const workNodes = _.map(workPieces, (photo, i) =>
    <section key={i} style={{lineHeight: 0}} className="workPieceRow">
      <img
        style={{width:'100%'}}
        src={imgModifier(photo.Url, "work")}
      />
    </section>
  )

  return (
    <div className="workPieceList">
      {activityAlbumsId == 5272 ? ''
        :
        <hr className="moreWork"/>
      }
      {activityAlbumsId == 5272 ? ''
        :
        <span className="des">客片展示</span>
      }
      {workNodes}
    </div>
  )
}

export {WorkPieceList as default}
