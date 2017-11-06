import Row from "../src/Row"
import Cell from "../src/Cell"

describe("Row", () => {
  let row
  let scootedCells

  describe("moving horizontally", () => {
    const rowNum = 1

    describe("scoot right", () => {
      describe("when row is empty", () => {
        it("returns empty cells", () => {
          scootCellsRight([])
          expect(scootedCells).toEqual([])
        })
      })

      describe("when there is one cell", () => {
        it("scoots the cell all the way to the end", () => {
          scootCellsRight([new Cell(rowNum, 2, 2)])
          expect(scootedCells.length).toEqual(1)
          expect(cellAt(rowNum, 3).value).toEqual(2)
        })
      })

      describe("when there are multiple cells", () => {
        describe("when the cells cannot be merged", () => {
          it("scoots the cells all the way to the end", () => {
            scootCellsRight([new Cell(rowNum, 2, 2), new Cell(rowNum, 1, 4)])
            expect(scootedCells.length).toEqual(2)
            expect(cellAt(rowNum, 3).value).toEqual(2)
            expect(cellAt(rowNum, 2).value).toEqual(4)
          })
        })

        describe("when the cells can be merged", () => {
          const cells = [new Cell(rowNum, 2, 2), new Cell(rowNum, 1, 2)]

          beforeEach(() => {
            scootCellsRight(cells)
          })

          it("scoots the cells all the way to the end", () => {
            expect(scootedCells.length).toEqual(1)
            expect(cellAt(rowNum, 3).value).toEqual(4)
          })

          it("keeps uuid of rightmost cell", () => {
            expect(cellAt(rowNum, 3).uuid).toMatch(cells[0].uuid)
          })

          it("handles multiple merges", () => {
            scootCellsRight([
              new Cell(rowNum, 0, 2), new Cell(rowNum, 1, 2),
              new Cell(rowNum, 2, 2), new Cell(rowNum, 3, 2)
            ])
            expect(scootedCells.length).toEqual(2)
            expect(cellAt(rowNum, 3).value).toEqual(4)
            expect(cellAt(rowNum, 2).value).toEqual(4)
          })
        })
      })
    })

    describe("scoot left", () => {
      describe("when row is empty", () => {
        it("returns empty cells", () => {
          scootCellsLeft([])
          expect(scootedCells).toEqual([])
        })
      })

      describe("when there is one cell", () => {
        it("scoots the cell all the way to the end", () => {
          scootCellsLeft([new Cell(rowNum, 2, 2)])
          expect(scootedCells.length).toEqual(1)
          expect(cellAt(rowNum, 0).value).toEqual(2)
        })
      })

      describe("when there are multiple cells", () => {
        describe("when the cells cannot be merged", () => {
          it("scoots the cells all the way to the end", () => {
            scootCellsLeft([new Cell(rowNum, 2, 2), new Cell(rowNum, 1, 4)])
            expect(scootedCells.length).toEqual(2)
            expect(cellAt(rowNum, 1).value).toEqual(2)
            expect(cellAt(rowNum, 0).value).toEqual(4)
          })
        })

        describe("when the cells can be merged", () => {
          it("scoots the cells all the way to the end", () => {
            scootCellsLeft([new Cell(rowNum, 2, 2), new Cell(rowNum, 1, 2)])
            expect(scootedCells.length).toEqual(1)
            expect(cellAt(rowNum, 0).value).toEqual(4)
          })
        })
      })
    })
  })

  describe("moving vertically", () => {
    const colNum = 1

    describe("scoot up", () => {
      describe("when row is empty", () => {
        it("returns empty cells", () => {
          scootCellsUp([])
          expect(scootedCells).toEqual([])
        })
      })

      describe("when there is one cell", () => {
        it("scoots the cell all the way to the end", () => {
          scootCellsUp([new Cell(1, colNum, 2)])
          expect(scootedCells.length).toEqual(1)
          expect(cellAt(0, colNum).value).toEqual(2)
        })
      })

      describe("when there are multiple cells", () => {
        describe("when the cells cannot be merged", () => {
          it("scoots the cells all the way to the end", () => {
            scootCellsUp([new Cell(2, colNum, 2), new Cell(1, colNum, 4)])
            expect(scootedCells.length).toEqual(2)
            expect(cellAt(1, colNum).value).toEqual(2)
            expect(cellAt(0, colNum).value).toEqual(4)
          })
        })

        describe("when the cells can be merged", () => {
          it("scoots the cells all the way to the end", () => {
            scootCellsUp([new Cell(2, colNum, 2), new Cell(1, colNum, 2)])
            expect(scootedCells.length).toEqual(1)
            expect(cellAt(0, colNum).value).toEqual(4)
          })
        })
      })
    })

    describe("scoot down", () => {
      describe("when row is empty", () => {
        it("returns empty cells", () => {
          scootCellsDown([])
          expect(scootedCells).toEqual([])
        })
      })

      describe("when there is one cell", () => {
        it("scoots the cell all the way to the end", () => {
          scootCellsDown([new Cell(1, colNum, 2)])
          expect(scootedCells.length).toEqual(1)
          expect(cellAt(3, colNum).value).toEqual(2)
        })
      })

      describe("when there are multiple cells", () => {
        describe("when the cells cannot be merged", () => {
          it("scoots the cells all the way to the end", () => {
            scootCellsDown([new Cell(2, colNum, 2), new Cell(1, colNum, 4)])
            expect(scootedCells.length).toEqual(2)
            expect(cellAt(3, colNum).value).toEqual(2)
            expect(cellAt(2, colNum).value).toEqual(4)
          })
        })

        describe("when the cells can be merged", () => {
          it("scoots the cells all the way to the end", () => {
            scootCellsDown([new Cell(2, colNum, 2), new Cell(1, colNum, 2)])
            expect(scootedCells.length).toEqual(1)
            expect(cellAt(3, colNum).value).toEqual(4)
          })
        })
      })
    })
  })

  function scootCellsRight(cells) {
    row = new Row(cells)
    scootedCells = row.scootRight()
  }

  function scootCellsLeft(cells) {
    row = new Row(cells)
    scootedCells = row.scootLeft()
  }

  function scootCellsUp(cells) {
    row = new Row(cells)
    scootedCells = row.scootUp()
  }

  function scootCellsDown(cells) {
    row = new Row(cells)
    scootedCells = row.scootDown()
  }

  function cellAt(rowNum, colNum) {
    return scootedCells
      .find(cell => cell.rowNum === rowNum && cell.colNum === colNum)
  }
})