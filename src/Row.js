import Cell from "./Cell"
import { sortBy } from "lodash"

export default class Row {
  constructor(cells) {
    this.cells = Array.from(cells)
  }

  scootRight() {
    const sortedCells = sortBy(this.cells, cell => - cell.colNum)

    return this.mergeCells(sortedCells).map((cell, index) => {
      return cell.cloneTo(cell.rowNum, 3 - index)
    })
  }

  scootLeft() {
    const sortedCells = sortBy(this.cells, cell => cell.colNum)

    return this.mergeCells(sortedCells).map((cell, index) => {
      return cell.cloneTo(cell.rowNum, index)
    })
  }

  scootUp() {
    const sortedCells = sortBy(this.cells, cell => cell.rowNum)

    return this.mergeCells(sortedCells).map((cell, index) => {
      return cell.cloneTo(index, cell.colNum)
    })
  }

  scootDown() {
    const sortedCells = sortBy(this.cells, cell => - cell.rowNum)

    return this.mergeCells(sortedCells).map((cell, index) => {
      return cell.cloneTo(3 - index, cell.colNum)
    })
  }

  mergeCells(sortedCells) {
    let newCells = []
    let first = sortedCells.shift() || null
    let second = sortedCells.shift() || null

    while(first) {
      if (second && first.value === second.value) {
        newCells.push(first.double())
        first = sortedCells.shift() || null
        second = sortedCells.shift() || null
      } else {
        newCells.push(first)
        first = second
        second = sortedCells.shift() || null
      }
    }

    return newCells
  }
}