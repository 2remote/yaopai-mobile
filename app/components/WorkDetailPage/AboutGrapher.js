import React from 'react';
import { Link } from 'react-router';

const AboutGrapher =({data, id}) => (
  <div className="grapher-panel">
    <Link to={`/grapherDetail/${id}`}>
      <div className="avatar" style={
      {backgroundImage:`url(${data.Avatar})`,
      backgroundSize:'cover',
      height:'80px',
      width:'80px',
      borderRadius:'50%'}
      }>
      </div>
    </Link>
    <p className="uName">{data.NickName}</p>
    <p className="uDes">YAOPAI认证摄影师</p>
    <div className="button btn-dark download-app">
      <i className="icon talk" /> 下载 APP 联系我
    </div>
  </div>
)

export {AboutGrapher as default};
