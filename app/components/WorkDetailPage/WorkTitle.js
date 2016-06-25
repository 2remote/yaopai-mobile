import React from 'react';

const WorkTitle = ({data}) => (
  <section className="workTitlePanel">
    <div className="cover" style={{backgroundImage:`url(${data.Cover})`,backgroundSize:'cover'}}/>
    <p className="title-a">
      <span className="title">{data.Title}</span>
      <span className="price">￥{data.Price}</span>
    </p>
    <p className="sub-title">{ data.Description}</p>
  </section>
)

export {WorkTitle as default};
