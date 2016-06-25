import React from 'react';
import {imgModifier} from '../Tools';

const WorkPieceList = ({workPieces}) => {
  // console.log(typeof workPieces) // object
  const workNodesHack = Array.prototype.slice.call(workPieces)
  // 如果不把这个数组强制在转换成数组, 如此调用 workPieces.map() 会报错： workPieces.map is not a function
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
