import Cell from "./Cell"
import Row from "./Row"
import {flatten, flatMap, sample, differenceWith, sortBy, isEqual, sumBy} from "lodash"

export default class Game {
  constructor(initialCells) {
    this.score = 0
    this.cells = initialCells || []
  }

  setup() {
    while (this.cells.length < 2) {
      this.generateRandomCell()
    }
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
    lines.forEach(howToScoot)
    this.cells = flatMap(lines, line => line.scootedCells)
    this.score += sumBy(lines, line => line.score)
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
    if (this.status === "LOSER") return
    const newCoordinates = sample(this.freeCoordinates())
    this.cells.push(new Cell( ...newCoordinates, 2))
  }

  freeCoordinates() {
    return differenceWith(this.allCoordinates(), this.occupiedCoordinates(), isEqual)
  }

  occupiedCoordinates() {
    return this.cells.map(cell => [cell.rowNum, cell.colNum])
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

  allCoordinates() {
    return flatten(
      [0, 1, 2, 3].map(x => {
        return [0, 1, 2, 3].map(y => {
          return [x, y]
        })
      })
    )
  }
}