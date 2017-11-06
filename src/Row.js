import { sortBy } from "lodash"

export default class Row {
  constructor(cells) {
    this.cells = Array.from(cells)
    this.score = 0
  }

  scootRight() {
    const sortedCells = this.sortCells(cell => - cell.colNum)
    this.scootedCells = this.mergeCells(sortedCells).map((cell, index) => {
      return cell.cloneTo(cell.rowNum, 3 - index)
    })
  }

  scootLeft() {
    const sortedCells = this.sortCells(cell => cell.colNum)
    this.scootedCells = this.mergeCells(sortedCells).map((cell, index) => {
      return cell.cloneTo(cell.rowNum, index)
    })
  }

  scootUp() {
    const sortedCells = this.sortCells(cell => cell.rowNum)
    this.scootedCells = this.mergeCells(sortedCells).map((cell, index) => {
      return cell.cloneTo(index, cell.colNum)
    })
  }

  scootDown() {
    const sortedCells = this.sortCells(cell => - cell.rowNum)
    this.scootedCells = this.mergeCells(sortedCells).map((cell, index) => {
      return cell.cloneTo(3 - index, cell.colNum)
    })
  }

  mergeCells(sortedCells) {
    let newCells = []
    let first = sortedCells.shift() || null
    let second = sortedCells.shift() || null

    while(first) {
      if (second && first.value === second.value) {
        this.score += first.value * 2
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

  sortCells(howToSort) {
    return sortBy(this.cells, howToSort)
  }
}