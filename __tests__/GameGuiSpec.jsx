import React from "react"
import { shallow } from "enzyme"
import GameGui from "../src/gui/GameGui"

describe("GameGui", () => {
  let gui;

  const game = {
    score: 27,
    moveRight: jest.fn(),
    moveLeft: jest.fn(),
    moveUp: jest.fn(),
    moveDown: jest.fn()
  }

  beforeEach(() => {
    gui = shallow(<GameGui game={game}/>)
  })

  it("shows the game score", () => {
    expect(gui.find("[data-test='score']").text()).toEqual("27")
  })

  describe("arrow key presses", () => {
    it("right arrow triggers moveRight", () => {
      let event = new KeyboardEvent("keydown", {"keyCode": 39});
      document.dispatchEvent(event);
      expect(game.moveRight).toHaveBeenCalled()
    })

    it("left arrow triggers moveLeft", () => {
      let event = new KeyboardEvent("keydown", {"keyCode": 37});
      document.dispatchEvent(event);
      expect(game.moveLeft).toHaveBeenCalled()
    })

    it("up arrow triggers moveUp", () => {
      let event = new KeyboardEvent("keydown", {"keyCode": 38});
      document.dispatchEvent(event);
      expect(game.moveUp).toHaveBeenCalled()
    })

    it("down arrow triggers moveDown", () => {
      let event = new KeyboardEvent("keydown", {"keyCode": 40});
      document.dispatchEvent(event);
      expect(game.moveDown).toHaveBeenCalled()
    })
  })
})