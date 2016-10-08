import React from 'react'
import {imgModifier} from '../Tools'
import _ from 'underscore'

const WorkPieceList = ({workPieces, photographerId}) => {
  const workNodes = _.map(workPieces, (photo, i) => {
    let margin = {}
    if(photographerId == 7300) {
      margin = {marginBottom: -7}
    }
    return (
      <section key={i} style={{lineHeight: 0}, margin} className="workPieceRow">
        <img
          style={{width:'100%'}}
          src={imgModifier(photo.Url, "work")}
        />
      </section>
    )
  })

  return (
    <div className="workPieceList">
      {photographerId == 7300 ? ''
        :
        <hr className="moreWork"/>
      }
      {photographerId == 7300 ? ''
        :
        <span className="des">客片展示</span>
      }
      {workNodes}
    </div>
  )
}

export {WorkPieceList as default}
