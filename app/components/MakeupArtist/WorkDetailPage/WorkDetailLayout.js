import React from 'react'
import {Link} from 'react-router'
import SidePage from '../../UI/SidePage'
import Collection from '../Collection'

class WorkDetailLayout extends React.Component {
  render() {
    const {data, userInfo} = this.props
    let workInfo = data.makeupArtist || data.mote

    return (
      <section className="another-workdetail" style={{marginBottom: 50}}>
        <SidePage />
        <div className="cover" style={{backgroundImage:`url(${data.cover})`,backgroundSize:'cover'}}>
          <Collection userInfo={userInfo} albumId={data.albumId} isMark={data.markExist} type={data.type} />
        </div>
        <div className="info">
          <p className="title">{data.title}</p>
          <p className="description">{data.description || '暂无描述'}</p>
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
          <span className="des">{data.makeupArtist ? '化妆师' : '模特'}信息</span>
        </div>

        <div className="user-panel">
          <Link to={`discover${data.makeupArtist ? '/makeupArtist/makeupArtistProfile/' : '/mote/moteProfile/'}${workInfo.id}`}>
            <div className="avatar" style={
              {backgroundImage:`url(${workInfo.avatar})`,
              backgroundSize:'cover',
              height:'80px',
              width:'80px',
              borderRadius:'50%'}
            }>
            </div>
          </Link>
          <p className="uName">{workInfo.nickName}</p>
          <p className="uDes">{workInfo.signature}</p>
        </div>

         <div>
           <hr className="more-work" />
           <span className="des">客片展示</span>
         </div>

        { /* 客片展示 */ }
        <article>
          {
            data.photos.map((photo, index) => <img className="photo-list" src={photo.Url} key={index} />)
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
}

export default WorkDetailLayout
