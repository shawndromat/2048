(function(root) {
	var N = root.N = (root.N || {} );
	var Game = N.Game = function ($rootEl) {
		this.$rootEl = $rootEl;
		this.board = new N.Board(4, new N.Board(4, undefined, undefined), undefined);
		this.score = 0;
	};
	
	Game.prototype.start = function () {
		this.render();
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
			game.board = game.board.move(direction, game.render.bind(game));
		}
	}
	
	// Game.prototype.move = function (direction) {
	// 	var game = this;
	// 	return function () {
	// 		game.board.move(direction);
	// 	}
	// }
		
	Game.prototype.render = function () {
		this.$rootEl.html(this.board.render());
	};
	
})(this);