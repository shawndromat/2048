(function (root){
	var N = root.N = (root.N || {});
	var Board = N.Board = function (size, oldBoard, direction) {
		this.size = size
		this.cells = oldBoard ? [] : this.emptyBoard();;
		this.oldBoard = this.oldBoard;
		
		// this.oldCells = oldBoard.cells;
		this.direction = direction;
	}
	
	Board.prototype.render = function () {
		//todo create some kind of better template, probably
		console.log("render board");
		var cellsString = "";
		for (var i = 0; i < this.size; i++ ) {
			for (var j = 0; j < this.size; j++) {
				cellsString += this.cells[i][j].render();
			}
		}
		return cellsString;
	};
	// 
	// Board.prototype.populateGrid = function (oldBoard) {
	// 	if (oldBoard === undefined) {
	// 		return new Array( new Array(4) );
	// 	} else {
	// 		this.cells = oldBoard.cells;
	// 	}
	// }
	
	Board.prototype.emptyBoard = function () {
		var cells = [];
		for (var i = 0; i < 4; i++) {
			cells.push([]);
			for (var j = 0; j < 4; j++) {
				cells[i].push(new N.Cell())
			}
		}
		return cells;
	};
	
	Board.prototype.setCell = function (x, y, value) {
		this.cells[x][y] = new N.Cell(value);
	};
	
	Board.prototype.move = function (direction, callback) {
		var board = this;
		switch (direction) {
		case "up":
			board.moveCellsVertical(false);
			break;
		case "down":
			board.moveCellsVertical(true);
			break;
		case "left":
			board.moveCells(false);
			break;
		case "right":
			board.moveCells(true);
			break;
		}

		callback();
	};
	
	Board.prototype.moveCells = function (reverse) {
		for (var i = 0; i < this.size; i++) {
			this.cells.push(this.merge(oldCells[i]));
		}
	};
	
	Board.prototype.merge = function (oldRow, reverse) {
		var newRow = [];
		oldRow = reverse ? oldRow._compact().reverse() : oldRow._compact();
		for (var i = 0; i < row.length - 1; i++) {
			if (oldRow[i].value === oldRow[i + 1].value) {
				newRow.push(new N.Cell(oldRow[i].value * 2));
			} else {
				newRow.push(oldRow[i]);
			}
		}
		var newRow = reverse ? newRow.reverse() : newRow;
		
		return newRow.concat(new Array(4 - newRow.length));
	};

	
})(this);