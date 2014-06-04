(function (root){
	var N = root.N = (root.N || {});
	var Board = N.Board = function (size, direction, $el) {
		this.size = size;
		this.cells = this.emptyBoard();
		this.direction = direction;
		this.$el = $el;
	}

	Board.prototype.render = function () {
		//todo: create some kind of better template, probably
		var cellsString = "";
		for (var i = 0; i < this.size; i++ ) {
			cellsString += "<div class='row'>"
			for (var j = 0; j < this.size; j++) {
				cellsString += this.cells[i][j].render();
			}
			cellsString += "</div>"
		}
		this.$el.html(cellsString);
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

	Board.prototype.emptyBoard = function () {
		var cells = [];
		for (var i = 0; i < this.size; i++) {
			cells.push([]);
			for (var j = 0; j < this.size; j++) {
				var cell = new N.Cell(0);
				cell.setPos([i,j]);
				cells[i].push(cell);
			}
		}
		return cells;
	};

	Board.prototype.setCell = function (value, pos) {
		var cell = new N.Cell(value);
		cell.pos = pos;
		this.cells[pos[0]][pos[1]] = cell;
	};

	Board.prototype.move = function (direction) {
		this.saveCells();
		var board = this;
		switch (direction) {
		case "up":
			board.moveCellsVertical(false);
			break;
		case "down":
			board.moveCellsVertical(true);
			break;
		case "left":
			board.moveCellsHorizontal(false);
			break;
		case "right":
			board.moveCellsHorizontal(true);
			break;
		}

		this.setCells();
		this.generateNewCell();
		this.render();
		this.logCells();
		return this;
	};

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
		return cell1.value != 0 && (cell1.value === cell2.value)
	}

	Board.prototype.performMerge = function (cell1, cell2) {
		var value = Math.abs(cell1.value) * 2;
		//if opposite signs, value should be negative
		value = (cell1.value > 0 && cell2.value < 0) ? -value : value;
		var cell = new N.Cell(value);
		//cell2's prevPos is furthest from the merging end
		//give new cell furthest prevPos for maximum animation effect
		cell.prevPos = cell2.prevPos;
		return cell;
	};

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
			row.push(new N.Cell(0));
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
		newCell.value = Math.random() > .5 ? 2 : -2;
	}

})(this);
