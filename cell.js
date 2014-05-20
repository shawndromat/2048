(function (root){
	var N = root.N = (root.N || {});
	var Cell = N.Cell = function (value, pos, prevPos) {
		this.value = value || undefined;
		// this.pos = pos;
		// this.prevPos = prevPos ? prevPos : undefined;
	}

	Cell.prototype.render = function () {
		if (this.value) {
			return "<div class='cell'>" + this.value + "</div>";
		} else {
			return "<div class='cell'></div>";
		}
	}

})(this);
