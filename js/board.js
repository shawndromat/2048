(function (root){
	var N = root.N = (root.N || {});
	var Board = N.Board = function (size, direction, el) {
		this.size = size;
		this.direction = direction;
		this.el = el;
		this.cells = this.emptyBoard();
    this.oldCells = [];
	}

	Board.prototype.render = function () {
    this.eachCell(function(x, y, cell) {
      cell.render();
    })
	};

	Board.prototype.animate = function (initial) {
    this.eachCell(function(x, y, cell) {
      cell.animate();
    })
	};

	Board.prototype.emptyBoard = function () {
		var cells = [];
		for (var i = 0; i < this.size; i++) {
			cells.push([]);
			for (var j = 0; j < this.size; j++) {
				var cell = new N.Cell(0, this);
				cell.setPos([i, j]);
				cells[i].push(cell);
			}
		}
		return cells;
	};

	Board.prototype.move = function (direction) {
		this.saveCells();

		switch (direction) {
		case "up":
			this.moveCellsVertical(false);
			break;
		case "down":
			this.moveCellsVertical(true);
			break;
		case "left":
			this.moveCellsHorizontal(false);
			break;
		case "right":
			this.moveCellsHorizontal(true);
			break;
		}

		this.setCells();
    this.logCells();
		this.render();
    setTimeout(function() {
      this.animate();
    }.bind(this), 0)
    // document.addEventListener('transitionend', this.endMove)
    setTimeout(function() {
      this.endMove();
    }.bind(this), 500);
		return this;
	};

  Board.prototype.endMove = function() {
    for (var i = 0; i < this.oldCells.length; i++) {
      this.el.removeChild(this.oldCells[i].el);
    }
    this.oldCells = [];
    this.generateNewCell();
  }

	Board.prototype.moveCellsHorizontal = function (reverse) {
		if (reverse) {
			this.reverseCells();
		}

		for(var i = 0; i < this.size; i++) {
			this.cells[i] = this.moveMerge(this.cells[i])
		}

		if (reverse) {
			this.reverseCells();
		}
	};

	Board.prototype.moveCellsVertical = function (reverse) {
		this.transpose();
		this.moveCellsHorizontal(reverse);
		this.transpose();
	}

	Board.prototype.moveMerge = function (row) {

		row = _.reject(row, function (cell) {
			return cell.value === 0;
		})
		var newRow = [];

		while (row.length > 0) {
			if (row.length > 1 && this.canMerge(row[0], row[1])) {
				newRow.push(this.performMerge(row.shift(), row.shift()));
			} else {
				newRow.push(row.shift());
			}
		}

		return this.pad(newRow);
	};

	Board.prototype.canMerge = function (cell1, cell2) {
		return cell1.value != 0 && (cell1.value === cell2.value);
	}

	Board.prototype.performMerge = function (cell1, cell2) {
    var newCell = new N.Cell(cell1.value + cell2.value, this);
    this.oldCells.push(cell1);
    this.el.removeChild(cell2.el);
    newCell.prevPos = cell2.prevPos;
		return newCell;
	};

  Board.prototype.logCells = function () {
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        if (this.cells[i][j].value > 0) {
          console.log(this.cells[i][j].pos + " " + this.cells[i][j].value)
        }
      }
    }
  }

	Board.prototype.transpose = function () {
		var transposed = [];
		for (var i = 0; i < this.size; i++ ) {
			transposed[i] = [];
			for (var j = 0; j < this.size; j++) {
				transposed[i][j] = this.cells[j][i];
			}
		}
		this.cells = transposed;
	}

	Board.prototype.reverseCells = function () {
		for (var i = 0; i < this.size; i++) {
			this.cells[i] = this.cells[i].reverse();
		}
	}

	Board.prototype.pad = function(row) {
		while(row.length < this.size) {
      var newCell = new N.Cell(0, this);
			row.push(newCell);
		}
		return row;
	}

	Board.prototype.eachCell = function (callback) {
		for(var i = 0; i < this.size; i++) {
			for (var j = 0; j < this.size; j++) {
				callback(i, j, this.cells[i][j]);
			}
		}
	}

	Board.prototype.saveCells = function () {
		this.eachCell(function (x, y, cell) {
			cell.savePrevPos([x, y]);
		})
	}

	Board.prototype.setCells = function () {
		this.eachCell(function (x, y, cell) {
			cell.setPos([x, y]);
		})
	}

	Board.prototype.emptyCells = function () {
		var empties = [];

		this.eachCell(function (x, y, cell) {
			if (cell.value === 0) {
				empties.push(cell)
			}
		})

		return empties;
	}

	Board.prototype.generateNewCell = function () {
		var newCell = _.sample(this.emptyCells());
		newCell.value = Math.random() < .75 ? 2 : 4;
    newCell.render();
	}

})(this);
