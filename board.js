(function (root){
	var N = root.N = (root.N || {});
	var Board = N.Board = function (size, oldBoard, direction) {
		this.size = size;
		this.oldBoard = oldBoard;
		this.cells = oldBoard ? this.oldBoard.cells : this.emptyBoard();
		
		
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
		cells[2][2] = new N.Cell(2);
		cells[2][1] = new N.Cell(2);
		return cells;
	};
	
	// Board.prototype.setCell = function (x, y, value) {
	// 	this.cells = this.oldBoard.cells;
	// 	this.cells[x][y] = new N.Cell(value);
	// };
	
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
			board.moveCellsHorizontal(false);
			break;
		case "right":
			board.moveCellsHorizontal(true);
			break;
		}
		console.log(this.cells);
		callback();
		return this;
	};
	
	Board.prototype.moveCellsHorizontal = function (reverse) {
		for (var i = 0; i < this.size; i++) {
			this.cells[i] = this.merge(this.oldBoard.cells[i], reverse);
		}
	};
	
	Board.prototype.merge = function (oldRow, reverse) {
		var newRow = [];
		oldRow = reverse ? _.compact(oldRow).reverse() : _.compact(oldRow);
		for (var i = 0; i < oldRow.length - 1; i++) {
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