import { expect } from 'chai';
import { USER, FILE } from '../app/api';

describe('API switch', () => {
  it('in dev mode(default)', ()=> {

    expect(USER.login).to.be.a('string');
    expect(USER.login).to.equal('//dev.api.aiyaopai.com/?api=User.Login');

    expect(FILE.user_token_url).to.equal('//dev.api.aiyaopai.com/file/token?type=user');
    expect(FILE.work_token_url).to.equal('//dev.api.aiyaopai.com/file/token?type=work');
  });

  it('will get right local host', ()=> {
    const dev_host = 'http://yaopai-mobile-dev.heroku.com/#/work?_k=gn36vo';
    const pro_host = 'http://yaopai-mobile.heroku.com/#/work?_k=gn36vo';

    const re = /dev\./i;
    expect(dev_host.match(re)).to.not.equal(null);
    expect(pro_host.match(re)).to.equal(null);
    expect('m.aiyaopai.com/'.match(re)).to.equal(null);
    expect('dev.m.aiyaopai.com/'.match(re)).to.not.equal(null);
    expect('dev.manage.aiyaopai.com'.match(re)).to.not.equal(null);
    expect('manage.aiyaopai.com'.match(re)).to.equal(null);

  });
});