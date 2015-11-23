import Reflux from 'reflux';
import { storeIsDefined, storeHasData } from '../refluxTestHelpers';
import { expect } from 'chai';
import AlbumsStore from '../../app/stores/AlbumsStore';

describe('Albums Store Test', () => {
  it('has store', ()=> {
    storeIsDefined(AlbumsStore);
    storeHasData(AlbumsStore);
  });
});