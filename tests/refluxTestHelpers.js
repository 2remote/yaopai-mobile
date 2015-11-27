import { expect } from 'chai';
import fjs from 'functional.js';

exports.storeIsDefined = (store) => {
  expect(store).to.exist;
};

exports.storeHasData = (store, key = "NA") => {
  if (key == "NA"){
    expect(store.data, 'has data obj').to.exist;
  }else{  
    expect(store.data[key], `has data element << ${key} >>.`).to.exist;
  }
};

exports.storeHasMethod = function (store, method) {  
  expect(store[method], `has method << ${method} >>`).to.exist;
};

// methodExist
// 
// 测试method是否存在的helper
// 
// 参数：
// method  - func
// comment - string, method名称

// 例子：
//   const re = methodExist(UserStore.setCurrentUser);
// 结果：
//   re = true/false 
function methodExist (method, comment) {
  expect(method, `has method << ${comment} >>`).to.exist;
}

// makeStoreHasMethod
//
// 创建storeHasMethod的function factory

// 参数：
// store  - obj, store
// method - string, store.method
// 
// 例子：
//   const userStoreHasMethod  = makeStoreHasMethod(UserStore);
//   userStoreHasMethod('setCurrentUser');
// 结果：
//   expect(UserStore.setCurrentUser).to.exist;
exports.makeStoreHasMethod = fjs.curry(function(store, method) {  
  return methodExist(store[method], method);
});

exports.storeCheckCommonUsage = function (store, method, flag, result='NA') {
  // 测试如下模式的函数
  // onGetSuccess : function(res){
  //   if(res.Success){
  //     this.data.hintMessage = '';
  //   }else{
  //     this.data.hintMessage = res.ErrorMsg;
  //   }
  //   this.data.flag = 'get';
  //   this.trigger(this.data);
  // },
  const successfulRes = {
    Success: true,
    Result: [1, 2, 3]
  };

  const errorMsg = 'error message';

  const failedRes = {
    Success: false,
    ErrorMsg: errorMsg
  };

  describe(`store check common usage for method << ${method} >>`, () => {
    it(`will work when success`, () => {
      store[method](successfulRes);
      // console.log('data show:', store.data);
      expect(store.data.hintMessage, '提示信息设定为空，不显示提示。').to.equal('');
      if( result != 'NA'){
        expect(store['data'][result], '赋值检测').to.deep.equal(successfulRes.Result);
      }
      expect(store.data.flag, '指定旗标').to.equal(flag);
    });

    it(`will work when failed`, () => {
      store[method](failedRes);
      expect(store.data.hintMessage, '提示信息设定为错误信息').to.equal(errorMsg);
      expect(store.data.flag, '指定旗标').to.equal(flag);
    });
  });
};

function valueIsEqual (a, b) {
  expect(a, 'compare two value is equal.').to.equal(b);
};

// makeCheckStoreData
//
// 创建CheckStoreData的function factory
// store - store obj
// targetKey - store.data.key
// checkValue - 期望数值
// 
// 例子：
// const checkUserStoreData = makeCheckStoreData(UserStore);
// checkUserStoreData('userId', '');
// 结果：
// expect(UserStore.data.userId).to.equal('');
exports.makeCheckStoreData = fjs.curry(function (store, targetKey, checkValue) {
  return valueIsEqual(store.data[targetKey], checkValue);
});

exports.storeHasDefaultValue = function (store) {
  it('store has right default value', () => {
    expect(store.data.hintMessage).to.equal('');
    expect(store.data.flag).to.equal('');  
  });
}