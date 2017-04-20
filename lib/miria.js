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
   * わわ！なにかごようですか？
   * @param {Object} e
   * @return {void}
   */
  doResponse(e) {
    const triggerTk = /^ママーーー！$/;
    const triggerWk = /^@mmm\s(\S+)\s((?:\s|\S)+)$/;
    const text = e.parameter.text;
    const user = '@' + e.parameter.user_name;

    triggerTk.test(text) && this.talk(user);
    triggerWk.test(text) && this.work(text, user);
  }

  /**
   * みりあがお話するよ！
   * @param {String} user
   * @return {void}
   */
  talk(user) {
    let message = `${user} はい！ママですよ、どうしたのかな:flushed::sweat_drops:'`;
    this.post(message);
  }

  /**
   * みりあがお仕事します！
   * @param {String} text
   * @param {String} user
   * @return {void}
   */
  work(text, user) {
    const triggerWk = /^@mmm\s(\S+)\s((?:\s|\S)+)$/;
    const [funcName, funcOption] = triggerWk.exec(text);
    let mama = {
      cmd(targer) {
        const cmd = new Cmd();
        return cmd.exec(target);
      },
      cod(targer) {
        const codic = new Codic();
        return codic.exec(target);
      },
      trans(targer) {
        const trans = new Translate();
        return trans.exec(target);
      },
      wiki(targer) {
        const wiki = new Wiki();
        return wiki.exec(target);
      },
    };

    message = mama[funcName](funcOption);
    this.post(message);

    message = user + ' ごめんなさい。。上手く聞き取れませんでした:cry: \n';
    message += 'ご用がある時は `@mmm [引数] [option]` でお仕事しますよ :yum:';
  }

  /**
   * みりあがお返事します(^^)/
   * @param {Object} message
   * @return {void}
   */
  post(message) {
    const token = PropertiesService.getScriptProperties()
                                      .getProperty('SLACK_ACCESS_TOKEN');
    const botIcon = PropertiesService.getScriptProperties()
                                          .getProperty('SLACK_BOT_ICON');
    const botName = 'みりあママ';
    const app = SlackApp.create(token);

    app.postMessage(e.parameter.channel_id, message, {
      username: botName,
      icon_url: botIcon,
    });
  }
}
