import React from 'react'
import {Link} from 'react-router'

const WorkDetailLayout= ({data}) => {
  return (
    <section className="another-workdetail">
      <div className="cover" style={{backgroundImage:`url(${data.cover})`,backgroundSize:'cover'}}/>
      <div className="info">
        <p className="title">{data.title}</p>
        <p className="description">{data.description}</p>
        {/* 化妆师标签 */
          data.tags.length ?
            (
              <ul className="tags">
                {data.tags.slice(0, 5).map((tag, index) => <li key={index}>{tag.Name}</li>)}
              </ul>
            )
          : null
        }
      </div>

      <div>
        <hr className="more-work" />
        <span className="des">化妆师信息</span>
      </div>

      <div className="user-panel">
        <Link to={`/makeupArtistProfile/${data.makeupArtist.id}`}>
          <div className="avatar" style={
            {backgroundImage:`url(${data.makeupArtist.avatar})`,
            backgroundSize:'cover',
            height:'80px',
            width:'80px',
            borderRadius:'50%'}
          }>
          </div>
        </Link>
        <p className="uName">{data.makeupArtist.nickName}</p>
        <p className="uDes">{data.makeupArtist.signature}</p>
      </div>

       <div>
         <hr className="more-work" />
         <span className="des">客片展示</span>
       </div>

      { /* 客片展示 */ }
      <article>
        {
          data.photos.map((photo, index) => <img src={photo.Url} key={index} />)
        }
      </article>

      <footer className="share-bar">
        <strong className="fl">喜欢我就分享吧~</strong>

        <div className="fr">
          <span><i className="icon mark" /> 收藏</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span><i className="icon share_icon" /> 分享</span>
        </div>
      </footer>
    </section>
  )
}

export default WorkDetailLayout
