import React from 'react'
import {Link} from 'react-router'

const WorkDetailLayout= () => {
  return (
    <section className="another-workdetail">
      <div className="cover"></div>
      <div className="info">
        <p className="title">匆匆那年</p>
        <p className="description">作品描述作品描述作品描述作品描述作品描述作品描述作品描述作
        品描述作品描述作品描述作品描述作品描述
        </p>
        <div className="tags">
          <li>浓妆</li>
          <li>浓妆</li>
          <li>浓妆</li>
        </div>
      </div>

      <div>
        <hr className="more-work" />
        <span className="des">化妆师信息</span>
      </div>

      <div className="user-panel">
        <Link to={`/grapherDetail/${2}`}>
          <div className="avatar" style={
            {backgroundImage:`url(${'data.Avatar'})`,
            backgroundSize:'cover',
            height:'80px',
            width:'80px',
            borderRadius:'50%'}
          }>
          </div>
        </Link>
        <p className="uName">糖包</p>
        <p className="uDes">
          个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名
        </p>
      </div>

       <div>
         <hr className="more-work" />
         <span className="des">客片展示</span>
       </div>

      { /* 客片展示 */ }
      <article>

      </article>
    </section>
  )
}

export default WorkDetailLayout
