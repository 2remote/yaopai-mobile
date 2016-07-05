import React from 'react'
import {imgModifier} from '../Tools'
import _ from 'underscore'

const WorkPieceList = ({workPieces}) => {
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
      <hr className="moreWork"/>
      <span className="des">客片展示</span>
      {workNodes}
    </div>
  )
}

export {WorkPieceList as default}
