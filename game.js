(function(root) {
	var N = root.N = (root.N || {} );
	var Game = N.Game = function ($rootEl) {
		this.$rootEl = $rootEl;
		this.board = new N.Board(4, undefined, undefined);
		this.score = 0;
	};
	
	Game.prototype.start = function () {
		this.render();
		this.registerHandlers();
	};
	
	Game.prototype.registerHandlers = function () {
		var game = this;
		key('up', this.board.move.bind(this, "up", this.render));
		key('down', this.board.move.bind(this, "down", this.render));
		key('left', this.board.move.bind(this, "left", this.render));
		key('right', this.board.move.bind(this, "right", this.render));
	};
	
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