import React from 'react/addons';
import { expect } from 'chai';
import ImageBoxGrid from '../../../app/components/Index/ImageBoxGrid.js';

// 定义常用React测试函数
const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag,
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
  "Position": "HomeInterview",
  "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/83075f25-7d11-436c-9510-43899578208f.jpg",
  "Action": "GrapherList",
  "ExtraId": 31,
  "Url": "http://localhost:8082/Advertisement/Create1"
}, {
  "Id": 3,
  "Position": "HomeInterview",
  "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/83075f25-7d11-436c-9510-43899578208f.jpg",
  "Action": "GrapherId",
  "ExtraId": 4,
  "Url": ""
}, {
  "Id": 1,
  "Position": "HomeInterview",
  "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/c48f682b-3342-48e2-9058-df99f7f5e45e.jpg",
  "Action": "AlbumsList",
  "ExtraId": 0,
  "Url": ""
}, {
  "Id": 1,
  "Position": "HomeInterview",
  "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/c48f682b-3342-48e2-9058-df99f7f5e45e.jpg",
  "Action": "AlbumsId",
  "ExtraId": 22,
  "Url": ""
}, {
  "Id": 1,
  "Position": "HomeInterview",
  "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/c48f682b-3342-48e2-9058-df99f7f5e45e.jpg",
  "Action": "ActivityList",
  "ExtraId": 0,
  "Url": ""
}, {
  "Id": 1,
  "Position": "HomeInterview",
  "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/c48f682b-3342-48e2-9058-df99f7f5e45e.jpg",
  "Action": "ActivityId",
  "ExtraId": 33,
  "Url": ""
}, {
  "Id": 1,
  "Position": "HomeInterview",
  "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/c48f682b-3342-48e2-9058-df99f7f5e45e.jpg",
  "Action": "InterviewList",
  "ExtraId": 0,
  "Url": ""
}, {
  "Id": 1,
  "Position": "HomeInterview",
  "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/c48f682b-3342-48e2-9058-df99f7f5e45e.jpg",
  "Action": "InterviewId",
  "ExtraId": 44,
  "Url": ""
}];

describe('首页广告模块 ImageBoxGrid', () => {
  // 渲染被调用的模块
  const component = renderIntoDocument(
    <ImageBoxGrid filter={'HomeInterview'} cols={4} rows={3} works={Results} />
  );

  // 通过Class获取组件
  const imageCells = scryRenderedDOMComponentsWithClass(component, 'imageCell');

  it('action地址转换正确', () => {
    expect(imageCells[0].firstChild.href).to.equal('http://www.baidu.com/');
    expect(imageCells[1].firstChild.href).to.have.string('/grapher');
    expect(imageCells[2].firstChild.href).to.have.string('/grapherDetail/4');
    expect(imageCells[3].firstChild.href).to.have.string('/work');
    expect(imageCells[4].firstChild.href).to.have.string('/workDetail/22');
    expect(imageCells[5].firstChild.href).to.have.string('/activity');
    expect(imageCells[6].firstChild.href).to.have.string('/activityDetail/33');
    expect(imageCells[7].firstChild.href).to.have.string('/interview');
    expect(imageCells[8].firstChild.href).to.have.string('/interviewDetail/44');
  });
});
