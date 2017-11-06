(function(root) {
	var N = root.N = (root.N || {} );
	var Game = N.Game = function (rootEl) {
		this.rootEl = rootEl;
    this.scoreEl = document.getElementById('score');
		this.board = new N.Board(this, 4, undefined, this.rootEl);
    this.score = 0;
	};

	Game.prototype.start = function () {
		this.board.render();
		this.registerHandlers();
	};

	Game.prototype.registerHandlers = function () {
		key('up', this.handler("up"));
		key('down', this.handler("down"));
		key('left', this.handler("left"));
		key('right', this.handler("right"));
	};

	Game.prototype.handler = function (direction) {
		var game = this;
		return function () {
			game.board = game.board.cloneTo(direction);
		}
	}

  Game.prototype.updateScore = function(score) {
    this.score += score;
    this.scoreEl.innerHTML = this.score;
  }
})(this);
