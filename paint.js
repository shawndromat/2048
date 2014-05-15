(function(root){
	var N = root.N = (root.N || {});
	
	var Board = N.Board = function(rootEl, size) {
		this.$el = rootEl;
		this.size = size;
	}
	
	Board.prototype.populateCanvas = function (num) {
		var grids = "";
		
		_(this.size).times(function (){
			_(this.size).times(function () {
				grids += ('<div class="square"></div>')
			})
		}
		var allTheDivs = "";
		_.times(num, function () {
			allTheDivs += ('<div class="square"></div>');
		});
		
		this.$el.html(allTheDivs);
	};
	
	Board.prototype.setUpEvents = function () {
		this.$el.on('click', '.square', this.paintSquare.bind(this));
		
		$('#color-choice').click(this.handleColorChoice.bind(this));
	}
	
	Board.prototype.handleColorChoice = function (event) {
		event.preventDefault();
		this.color = $('#color-text').val();
	}
	
	Board.prototype.paintSquare = function (event) {
		var $square = $(event.target);
		var color = (this.color || _.sample(Board.COLORS));
		$square.css('background-color', color);
	}
	
}(this));