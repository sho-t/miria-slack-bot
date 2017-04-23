/**
 * @classdesc go wikipedia.
 * @constructor
 */
export class Wiki {

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * @param {String} target
   * @return {String}
   */
  exec(target) {
    const url = `http://wikipedia.simpleapi.net/api?keyword=${target}&output=json`;
    const response = this.fetch(url);
    if(response == null || response[0] == null
                      || response[0]['body'] == null) {
      return `\`${target}\` はwikiれなかったです。:disappointed:`;
    }

    const body = `\`\`\`${response[0]['body']}\`\`\``;
    let message = `\`${target}\` について調べましたよ。(﹡ˆ﹀ˆ﹡)♡ \n`;
    message += `https://ja.wikipedia.org/wiki/${target}\n`;
    message += body;

    return message;
  }

  /**
   * @param {String} url
   * @return {Object}
   */
  fetch(url) {
    const json = UrlFetchApp.fetch(url).getContentText();
    return JSON.parse(json);
  }
}
