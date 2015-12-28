import React from 'react/addons';
import { expect } from 'chai';
import ImageBoxGrid from '../../../app/components/Index/ImageBoxGrid.js';

// 定义常用React测试函数
const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = React.addons.TestUtils;


const Results = [{
  "Id": 4,
  "Position": "HomeInterview",
  "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/73e072f3-70cb-4c2b-a00b-309db1216a8a.png",
  "Action": "Link",
  "ExtraId": 0,
  "Url": "http://www.baidu.com"
}, {
  "Id": 2,
  "Position": "HomeAlbums",
  "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/83075f25-7d11-436c-9510-43899578208f.jpg",
  "Action": "GrapherList",
  "ExtraId": 31,
  "Url": "http://localhost:8082/Advertisement/Create1"
}, {
  "Id": 3,
  "Position": "HomeGrapher",
  "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/83075f25-7d11-436c-9510-43899578208f.jpg",
  "Action": "GrapherId",
  "ExtraId": 4,
  "Url": ""
}, {
  "Id": 1,
  "Position": "HomeSlide",
  "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/c48f682b-3342-48e2-9058-df99f7f5e45e.jpg",
  "Action": "Link",
  "ExtraId": 0,
  "Url": ""
}];

describe('首页广告模块 ImageBoxGrid', () => {
  // 渲染被调用的模块
  const component = renderIntoDocument(
    <ImageBoxGrid number={6} works={Results} />
  );

  // 通过Class获取组件
  const imageCell = scryRenderedDOMComponentsWithClass(component, 'imageCell');
  it('initial', () => {
    expect(imageCell.length).to.equal(6);
  });
});
