(function (root){
	var N = root.N = (root.N || {});
	var Cell = N.Cell = function (value) {
		this.value = value || undefined;
	}
	
	Cell.prototype.render = function () {
		if (this.value) {
			return "<div class='cell'>" + this.value + "</div>";
		} else {
			return "<div class='cell'></div>";
		}
	}
	
})(this);