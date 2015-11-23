import Reflux from 'reflux';
import { storeIsDefined } from '../refluxTestHelpers';
import { expect } from 'chai';
import AlbumsStore from '../../app/stores/AlbumsStore';

describe('Albums Store Test', () => {
  it('store is defined', ()=> {
    // 确定action存在
    storeIsDefined(AlbumsStore);
  });
});