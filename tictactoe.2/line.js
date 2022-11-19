
var Line = (function () {
	function Line(cells, diagonal) {
		this.cells = cells;
		this.diagonal = diagonal;
	}
	
	Line.prototype.checkWinner = function () {
		var mark = this.cells[0].mark();
		if (mark === undefined) return;
		for (var i = 1; i < this.cells.length; i++) {
			if (this.cells[i].mark() !== mark) return;
		}
		this.cells.forEach(function (c) {
			c.color("#00E7E7");
		});
		throw mark;	
	}
	
	Line.prototype.howManyCellsMarkedWith = function (mark) {
		var result = 0;
		for (var i = 0; i < this.cells.length; i++) {
			if (this.cells[i].mark() === mark) result++;
		}
		return result;
	}
	
	Line.prototype.howManyUnmarkedCells = function () {
		return this.howManyCellsMarkedWith(undefined);
	}
	
	Line.prototype.unmarkedCells = function () {
		var result = [];
		for (var i = 0; i < this.cells.length; i++) {
			var cell = this.cells[i];
			if (cell.mark() === undefined) result.push(cell);
		}
		return result;
	}
	
	return Line;
})();
	