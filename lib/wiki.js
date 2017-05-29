/**
 * @classdesc go wikipedia.
 * @constructor
 */
export class Wiki {

  /**
   * @constructor
   * @param {Object} emoji
   */
  constructor(emoji) {
    this.emoji = emoji;
  }

  /**
   * @param {string} target
   * @return {string}
   */
  exec(target) {
    const url = `http://wikipedia.simpleapi.net/api?keyword=${target}&output=json`;
    const response = this.fetch(url);
    if(response == null || response[0] == null
                      || response[0]['body'] == null) {
      return `ごめんなさい。 \`${target}\` はwikiれなかったです。${this.emoji.smile}`;
    }

    const body = `\`\`\`${response[0]['body']}\`\`\``;
    let message = `\`${target}\` について調べましたよ。(﹡ˆ﹀ˆ﹡)♡ \n`;
    message += `https://ja.wikipedia.org/wiki/${target}\n`;
    message += body;

    return message;
  }

  /**
   * @param {string} url
   * @return {Object}
   */
  fetch(url) {
    const json = UrlFetchApp.fetch(url).getContentText();
    return JSON.parse(json);
  }
}
