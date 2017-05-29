/**
 * @classdesc trans text.
 */
export class Translate {

  /**
   * @constructor
   * @param {Object} emoji
   */
  constructor(emoji) {
    this.emoji = emoji;
  }

  /**
   * main method
   * @param {string} target
   * @return {string}
   */
  exec(target) {
    let origin = 'ja';
    let convt = 'en';
    const transRegexp = /^(\S+)\s((?:\s|\S)+)$/;

    const option = transRegexp.exec(target)[1];
    if (option == origin) {
       [origin, convt] = [convt, origin];
    };

    const text = transRegexp.exec(target)[2];

    return this.trans(text, origin, convt);
  }

  /**
   * call translateAPI
   * @param {string} text
   * @param {string} from
   * @param {string} to
   *
   * @return {string} message
   */
  trans(text, from, to) {
    const langParam = {'ja': '日本語', 'en': '英語'};
    const convertMsg = LanguageApp.translate(text, from, to);
    let message = `*${text}* は${langParam[to]}で `;
    message += `\`\`\`${convertMsg}\`\`\` って言うらしいですよ ${this.emoji.smile}`;

    return message;
  }
}
