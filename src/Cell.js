import uuidv4 from "uuid/v4"

export default class Cell {
  constructor(rowNum, colNum, value, uuid) {
    this.rowNum = rowNum
    this.colNum = colNum
    this.value = value
    this.uuid = uuid || uuidv4()
  }

  inRow(rowNum) {
    return rowNum === this.rowNum
  }

  inCol(colNum) {
    return colNum === this.colNum
  }

  double() {
    return new Cell(this.rowNum, this.colNum, this.value * 2, this.uuid)
  }

  cloneTo(rowNum, colNum) {
    return new Cell(rowNum, colNum, this.value, this.uuid)
  }
}