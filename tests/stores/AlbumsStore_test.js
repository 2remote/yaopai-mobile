import Reflux from 'reflux';
import { storeIsDefined, storeHasData, storeHasMethod } from '../refluxTestHelpers';
import { expect } from 'chai';
import AlbumsStore from '../../app/stores/AlbumsStore';

describe('Albums Store Test', () => {
  it('has store', ()=> {
    storeIsDefined(AlbumsStore);
    storeHasData(AlbumsStore);
  });

  it('has methods', ()=> {
    const methods = [
      'onFailed',
      'onAddsuccess',
      'onGetSuccess',
      'onUpdateSuccess',
      'onDeleteSuccess',
      'onSearchSuccess',
      'onGetMyAlbumsSuccess',
      'onGetCategoiesSuccess',
      'onSaleSuccess',
      'offSaleSuccess',
      'onRecommendListSuccess'
    ];
    methods.forEach((method) =>{
      storeHasMethod(AlbumsStore, method);  
    })
  });
});