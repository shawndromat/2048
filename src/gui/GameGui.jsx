import React, { Component }  from "react"

export default class GameGui extends Component {
  componentDidMount = () => {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 39: //right
          this.props.game.moveRight()
          break;
        case 37: //left
          this.props.game.moveLeft()
          break;
        case 38: //up
          this.props.game.moveUp()
          break;
        case 40: //down
          this.props.game.moveDown()
          break;
      }

      this.updateCells()
    })
  }

  updateCells() {
    this.setState({cells: this.props.game.cells})
  }

  printBoard() {
    return this.props.game.allCoordinates().map(([x, y], index) => {
      return <div key={index} className={`cell cell-0 pos-${x}-${y}`}/>
    })
  }

  printCells() {
    return this.props.game.cells.map((cell, index) => {
      return <div key={cell.uuid}
                  className={`cell cell-${cell.value} pos-${cell.rowNum}-${cell.colNum}`}>
      </div>
    })
  }

  render = () => {
    return (<div>
      <header>
        <h1>2048</h1>
        <section id="score-wrapper">
          <h2>score</h2>
          <p data-test="score">{this.props.game.score}</p>
        </section>
      </header>
      <div id="board">
        {this.printBoard()}
        {this.printCells()}
      </div>
    </div>)
  }
}