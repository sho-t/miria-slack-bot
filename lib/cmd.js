/**
 * @classdesc みりあがコマンド調べるよ(* ॑꒳ ॑* )
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
    let message = ` ごめんなさい。。 \`${cmd}\` はわかんないです。:cry:`;

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
   * @param {Array} command
   * @return {String}
   */
  formatCmdMsg(command) {
    const [, explain, format, option,] = command;

    let resMsg = `${explain}:relieved:\n`;
    resMsg += `・書式\n\`\`\`${format}\`\`\`\n`;
    if (option) resMsg += `・オプション\n\`\`\`${option}\`\`\``;

    return resMsg;
  }
}
