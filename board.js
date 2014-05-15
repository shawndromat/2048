(function (root){
	var N = root.N = (root.N || {});
	var Board = N.Board = function (previousBoard, direction) {
		this.cells = previousBoard ? previousBoard.cells : this.emptyBoard();
		// this.previousBoard = previousBoard;
		this.direction = direction;
	}
	
	Board.prototype.render = function () {
		//todo create some kind of better template, probably
		var cellsString = "";
		for (var i = 0; i < 4; i++ ) {
			for (var j = 0; j < 4; j++) {
				cellsString += this.cells[i][j].render();
			}
		}
		return cellsString;
	};
	
	Board.prototype.posValue = function (x, y) {
		for (var i = 0; i < this.cells.length; i++) {
			if ( (this.cells[i].x === x) && (this.cells[i].y === y) ) {
				return this.cells[i].value;
			}
		}
		return undefined;
	}
	
	Board.prototype.populateGrid = function (previousBoard) {
		if (previousBoard === undefined) {
			return new Array( new Array(4) );
		} else {
			this.cells = previousBoard.cells;
		}
	}
	
	Board.prototype.emptyBoard = function () {
		var cells = [];
		for (var i = 0; i < 4; i++) {
			cells.push([]);
			for (var j = 0; j < 4; j++) {
				cells[i].push(new N.Cell(i, j))
			}
		}
		return cells;
	}
	
	Board.prototype.setCell = function (x, y, value) {
		this.cells[x][y] = new N.Cell(x, y, value);
	}
	
})(this);