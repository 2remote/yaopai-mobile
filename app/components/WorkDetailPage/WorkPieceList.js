import React from 'react';
import {imgModifier} from '../Tools';

const WorkPieceList = ({workPieces}) => {
  // 正常情况拿到 workPieces 后能用 workPieces.map() 方法
  // console.log(workPieces) 看起来是数组，但是 console.log(typeof workPieces) // object
  // 如此调用 workPieces.map() 会报错： workPieces.map is not a function
  // 只好用下面的方法迂回一下 😓
  const workNodesHack = Array.prototype.slice.call(workPieces)
  const workNodes = workNodesHack.map((photo, i) =>
    <section key={i} style={{lineHeight: 0}} className="workPieceRow">
      <img
        style={{width:'100%'}}
        src={imgModifier(photo.Url, "work")}
      />
    </section>
  );

  return (
    <div className="workPieceList">
      <hr className="moreWork"/>
      <span className="des">客片展示</span>
      {workNodes}
    </div>
  );
}

export {WorkPieceList as default};
