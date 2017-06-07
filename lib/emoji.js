import {SpreadSheetApp} from './spreadsheetApp';

/**
 * @classdesc manage emoji
 */
export class Emoji {

  /**
   * @constructor
   */
  constructor() {
    const sheet = new SpreadSheetApp('emoji');
    const [rowId, colStartIndex, numColumns] = [2, 1, 4];
    let data = sheet.getData(rowId, colStartIndex, numColumns);
    // let data = sheet.getRange(rowId, colStartIndex, sheet.getLastRow(), numColumns).getValues();

    const emoji = this.transpose(data);
    [this.smile, this.fall, this.wow] = emoji.map((e) => this.getRandArr(e));
  }

  /**
   * transposing 2D array & remove undefined
   * @param {array} matrix
   * @return {array}
   */
  transpose(matrix) {
    matrix = matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
    matrix = matrix.map((arr) => arr.filter((e) => e !== undefined));

    return matrix;
  }

  /**
   * Get values randomly from the array
   * @param {array} arr
   * @return {Object}
   */
  getRandArr(arr) {
    const arrKeys = Object.keys(arr);
    const index = arrKeys[Math.floor(Math.random() * arrKeys.length)];

    return arr[index];
  }

  /**
   * @return {string}
   */
  smile() {
    return this.smile;
  }

  /**
   * @return {string}
   */
  fall() {
    return this.fall;
  }

  /**
   * @return {string}
   */
  wow() {
    return this.wow;
  }
}
