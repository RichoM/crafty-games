
var IA = (function () {
	
	var lines = [],
		board = undefined;
		
	function init(b) {
		board = b;
		for (var i = 0; i < 3; i++) {
			lines.push(new Line([board[i][0], board[i][1], board[i][2]], false));
			lines.push(new Line([board[0][i], board[1][i], board[2][i]], false));			
		}
		lines.push(new Line([board[0][0], board[1][1], board[2][2]], true));
		lines.push(new Line([board[0][2], board[1][1], board[2][0]], true));
	}
	
	function play() {
		try {		
			tryToWinNow();
			avoidLoosing();
			tryToWinCenter();
			tryToStartLine();
			tryToMarkACorner();
			randomMove();
		} catch (cellToMark) {
			cellToMark.mark(Marks.circle);
		}
	}
	
	function tryToWinNow() {
		lines.forEach(function (line) {
			if (line.howManyCellsMarkedWith(Marks.circle) === 2
				&& line.howManyUnmarkedCells() === 1) {
				var cell = line.unmarkedCells()[0];
				throw cell;
			}
		});
	}
	
	function avoidLoosing() {
		lines.forEach(function (line) {
			if (line.howManyCellsMarkedWith(Marks.cross) === 2
				&& line.howManyUnmarkedCells() === 1) {
				var empty = line.unmarkedCells()[0];
				throw empty;
			}
		});
	}
	
	function tryToWinCenter() {
		if (board[1][1].mark() === undefined)
			throw board[1][1];
	}
	
	function tryToStartLine() {
		var possibles = lines.filter(function (line) {
			return line.howManyCellsMarkedWith(Marks.circle) === 1
				&& line.howManyUnmarkedCells() === 2;
		});
		possibles.sort(function() {return 0.5 - Math.random()});
		possibles.forEach(function (line) {
			throw line.unmarkedCells()[Crafty.math.randomInt(0, 1)];
		});		
	}
	
	function tryToMarkACorner() {
		var corners = [
			board[0][0],
			board[0][2],
			board[2][0],
			board[2][2]
		];
		corners.sort(function() {return 0.5 - Math.random()});
		corners.forEach(function (cell) {
			if (cell.mark() === undefined)
				throw cell;
		});
	}
	
	function randomMove() {			
		var r, c, cell;
		do {
			r = Crafty.math.randomInt(0, 2);
			c = Crafty.math.randomInt(0, 2);
			cell = board[r][c];
		} while (cell.mark() !== undefined);
		throw cell;
	}
	
	function checkWinner () {
		try {
			lines.forEach(function (line) {
				if (line) line.checkWinner();
			});
			return undefined;
		} catch (winner) {		
			winnerLabel.textContent	= "El ganador es " +
				(winner === Marks.circle ? "Círculo" : "Cruz")
			return winner;
		}
	}

	return {
		init: init,
		play: play,
		lines: function () { return lines; },
		checkWinner: checkWinner
	}
})();
