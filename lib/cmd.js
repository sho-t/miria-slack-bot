/**
 * @classdesc みりあがコマンド調べるよ(* ॑꒳ ॑* )
 */
export class Cmd {

  /**
   * @constructor
   * @param {Object} emoji
   */
  constructor(emoji) {
    this.emoji = emoji;
  }

  /**
   * Trans text by codic
   * @param {string} cmd
   * @return {string} message
   */
  exec(cmd) {
    let message = ` ごめんなさい。。 \`${cmd}\` はわかんないです。${this.emoji.fall}`;

    const url = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_URL');
    const spreadsheet = SpreadsheetApp.openByUrl(url);
    const sheet = spreadsheet.getSheetByName('command');

    const [rowId, colStartIndex, numcolumns] = [1, 1, 5];
    const data = sheet.getRange(rowId, colStartIndex, sheet.getLastRow(), numcolumns).getValues();
    const cmdArr = data.find((c) => c[0] == cmd);
    if (cmdArr) message = this.formatCmdMsg(cmdArr);

    return message;
  }

  /**
   * format result message
   * @param {array} command
   * @return {string}
   */
  formatCmdMsg(command) {
    const [, explain, format, option,] = command;

    let resMsg = `${explain}${this.emoji.smile}\n`;
    resMsg += `・書式\n\`\`\`${format}\`\`\`\n`;
    if (option) resMsg += `・オプション\n\`\`\`${option}\`\`\``;

    return resMsg;
  }
}
