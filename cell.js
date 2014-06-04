(function (root){
	var N = root.N = (root.N || {});
	var Cell = N.Cell = function (value) {
		this.value = value;
		this.pos = undefined;
		this.prevPos = undefined;
	}

	Cell.prototype.render = function () {
		var display = this.value === 0 ? "" : this.value
		return "<div class='cell cell-" + this.value + "'><p>" + display + "</p></div>";
	}

	Cell.prototype.setPos = function (pos) {
		this.pos = pos;
	}

	Cell.prototype.savePrevPos = function () {
		this.prevPos = this.pos;
	}

})(this);
