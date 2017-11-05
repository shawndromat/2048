import React from "react"
import { render } from "react-dom"
import GameGui from "./gui/GameGui"
import Game from "./Game"

const game = new Game()
game.setup()

render(
  <GameGui game={game} cells={game.cells}/>,
  document.getElementById("root")
)