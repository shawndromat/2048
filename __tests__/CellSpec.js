import Cell from "../src/Cell"

describe("Cell", () => {
  let cell

  beforeEach(() => {
    cell = new Cell([0, 1])
  })

  describe("inRow", () => {
    it("returns true if the cell is in the row", () => {
      expect(cell.inRow(0)).toEqual(true)
    })

    it("returns false if the cell is not in the row", () => {
      expect(cell.inRow(1)).toEqual(false)
      expect(cell.inRow(2)).toEqual(false)
      expect(cell.inRow(3)).toEqual(false)
    })
  })

  describe("inCol", () => {
    it("returns true if the cell is in the row", () => {
      expect(cell.inCol(1)).toEqual(true)
    })

    it("returns false if the cell is not in the row", () => {
      expect(cell.inCol(0)).toEqual(false)
      expect(cell.inCol(2)).toEqual(false)
      expect(cell.inCol(3)).toEqual(false)
    })
  })
})