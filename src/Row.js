import Cell from "./Cell"
import { sortBy } from "lodash"

export default class Row {
  constructor(cells) {
    this.cells = Array.from(cells)
  }

  scootRight() {
    const sortedCells = sortBy(this.cells, cell => - cell.colNum)

    return this.mergeCells(sortedCells).map((cell, index) => {
      return new Cell(cell.rowNum, 3 - index, cell.value)
    })
  }

  scootLeft() {
    const sortedCells = sortBy(this.cells, cell => cell.colNum)

    return this.mergeCells(sortedCells).map((cell, index) => {
      return new Cell(cell.rowNum, index, cell.value)
    })
  }

  scootUp() {
    const sortedCells = sortBy(this.cells, cell => cell.rowNum)

    return this.mergeCells(sortedCells).map((cell, index) => {
      return new Cell(index, cell.colNum, cell.value)
    })
  }

  scootDown() {
    const sortedCells = sortBy(this.cells, cell => - cell.rowNum)

    return this.mergeCells(sortedCells).map((cell, index) => {
      return new Cell(3 - index, cell.colNum, cell.value)
    })
  }

  mergeCells(sortedCells) {
    let newCells = []
    let first = sortedCells.shift() || null
    let second = sortedCells.shift() || null

    while(first) {
      if (second && first.value === second.value) {
        newCells.push(new Cell(first.rowNum, first.colNum, first.value * 2))
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