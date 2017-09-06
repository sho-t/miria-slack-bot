import {Cmd} from './cmd';
import {Codic} from './codic';
import {Translate} from './translate';
import {Wiki} from './wiki';
import {Emoji} from './emoji';

/**
 * @classdesc みりあです！はじめまして(*^^*)
 */
export class Miria {

  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * わわ！なにかごようですか？
   * @param {Object} e
   * @return {void}
   */
  doResponse(e) {
    const triggerTk = /^ママ[-|ー]+[!|！]+$/;
    const triggerWk = /^@mmm\s(\S+)\s((?:\s|\S)+)$/;
    this.channelId = e.parameter.channel_id;
    const text = e.parameter.text;
    const userName = e.parameter.user_name;
    const userId = e.parameter.user_id;
    const mention = `<@${userId}|${userName}>` ;

    triggerTk.test(text) && this.talk(mention);
    triggerWk.test(text) && this.work(text, mention);
  }

  /**
   * みりあがお話するよ！╰(*´︶`*)╯
   * @param {String} mention
   * @return {void}
   */
  talk(mention) {
    let message = `${mention} はい！ママですよ、どうしたのかな:flushed::sweat_drops:'`;
    this.post(message);
  }

  /**
   * みりあがお仕事します！╭(๑•̀ㅂ•́)و
   * @param {String} text
   * @param {String} user
   * @return {void}
   */
  work(text, user) {
    const triggerWk = /^@mmm\s(\S+)\s((?:\s|\S)+)$/;
    const [, funcName, funcOption] = triggerWk.exec(text);
    const emoji = new Emoji();
    const mama = {
      cmd(target) {
        const cmd = new Cmd(emoji);
        return cmd.exec(target);
      },
      cod(target) {
        const codic = new Codic(emoji);
        return codic.exec(target);
      },
      trans(target) {
        const trans = new Translate(emoji);
        return trans.exec(target);
      },
      wiki(target) {
        const wiki = new Wiki(emoji);
        return wiki.exec(target);
      },
    };
    const message = mama[funcName](funcOption);
    this.post(message);
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
    const botName = 'みりあ';
    const app = SlackApp.create(token);

    app.postMessage(this.channelId, message, {
      username: botName,
      icon_url: botIcon,
    });
  }
}
