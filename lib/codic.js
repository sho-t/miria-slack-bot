/**
 * @classdesc trans text by codic.
 * @constructor
 */
export class Codic {

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * Trans text by codic
   * @param {String} text
   * @return {String} message
   */
  exec(text) {
   const codRegexep = /^ *-([cCsShf]+)\s*((?:\s|\S)+)$/;
   const helpRegexep = /^\s*-help\s*$/;
   const casingMap = {
          'c': 'camel',
          'C': 'pascal',
          's': 'lower underscore',
          'S': 'upper underscore',
          'h': 'hyphen'};

   if (helpRegexep.test(text)) return this.codicHelp();

    const afterArgs = codRegexep.exec(text) || [2];
    let option = afterArgs[1] || 's';
    option = option.replace(/f/g, '');
    const target = afterArgs[2] || args;

    const data = this.fetch(target, casingMap[option]);

    let message = `*${target}* は 
    \`\`\`${data.translated_text}\`\`\` って言うらしいですよ :hushed:`;

    return message;
  }

  /**
   * Fetch codic API
   * @param {String} target
   * @param {String} option
   * @return {Object} message
   */
  fetch(target, option='s') {
    const formdata = {
     'text': target,
     'casing': option,
    };
    const token = PropertiesService.getScriptProperties()
                                      .getProperty('CODIC_TOKEN');
    const apiUrl = 'https://api.codic.jp/v1/engine/translate.json';
    const headers = {authorization: 'bearer ' + token, charset: 'utf-8'};
    const params ={method: 'post', headers: headers, payload: formdata};
    const res = UrlFetchApp.fetch(apiUrl, params);
    return JSON.parse(res)[0];
  }

  /**
   * Return codic help message
   * @return {String} message
   */
  help() {
    const pre = '```';
    let message = '`@mmm cod [引数] [文字列]` でcodicで命名検索しますよ :innocent: \n';
    message += '・引数\n' + pre;
    message += '-c \t camelCase\n';
    message += '-C \t CamelCase\n';
    message += '-s \t snake_case\n';
    message += '-S \t SNAKE_CASE\n';
    message += '-help \t show help\n' + pre;

    return message;
  }
}
