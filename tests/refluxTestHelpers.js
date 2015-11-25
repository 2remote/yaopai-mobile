import { expect } from 'chai';

exports.storeIsDefined = (store) => {
  expect(store).to.exist;
};

exports.storeHasData = (store, key = "NA") => {
  if (key == "NA"){
    describe('has data object', () => {
      it('has data object', ()=> {
        expect(store.data).to.exist;
      });
    });
  }else{
    describe('has data element', () => {
      it(`has data element << ${key} >>`, ()=> {
        expect(store.data[key]).to.exist;
      });
    })
  }
};

exports.storeHasMethod = function (store, method) {
  describe('store has method', () => {
    it(`has method methold  << ${method} >>`, ()=> {
      expect(store[method]).to.exist;
    });  
  })
};

exports.storeCheckCommonUsage = function (store, method, flag) {
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

  describe(`store << ${store.name} >> check common method`, () => {
    it(`will work on << ${method} >> success`, () => {
      store[method](successfulRes);
      expect(store.data.hintMessage).to.equal('');
      expect(store.data.flag).to.equal(flag);
    });

    it(`will work on << ${method} >> failed`, () => {
      store[method](failedRes);
      expect(store.data.hintMessage).to.equal(errorMsg);
      expect(store.data.flag).to.equal(flag);
    });
  });
}