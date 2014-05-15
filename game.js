(function(root) {
	var N = root.N = (root.N || {} );
	var Game = N.Game = function ($rootEl) {
		this.$rootEl = $rootEl;
		this.board = new N.Board(undefined, undefined);
		this.score = 0;
	};
	
	Game.prototype.start = function () {
		this.render();
	}
		
	Game.prototype.render = function () {
		this.$rootEl.html(this.board.render());
	}
	
})(this);