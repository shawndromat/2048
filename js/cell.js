(function (root){
	var N = root.N = (root.N || {});
	var Cell = N.Cell = function (value, board) {
    this.parentEl = board.el;
		this.value = value;
		this.pos = undefined;
		this.prevPos = undefined;
	}

	Cell.prototype.render = function () {
    var pos = this.prevPos || this.pos;
    if(this.el) this.el.parentNode.removeChild(this.el);
    this.el = document.createElement('div');
    this.el.className = "cell";
    this.el.classList.add('cell-' + this.value);
    this.el.classList.add("pos-" + pos[0] + "-" + pos[1]);
    this.innerP = document.createElement('p');
    this.innerP.innerHTML = (this.value === 0 ? "" : this.value);
    this.el.appendChild(this.innerP);
    this.parentEl.appendChild(this.el);
	}

  Cell.prototype.animate = function() {
    this.el.className = "cell";
    this.el.classList.add('cell-' + this.value);
    this.el.classList.add("pos-" + this.pos[0] + "-" + this.pos[1]);
  };

	Cell.prototype.setPos = function (pos) {
		this.pos = pos;
	}

	Cell.prototype.savePrevPos = function () {
		this.prevPos = this.pos;
	}

  Cell.prototype.toString = function() {
    return this.pos[0] + ", " + this.pos[1];
  }

})(this);
