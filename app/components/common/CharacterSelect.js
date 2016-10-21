import React from 'react'

const CharacterSelect = ({data, character}) => {
  let num = (data.length % 4 === 0) ? data.length + 1 : data.length
  let tagNum = Math.ceil(num/4)
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
    <section className="tag-list">
      <div className="swipe">
        <div className="swipe-wrap" style={{width: `${tagNum}00%`}}>
          {tagNode}
        </div>
      </div>
      <div className="authentication">
        {character}
        <span className="btn"><i className="icon renzheng"/> 我要认证 <i className="icon youjiantou" /></span>
      </div>
    </section>
  )
}

export default CharacterSelect
