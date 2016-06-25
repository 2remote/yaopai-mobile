import React from 'react';

const WorkTitle = ({data}) => (
  <section className="workTitlePanel">
    <div className="cover" style={{backgroundImage:`url(${data.cover})`,backgroundSize:'cover'}}/>
    <p className="title-a">
      <span className="title">{data.title}</span>
      <span className="price">￥{data.price}</span>
    </p>
    <p className="sub-title">{ data.description}</p>
  </section>
)

export {WorkTitle as default};
