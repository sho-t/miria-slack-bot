import {expect} from 'chai';
import sinon from 'sinon';
import {Cmd} from '../lib/cmd';

const html = `<p>aliasコマンドは、コマンドの別名を登録するコマンドです。</p>
alias [名前[=コマンド]]`;

/** @test {cmd.js} */
describe('cmd.js', () => {
  /** @test {exec} */
  describe('exec', () => {
    it('first', () => {
      const dummyUrl = 'http://webkaru.net/linux/cmd-command/';
      const cmd = new Cmd();
      const ufappstub = sinon.createstubinstance(UrlFetchApp.prototype);
      // const greeterstub = sinon.stub(UrlFetchApp.prototype);
      const getContentText = () => {
        return html;
      };
      // greeterstub.fetch.returns(getContentText);
      ufappstub.withArgs(dummyUrl).returns(getContentText);
      expect(cmd.exec('cmd')).to.equal('piyo');
    });
  });
});

