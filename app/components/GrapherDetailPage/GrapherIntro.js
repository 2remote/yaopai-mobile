import React from 'react';
import { ButtonAttention } from '../UI/Button';
import {imgModifier} from '../Tools';

const GrapherIntro = ({data, from}) => {
  let avatarSoruce = data.User ? avatarSoruce = data.Avatar : null;

  let name = '读取中...';
  if ( typeof data.User !== 'undefined'){
    name = data.NickName;
  }

  let cityName = data.CityName;

  if(from === 'interview' && data){
    name = data.NickName;
  };

  const attention = () => {
    
  }

  return (
    <section className="grapherIntro">
      <div className="baseInfo">
        <div className="avatar" style={{backgroundImage:`url('${data.Avatar}')`}} />
        <p className="nickname">{name}</p>
        <p className="font_small">{data.Signature}</p>
        <p className="font_small"><i className="icon didian"></i>{cityName}</p>
        <ButtonAttention
          buttonType="btn-dark"
          value="关注我"
          handleSubmit={attention}
        />
      </div>
      <div className="order">
        <ul>
          <li><span className="count">{data.TotalAlbums}</span> 作品</li>
          <li><span className="count">{data.Sales}</span> 订单</li>
          <li><span className="count">{data.Marks}</span> 关注</li>
        </ul>
      </div>
    </section>
  );
};

export {GrapherIntro as default};
