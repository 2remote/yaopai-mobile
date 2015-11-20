import { expect } from 'chai';
import { USER, FILE } from '../app/api';

describe('API switch', () => {
  it('in dev mode(default)', ()=> {
    process.env.NODE_ENV = "start";
    expect(process.env.NODE_ENV).to.equal('start');

    expect(USER.login).to.be.a('string');
    expect(USER.login).to.equal('//dev.api.aiyaopai.com/?api=User.Login');

    expect(FILE.user_token_url).to.equal('//dev.api.aiyaopai.com/file/token?type=user');
    expect(FILE.work_token_url).to.equal('//dev.api.aiyaopai.com/file/token?type=work');
  });
});