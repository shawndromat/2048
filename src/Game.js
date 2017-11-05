import Cell from "./Cell"
import Row from "./Row"
import {flatten, sample, difference, sortBy} from "lodash"

function allCoordinates() {
  return flatten(
    [0, 1, 2, 3].map(x => {
      return [0, 1, 2, 3].map(y => {
        return [x, y]
      })
    })
  )
}

export default class Game {
  constructor(cells) {
    this.score = 0
    this.cells = cells || this.initializeCells()
    this.initializeCells(cells)
  }

  initializeCells(initialSquares) {
    return [new Cell(0, 0), new Cell(0, 1)]
  }

  moveRight() {
    this.move(this.gatherRows(), row => row.scootRight())
  }

  moveLeft() {
    this.move(this.gatherRows(), row => row.scootLeft())
  }

  moveUp() {
    this.move(this.gatherCols(), row => row.scootUp())
  }

  moveDown() {
    this.move(this.gatherCols(), row => row.scootDown())
  }

  move(lines, howToScoot) {
    const scootedCells = flatten(lines.map(howToScoot))
    this.cells = scootedCells
    this.calculateGameStatus()
    this.generateRandomCell()
  }

  gatherRows() {
    return [0, 1, 2, 3]
      .map(rowNum => this.cells.filter(cell => cell.inRow(rowNum)))
      .map(cells => new Row(cells))
  }

  gatherCols() {
    return [0, 1, 2, 3]
      .map(colNum => this.cells.filter(cell => cell.inCol(colNum)))
      .map(cells => new Row(cells))
  }

  generateRandomCell() {
    const newCoordinates = sample(this.getFreeCoordinates())
    this.cells.push(new Cell(newCoordinates))
  }

  getFreeCoordinates() {
    return difference(allCoordinates(), this.occupiedCoordinates())
  }

  occupiedCoordinates() {
    return this.cells.map(cell => cell.coordinates)
  }

  calculateGameStatus() {
    if (this.cells.length === 16) {
      this.status = "LOSER"
      return
    }
    const highestValue = sortBy(this.cells, cell => -cell.value)[0].value
    if (highestValue === 2048) {
      this.status = "WINNER"
    }
  }
}