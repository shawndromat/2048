import Game from "../src/Game"
import Cell from "../src/Cell"

describe("Game", () => {
  let game

  beforeEach(() => {
    game = new Game()
  })

  it("should initialize with a score of 0", () => {
    expect(game.score).toEqual(0)
  })

  it("should initialize with 2 cells populated", () => {
    expect(game.cells.length).toEqual(2)
  })

  describe("winning", () => {
    beforeEach(() => {
      /*
         1024 1024 _ _
            _    _ _ _
            _    _ _ _
            _    _ _ _
       */

      game = new Game([
        new Cell(0, 0, 1024),
        new Cell(0, 1, 1024)
      ])
    })

    it("should win when any cell value reaches 2048", () => {
      game.moveRight()
      expect(game.status).toEqual("WINNER")
    })
  })

  describe("losing", () => {
    beforeEach(() => {
      /*
         2 4 2 4
         4 2 4 2
         2 4 2 4
         4 2 4 2
       */

      game = new Game([
        new Cell(0, 0, 2), new Cell(0, 1, 4), new Cell(0, 2, 2), new Cell(0, 3, 4),
        new Cell(1, 0, 4), new Cell(1, 1, 2), new Cell(1, 2, 4), new Cell(1, 3, 2),
        new Cell(2, 0, 2), new Cell(2, 1, 4), new Cell(2, 2, 2), new Cell(2, 3, 4),
        new Cell(3, 0, 4), new Cell(3, 1, 2), new Cell(3, 2, 4), new Cell(3, 3, 2)
      ])
    })

    it("should win when any cell value reaches 2048", () => {
      game.moveRight()
      expect(game.status).toEqual("LOSER")
    })
  })

  describe("moving cells", () => {
    beforeEach(() => {
      /*
         2 2 _ _
         _ _ _ _
         _ _ _ _
         _ _ _ _
       */

      game = new Game([
        new Cell(0, 0, 2),
        new Cell(0, 1, 2)
      ])
    })

    it("generates another cell", () => {
      game.moveUp()
      expect(game.cells.length).toEqual(3)
    })

    it("can scoot right", () => {
      game.moveRight()
      /*
         _ _ _ 4
         _ _ _ _
         _ _ _ _
         _ _ _ _
       */
      expect(cellAtCoordinates(0, 3).value).toEqual(4)
    })

    it("can scoot left", () => {
      game.moveLeft()
      /*
         4 _ _ _
         _ _ _ _
         _ _ _ _
         _ _ _ _
       */
      expect(cellAtCoordinates(0, 0).value).toEqual(4)
    })

    it("can scoot up", () => {
      game.moveUp()
      /*
         2 2 _ _
         _ _ _ _
         _ _ _ _
         _ _ _ _
       */
      expect(cellAtCoordinates(0, 0).value).toEqual(2)
      expect(cellAtCoordinates(0, 1).value).toEqual(2)
    })

    it("can scoot down", () => {
      game.moveDown()
      /*
         _ _ _ _
         _ _ _ _
         _ _ _ _
         2 2 _ _
       */
      expect(cellAtCoordinates(3, 0).value).toEqual(2)
      expect(cellAtCoordinates(3, 1).value).toEqual(2)
    })
  })

  function cellAtCoordinates(rowNum, colNum) {
    return game.cells.find(cell => cell.rowNum === rowNum && cell.colNum === colNum)
  }
})