/**
 * @classdesc seaech command
 * @constructor
 */
export class Cmd {

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * Trans text by codic
   * @param {String} cmd
   * @return {String} message
   */
  exec(cmd) {
    const url = `http://webkaru.net/linux/${cmd}-command/`;
    let trMatch;
    let optArray = [];
    let COMMAND = {};
    let html;

    const explanRegexp = /<p>([\s\S]*?)コマンドです。<\/p>/;
    const optionTrRegexp = /^<tr>([\s\S]*?)<\/tr>/gm;
    const optionRegexp = /<td>([\s\S]*?)<\/td>/gm;
    const formatRegecp = new RegExp(cmd + '\\s\\[.+\\]');

    try{
      html = UrlFetchApp.fetch(url).getContentText();
    }catch(e) {
      return message = (cmd == 'tnk') ?
      ` ごめんなさい。。 \`${cmd}\` は知らないです。:cry: なんだか変な名前ですね :neutral_face:` :
      ` ごめんなさい。。 \`${cmd}\` はわかんないです。:cry:`;
    }

    const explan = explanRegexp.exec(html)[1];
    const format = formatRegecp.exec(html)[0];

    while (trMatch = optionTrRegexp.exec(html)) {
      let optMap = {};
      optMap.name = optionRegexp.exec(trMatch)[1];
      optMap.exlan = optionRegexp.exec(trMatch)[1];
      optionRegexp.lastIndex = 0;
      optArray.push(optMap);
    }

    COMMAND.explan = explan;
    COMMAND.format = format;
    COMMAND.option = optArray;

    return this.formatCmdMsg(COMMAND);
  }

  /**
   * format result message
   * @param {Object} command
   * @return {String}
   */
  formatCmdMsg(command) {
    const expalnMsg = 'コマンドですよ。:relieved:\n';
    let resMsg = '';
    let optionList = [];

    resMsg += command.explan + expalnMsg;
    resMsg += '・書式\n';
    resMsg += `\`\`\`${command.format}\`\`\``;

    if (Object.keys(command.option).length) {
      command.option.forEach(function(value) {
        optionList.push(`${value.name}\t${value.exlan}\n`);
      });
      resMsg += '\n・オプション\n';
      resMsg += `\`\`\`${optionList.join('')}\`\`\``;
    }
    return resMsg;
  }
}
