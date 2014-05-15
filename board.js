(function (root){
	var N = root.N = (root.N || {});
	var Board = N.Board = function (size, oldBoard, direction) {
		this.size = size;
		this.cells = oldBoard ? oldBoard.cells : this.emptyBoard();
		
		
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
			this.cells[i] = this.merge(this.cells[i], reverse);
		}
	};
	
	Board.prototype.merge = function (oldRow, reverse) {
		var newRow = [];
		oldRow = reverse ? _.compact(oldRow).reverse() : _.compact(oldRow);
		for (var i = 0; i < oldRow.length - 1; i++) {
			if (this.canMerge(oldRow[i], oldRow[i + 1])) {
				newRow.push(new N.Cell(oldRow[i].value * 2));
			} else {
				newRow.push(oldRow[i]);
			}
		}
		
		for (var i = newRow.length; i < this.size; i++) {
			newRow.push(new N.Cell(2));
		}
		// debugger		
		return reverse ? newRow.reverse() : newRow;
	};
	
	Board.prototype.canMerge = function (cell1, cell2) {
		return cell1.value >= 2 && (cell1.value === cell2.value);
	}

	
})(this);