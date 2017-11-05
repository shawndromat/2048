export default class Cell {
  constructor(rowNum, colNum, value) {
    this.rowNum = rowNum
    this.colNum = colNum
    this.value = value
  }

  inRow(rowNum) {
    return rowNum === this.rowNum
  }

  inCol(colNum) {
    return colNum === this.colNum
  }
}