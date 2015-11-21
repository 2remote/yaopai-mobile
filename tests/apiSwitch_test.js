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

    const re = /dev\.|192\.|localhost/i;
    expect(dev_host).to.match(re);
    expect(pro_host).to.not.match(re);
    expect('m.aiyaopai.com/').to.not.match(re);
    expect('dev.m.aiyaopai.com/').to.match(re);
    expect('dev.manage.aiyaopai.com').to.match(re);
    expect('manage.aiyaopai.com').to.not.match(re);
    expect('localhost:8080').to.match(re);
    expect('192.168.3.2:5000/#/login_page').to.match(re);


  });
});