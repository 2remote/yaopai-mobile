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

import AlbumsActions from '../../app/actions/AlbumsActions';

const albumsActionsHasMethod = makeStoreHasMethod(AlbumsActions);
describe('Albums Actions Test', () => {
  let data;
  beforeEach(() => {
    data ={}
  });

  it('has methods', () => {
    const methods = [
      'get',
      'add',
      'update',
      'delete',
      'search',
      'getMyAlbums',
      'onSale',
      'offSale'
    ];
    methods.forEach((method) => {
      albumsActionsHasMethod(method);
    })
  });

  const apiFlag = false;
  if ( apiFlag == true ){
    data = {
      Fields : 'Id,Name,Sorting,Display,Views'
    };
    apiOk(API.ALBUMS.categories, data, 'API.getCategories 获取分类列表');

    data = {
      Id: 2,
      Fields: "Id,Title,UserId,Description,Service,Price,Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,User.Id,User.NickName,User.Avatar"
    };
    apiOk(API.ALBUMS.get, data, 'API.get 使用ID＝2的作品测试get功能');

    data = {
      PageIndex:1,
      PageSize:10,
      Fields : 'Id,Title,UserId,Description,Service,Price,Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,User.Id,User.NickName,User.Avatar'
    };
    apiOk(API.ALBUMS.search, data, 'API.search search返回成功');

    data ={
      HomeRecommended : true,
      HomeSortingDesc : true,
      PageIndex : 1,
      PageSize : 8,
      Fields : 'Id,Title,UserId,Description,Service,Price,Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,User.Id,User.NickName,User.Avatar',
    };
    apiOk(API.ALBUMS.search, data, 'API.recommendList recommend list返回成功');
  }
});
