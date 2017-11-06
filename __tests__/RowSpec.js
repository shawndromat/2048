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
          whenRowIsScootedRight([])
          expect(row.scootedCells).toEqual([])
        })
      })

      describe("when there is one cell", () => {
        it("scoots the cell all the way to the end", () => {
          whenRowIsScootedRight([new Cell(rowNum, 2, 2)])
          expect(row.scootedCells.length).toEqual(1)
          expect(cellAt(rowNum, 3).value).toEqual(2)
        })
      })

      describe("when there are multiple cells", () => {
        describe("when the cells cannot be merged", () => {
          it("scoots the cells all the way to the end", () => {
            whenRowIsScootedRight([new Cell(rowNum, 2, 2), new Cell(rowNum, 1, 4)])
            expect(row.scootedCells.length).toEqual(2)
            expect(cellAt(rowNum, 3).value).toEqual(2)
            expect(cellAt(rowNum, 2).value).toEqual(4)
          })
        })

        describe("when the cells can be merged", () => {
          const cells = [new Cell(rowNum, 2, 2), new Cell(rowNum, 1, 2)]

          beforeEach(() => {
            whenRowIsScootedRight(cells)
          })

          it("scoots the cells all the way to the end", () => {
            expect(row.scootedCells.length).toEqual(1)
            expect(cellAt(rowNum, 3).value).toEqual(4)
          })

          it("keeps uuid of rightmost cell", () => {
            expect(cellAt(rowNum, 3).uuid).toMatch(cells[0].uuid)
          })

          it("counts the score", () => {
            expect(row.score).toEqual(4)
          })

          it("handles multiple merges", () => {
            whenRowIsScootedRight([
              new Cell(rowNum, 0, 2), new Cell(rowNum, 1, 2),
              new Cell(rowNum, 2, 2), new Cell(rowNum, 3, 2)
            ])
            expect(row.scootedCells.length).toEqual(2)
            expect(cellAt(rowNum, 3).value).toEqual(4)
            expect(cellAt(rowNum, 2).value).toEqual(4)
            expect(row.score).toEqual(8)
          })
        })
      })
    })

    describe("scoot left", () => {
      describe("when row is empty", () => {
        it("returns empty cells", () => {
          whenRowIsScootedLeft([])
          expect(row.scootedCells).toEqual([])
        })
      })

      describe("when there is one cell", () => {
        it("scoots the cell all the way to the end", () => {
          whenRowIsScootedLeft([new Cell(rowNum, 2, 2)])
          expect(row.scootedCells.length).toEqual(1)
          expect(cellAt(rowNum, 0).value).toEqual(2)
        })
      })

      describe("when there are multiple cells", () => {
        describe("when the cells cannot be merged", () => {
          it("scoots the cells all the way to the end", () => {
            whenRowIsScootedLeft([new Cell(rowNum, 2, 2), new Cell(rowNum, 1, 4)])
            expect(row.scootedCells.length).toEqual(2)
            expect(cellAt(rowNum, 1).value).toEqual(2)
            expect(cellAt(rowNum, 0).value).toEqual(4)
          })
        })

        describe("when the cells can be merged", () => {
          it("scoots the cells all the way to the end", () => {
            whenRowIsScootedLeft([new Cell(rowNum, 2, 2), new Cell(rowNum, 1, 2)])
            expect(row.scootedCells.length).toEqual(1)
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
          whenRowIsScootedUp([])
          expect(row.scootedCells).toEqual([])
        })
      })

      describe("when there is one cell", () => {
        it("scoots the cell all the way to the end", () => {
          whenRowIsScootedUp([new Cell(1, colNum, 2)])
          expect(row.scootedCells.length).toEqual(1)
          expect(cellAt(0, colNum).value).toEqual(2)
        })
      })

      describe("when there are multiple cells", () => {
        describe("when the cells cannot be merged", () => {
          it("scoots the cells all the way to the end", () => {
            whenRowIsScootedUp([new Cell(2, colNum, 2), new Cell(1, colNum, 4)])
            expect(row.scootedCells.length).toEqual(2)
            expect(cellAt(1, colNum).value).toEqual(2)
            expect(cellAt(0, colNum).value).toEqual(4)
          })
        })

        describe("when the cells can be merged", () => {
          it("scoots the cells all the way to the end", () => {
            whenRowIsScootedUp([new Cell(2, colNum, 2), new Cell(1, colNum, 2)])
            expect(row.scootedCells.length).toEqual(1)
            expect(cellAt(0, colNum).value).toEqual(4)
          })
        })
      })
    })

    describe("scoot down", () => {
      describe("when row is empty", () => {
        it("returns empty cells", () => {
          whenRowIsScootedDown([])
          expect(row.scootedCells).toEqual([])
        })
      })

      describe("when there is one cell", () => {
        it("scoots the cell all the way to the end", () => {
          whenRowIsScootedDown([new Cell(1, colNum, 2)])
          expect(row.scootedCells.length).toEqual(1)
          expect(cellAt(3, colNum).value).toEqual(2)
        })
      })

      describe("when there are multiple cells", () => {
        describe("when the cells cannot be merged", () => {
          it("scoots the cells all the way to the end", () => {
            whenRowIsScootedDown([new Cell(2, colNum, 2), new Cell(1, colNum, 4)])
            expect(row.scootedCells.length).toEqual(2)
            expect(cellAt(3, colNum).value).toEqual(2)
            expect(cellAt(2, colNum).value).toEqual(4)
          })
        })

        describe("when the cells can be merged", () => {
          it("scoots the cells all the way to the end", () => {
            whenRowIsScootedDown([new Cell(2, colNum, 2), new Cell(1, colNum, 2)])
            expect(row.scootedCells.length).toEqual(1)
            expect(cellAt(3, colNum).value).toEqual(4)
          })
        })
      })
    })
  })

  function whenRowIsScootedRight(cells) {
    row = new Row(cells)
    row.scootRight()
  }

  function whenRowIsScootedLeft(cells) {
    row = new Row(cells)
    row.scootLeft()
  }

  function whenRowIsScootedUp(cells) {
    row = new Row(cells)
    row.scootUp()
  }

  function whenRowIsScootedDown(cells) {
    row = new Row(cells)
    row.scootDown()
  }

  function cellAt(rowNum, colNum) {
    return row.scootedCells
      .find(cell => cell.rowNum === rowNum && cell.colNum === colNum)
  }
})