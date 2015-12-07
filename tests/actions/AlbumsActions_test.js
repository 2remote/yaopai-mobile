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

  beforeEach(() => {});

  it('has methods', () => {
    const methods = [
      'get',
      'add',
      'update',
      'delete',
      'search',
      'getMyAlbums',
      'getCategories',
      'onSale',
      'offSale',
      'recommendList'
    ];
    methods.forEach((method) => {
      albumsActionsHasMethod(method);
    })
  });

  describe('API.getCategories', () => {
    const data = {
      Fields : 'Id,Name,Sorting,Display,Views'
    };
    apiOk(API.ALBUMS.categories, data, '获取分类列表');
  });

  describe('API.get', () => {
    const data = {
      Id: 2,
      Fields: "Id,Title,UserId,CategoryId,Description,Service,Price,Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,User.Id,User.NickName,User.Avatar"
    };
    apiOk(API.ALBUMS.get, data, '使用ID＝2的作品测试get功能');
  });

  describe('API.search', () => {
    const data = {
      PageIndex:1,
      PageSize:10,
      CategoryId : null,
      Fields : 'Id,Title,UserId,CategoryId,Description,Service,Price,Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,User.Id,User.NickName,User.Avatar'
    };
    apiOk(API.ALBUMS.search, data, 'search返回成功');
  });

  describe('API.recommendList', () => {
    const data ={
      HomeRecommended : true,
      HomeSortingDesc : true,
      PageIndex : 1,
      PageSize : 8,
      Fields : 'Id,Title,UserId,CategoryId,Description,Service,Price,Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,User.Id,User.NickName,User.Avatar',
    };
    apiOk(API.ALBUMS.search, data, 'recommend list返回成功');
  });
});