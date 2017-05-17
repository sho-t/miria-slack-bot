/**
 * @classdesc manage emoji
 * @constructor
 */
export class Emoji {

  /**
   * Constructor
   */
  constructor() {
    const url = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_URL');
    const ss = SpreadsheetApp.openByUrl(url);
    const sheet = ss.getSheetByName('emoji');

    const rowId = 2;
    const colStartIndex = 1;
    const data = sheet.getRange(rowId, colStartIndex, sheet.getLastRow(), 4).getValues();

    let invert = (a) => a[0].map((col, c) => a.map((row, r) => a[r][c]))

    [this[smile], this[fall], this[wow]] = invert(data);
    const random = Math.floor(Math.random() * emojiArray.length);
  }

}
