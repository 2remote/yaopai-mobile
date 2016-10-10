import React from 'react'

const CharacterSelect = ({data}) => {
  let tagNum = Math.ceil(data.length/4)
  let tagNode = data.map((tag, index) =>
          <a
            key={index}
            href="javascript:void(0)"
            style={{
              background: `url(${tag.Cover}) center center no-repeat`,
              backgroundSize: 'cover',
              width: `${36/tagNum}%`,
              marginLeft: `${2/tagNum}%`,
            }}
          >
            <span className="mask">{tag.Name}</span>
          </a>
        )
  return (
    <div className="swipe">
      <div className="swipe-wrap" style={{width: `${tagNum}00%`}}>
        {tagNode}
      </div>
    </div>
  )
}

export default CharacterSelect
