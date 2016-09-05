import Reflux from 'reflux'
import {
  storeIsDefined,
  storeHasData,
  storeHasMethod,
  storeCheckCommonUsage,
  makeStoreHasMethod
}
from '../refluxTestHelpers'
import {
  expect
}
from 'chai'

import PhotographerStore from '../../app/stores/PhotographerStore'

const photographerStoreHasMethod = makeStoreHasMethod(PhotographerStore)

describe('Photographer Store Test', () => {
  const successfulRes = {
    Success: true,
    Result: [1, 2, 3]
  }

  const errorMsg = 'error message'

  const failedRes = {
    Success: false,
    ErrorMsg: errorMsg
  }

  beforeEach(() => {
    PhotographerStore.data.hintMessage = ''
    PhotographerStore.data.flag = ''
  })

  it('has store', () => {
    storeIsDefined(PhotographerStore)
    storeHasData(PhotographerStore)
  })

  describe('has methods', () => {
    const methods = [
      'onGetSuccess',
      'onListSuccess',
      'onFailed',
      'onRecommendListSuccess'
    ]
    methods.forEach((method) => {
      photographerStoreHasMethod(method)
    })
  })

  describe('works on get success', () => {
    storeCheckCommonUsage(PhotographerStore, 'onGetSuccess', 'get')
    PhotographerStore.onGetSuccess(successfulRes)
    expect(PhotographerStore.data.photographer).to.equal(successfulRes)
  })

  storeCheckCommonUsage(PhotographerStore, 'onListSuccess', 'list', 'photographers')

  storeCheckCommonUsage(PhotographerStore, 'onRecommendListSuccess', 'recommendList', 'photographers')
})