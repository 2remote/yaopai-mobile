import assert from 'assert';
import { expect } from 'chai';

describe('add', () => {
  it('adds', () => {
    assert.equal(1 + 1, 2);
  });

  it('Test chai expect', ()=> {
    const comText = "YAOPAI";
    expect(comText).to.be.a('string');
  });
});