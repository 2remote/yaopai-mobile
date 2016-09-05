import assert from 'assert'
import { expect } from 'chai'
var should = require('chai').should()

describe('add', () => {  
  it('adds', () => {
    assert.equal(1 + 1, 2)
  })

  const comText = "YAOPAI"
  
  it('Test chai expect', ()=> {
    expect(comText).to.be.a('string')
  })

  it('Test chai should', ()=> {
    comText.should.be.a('string')
  })
})