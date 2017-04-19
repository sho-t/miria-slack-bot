import {Cmd} from './cmd';
import {Codic} from './codic';
import {Translate} from './translate';
import {Wiki} from './wiki';

/**
 * @classdesc みりあです！はじめまして(*^^*)
 * @constructor
 */
export class Miria {

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * miria response function
   * @param {Object} e
   * @return {void}
   */
  doResponse(e) {
    const text = e.parameter.text;
    const user = '@' + e.parameter.user_name;
    this.work(text, user);
  }

  /**
   * miria response function
   * @param {String} text
   * @param {String} user
   * @return {void}
   */
  work(text, user) {
    const triggerMm = /^ママーーー！$/;
    const triggerWk = /^@mmm\s(\S+)\s((?:\s|\S)+)$/;
    const func = ['cmd', 'trans', 'cod', 'wiki'];

    let message;

    if(triggerMm.test(text)) {
      // nomal response
      message = user + ' はい！ママですよ、どうしたのかな:flushed::sweat_drops:';

    } else if (triggerWk.test(text)) {
      // func response
      let [funcName, funcOption] = trigger_word.exec(text);

      message = mama[funcName](funcOption);
    } else {
      // another response
      message = user + ' ごめんなさい。。上手く聞き取れませんでした:cry: \n';
      message += 'ご用がある時は `@mmm [引数] [option]` でお仕事しますよ :yum:';
    }

  }

  /**
   * miria response function
   * @param {Object} e
   * @return {void}
   */
  checkUp(e) {

  }
}
