import React from 'react'

const CharacterSelect = ({data, character}) => {
  let tagNum = data.length
  let tagNode = data.map((tag, index) =>
          <a
            key={index}
            href="javascript:void(0)"
            style={{
              background: `url(${tag.Cover}) center center no-repeat`,
              backgroundSize: 'cover',
            }}
          >
            <span className="mask">{tag.Name}</span>
          </a>
        )
  return (
    <section className="tag-list">
      <div className="swipe">
        <div className="swipe-wrap" style={{width: `${tagNum * 160}px`}}>
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
