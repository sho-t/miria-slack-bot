/**
 * @classdesc trans text.
 * @constructor
 */
export class Translate {

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * main method
   * @param {String} target
   * @return {String}
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
   * @param {String} text
   * @param {String} from
   * @param {String} to
   *
   * @return {String} message
   */
  trans(text, from, to) {
    const langParam = {'ja': '日本語', 'en': '英語'};
    const convertMsg = LanguageApp.translate(text, from, to);
    let message = `*${text}* は${langParam[to]}で `;
    message += `\`\`\`${convertMsg}\`\`\` って言うらしいですよ :blush:`;

    return message;
  }
}
