import Row from "../src/Row"
import Cell from "../src/Cell"

describe("Row", () => {
  const rowNum = 1
  const colNum = 1
  let row

  describe("scoot right", () => {
    describe("when row is empty", () => {
      it("returns empty cells", () => {
        row = new Row([])
        expect(scootedCells()).toEqual([])
      })
    })

    describe("when there is one cell", () => {
      it("scoots the cell all the way to the end", () => {
        const cells = [new Cell(rowNum, 2, 2)]
        row = new Row(cells)
        expect(scootedCells().length).toEqual(1)
        expect(findCellAtCoordinate(scootedCells(), rowNum, 3).value).toEqual(2)
      })
    })

    describe("when there are multiple cells", () => {
      describe("when the cells cannot be merged", () => {
        it("scoots the cells all the way to the end", () => {
          const cells = [new Cell(rowNum, 2, 2), new Cell(rowNum, 1, 4)]
          row = new Row(cells)
          expect(scootedCells().length).toEqual(2)
          expect(findCellAtCoordinate(scootedCells(), rowNum, 3).value).toEqual(2)
          expect(findCellAtCoordinate(scootedCells(), rowNum, 2).value).toEqual(4)
        })
      })

      describe("when the cells can be merged", () => {
        it("scoots the cells all the way to the end", () => {
          const cells = [new Cell(rowNum, 2, 2), new Cell(rowNum, 1, 2)]
          row = new Row(cells)
          expect(scootedCells().length).toEqual(1)
          expect(findCellAtCoordinate(scootedCells(), rowNum, 3).value).toEqual(4)
        })

        it("handles multiple merges", () => {
          const cells = [
            new Cell(rowNum, 0, 2), new Cell(rowNum, 1, 2),
            new Cell(rowNum, 2, 2), new Cell(rowNum, 3, 2)
          ]
          row = new Row(cells)
          expect(scootedCells().length).toEqual(2)
          expect(findCellAtCoordinate(scootedCells(), rowNum, 3).value).toEqual(4)
          expect(findCellAtCoordinate(scootedCells(), rowNum, 2).value).toEqual(4)
        })
      })
    })

    function scootedCells() {
      return row.scootRight()
    }
  })

  describe("scoot left", () => {
    describe("when row is empty", () => {
      it("returns empty cells", () => {
        row = new Row([])
        expect(scootedCells()).toEqual([])
      })
    })

    describe("when there is one cell", () => {
      it("scoots the cell all the way to the end", () => {
        const cells = [new Cell(rowNum, 2, 2)]
        row = new Row(cells)
        expect(scootedCells().length).toEqual(1)
        expect(findCellAtCoordinate(scootedCells(), rowNum, 0).value).toEqual(2)
      })
    })

    describe("when there are multiple cells", () => {
      describe("when the cells cannot be merged", () => {
        it("scoots the cells all the way to the end", () => {
          const cells = [new Cell(rowNum, 2, 2), new Cell(rowNum, 1, 4)]
          row = new Row(cells)
          expect(scootedCells().length).toEqual(2)
          expect(findCellAtCoordinate(scootedCells(), rowNum, 1).value).toEqual(2)
          expect(findCellAtCoordinate(scootedCells(), rowNum, 0).value).toEqual(4)
        })
      })

      describe("when the cells can be merged", () => {
        it("scoots the cells all the way to the end", () => {
          const cells = [new Cell(rowNum, 2, 2), new Cell(rowNum, 1, 2)]
          row = new Row(cells)
          expect(scootedCells().length).toEqual(1)
          expect(findCellAtCoordinate(scootedCells(), rowNum, 0).value).toEqual(4)
        })
      })
    })

    function scootedCells() {
      return row.scootLeft()
    }
  })

  describe("scoot up", () => {
    describe("when row is empty", () => {
      it("returns empty cells", () => {
        row = new Row([])
        expect(scootedCells()).toEqual([])
      })
    })

    describe("when there is one cell", () => {
      it("scoots the cell all the way to the end", () => {
        const cells = [new Cell(1, colNum, 2)]
        row = new Row(cells)
        expect(scootedCells().length).toEqual(1)
        expect(findCellAtCoordinate(scootedCells(), 0, colNum).value).toEqual(2)
      })
    })

    describe("when there are multiple cells", () => {
      describe("when the cells cannot be merged", () => {
        it("scoots the cells all the way to the end", () => {
          const cells = [new Cell(2, colNum, 2), new Cell(1, colNum, 4)]
          row = new Row(cells)
          expect(scootedCells().length).toEqual(2)
          expect(findCellAtCoordinate(scootedCells(), 1, colNum).value).toEqual(2)
          expect(findCellAtCoordinate(scootedCells(), 0, colNum).value).toEqual(4)
        })
      })

      describe("when the cells can be merged", () => {
        it("scoots the cells all the way to the end", () => {
          const cells = [new Cell(2, colNum, 2), new Cell(1, colNum, 2)]
          row = new Row(cells)
          expect(scootedCells().length).toEqual(1)
          expect(findCellAtCoordinate(scootedCells(), 0, colNum).value).toEqual(4)
        })
      })
    })

    function scootedCells() {
      return row.scootUp()
    }
  })

  describe("scoot down", () => {
    describe("when row is empty", () => {
      it("returns empty cells", () => {
        row = new Row([])
        expect(scootedCells()).toEqual([])
      })
    })

    describe("when there is one cell", () => {
      it("scoots the cell all the way to the end", () => {
        const cells = [new Cell(1, colNum, 2)]
        row = new Row(cells)
        expect(scootedCells().length).toEqual(1)
        expect(findCellAtCoordinate(scootedCells(), 3, colNum).value).toEqual(2)
      })
    })

    describe("when there are multiple cells", () => {
      describe("when the cells cannot be merged", () => {
        it("scoots the cells all the way to the end", () => {
          const cells = [new Cell(2, colNum, 2), new Cell(1, colNum, 4)]
          row = new Row(cells)
          expect(scootedCells().length).toEqual(2)
          expect(findCellAtCoordinate(scootedCells(), 3, colNum).value).toEqual(2)
          expect(findCellAtCoordinate(scootedCells(), 2, colNum).value).toEqual(4)
        })
      })

      describe("when the cells can be merged", () => {
        it("scoots the cells all the way to the end", () => {
          const cells = [new Cell(2, colNum, 2), new Cell(1, colNum, 2)]
          row = new Row(cells)
          expect(scootedCells().length).toEqual(1)
          expect(findCellAtCoordinate(scootedCells(), 3, colNum).value).toEqual(4)
        })
      })
    })

    function scootedCells() {
      return row.scootDown()
    }
  })


  function findCellAtCoordinate(cells, rowNum, colNum) {
    let foundCell = cells
      .find(cell => cell.rowNum === rowNum && cell.colNum === colNum)
    return foundCell
  }
})