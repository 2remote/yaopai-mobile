import Reflux from 'reflux';
import {
  makeStoreHasMethod,
  apiOk
}
from '../refluxTestHelpers';
import {
  expect
}
from 'chai';

import API from '../../app/api';

import PhotographerActions from '../../app/actions/PhotographerActions';

const photographerActionsHasMethod = makeStoreHasMethod(PhotographerActions);
describe('Photographer Actions Test', () => {
  let data;
  beforeEach(() => {
    data ={}
  });

  it('has methods', () => {
    const methods = [
      'get',
      'list',
      'recommendList',
    ];
    methods.forEach((method) => {
      photographerActionsHasMethod(method);
    })
  });

  const apiFlag = false;
  if ( apiFlag == true ){
    data = {
      Id: 2,
      Fields : 'Id,User.Id,User.NickName,User.Avatar'
    };
    apiOk(API.PHOTOGRAPHER.get, data, 'API.get 获取摄影师信息');

    data = {
      Fields : 'Id,ProvinceId,ProvinceName,RealName,CityId,CityName,CountyId,CountyName,User.Id,User.NickName,User.Avatar',
      PageIndex : 1,
      PageSize : 10,
      city : null
    };
    apiOk(API.PHOTOGRAPHER.list, data, 'API.list 查询摄影师');

    data = {
      Fields : 'Id,HomeCover,ProvinceId,ProvinceName,CityId,CityName,CountyId,CountyName,User.Id,User.NickName,User.Avatar',
      PageIndex : 1,
      PageSize : 3,
      city : null,
      HomeRecommended : true,
      HomeSortingDesc : true,
    };
    apiOk(API.PHOTOGRAPHER.list, data, 'API.list 得到推荐摄影师列表');
  }
});
