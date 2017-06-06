/**
 * @classdesc すぷれっどしーと？(๑•﹏•)
 */
export class SpreadSheetApp {

  /**
   * @constructor
   * @param {string} target
   */
  constructor(target) {
    const url = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_URL');
    const spreadsheet = SpreadsheetApp.openByUrl(url);
    this.sheet = spreadsheet.getSheetByName(target);
  }

  /**
   * get sheet data
   * @param {integer} rowId
   * @param {integer} colId
   * @param {integer} numcolmuns
   * @return {array}
   */
  getData(rowId, colId, numcolmuns) {
    return this.sheet.getRange(rowId, colId, this.sheet.getLastRow(), numcolumns).getValues();
  }
}
