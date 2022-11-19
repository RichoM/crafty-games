
var Marks = {
	circle: 1,
	cross: 2
};

window.onload = (function() {
    var WIDTH = 300,
        HEIGHT = 300,
		winner = undefined;
		
    // Initialize Crafty
    Crafty.init(WIDTH, HEIGHT);	
	
	// Load sprites
	Crafty.load(["assets/circle.png",
				"assets/cross.png"], function() { 	 
		Crafty.sprite("assets/circle.png", { Circle_sprite: [0, 0, 90, 90] });
		Crafty.sprite("assets/cross.png", { Cross_sprite: [0, 0, 90, 90] });		
	});
	
		
	// Cell
	Crafty.c("Cell", {
		_mark: undefined,
		init: function() {
			this.addComponent("2D, Canvas, Bounds, Color, Mouse");
			this.w = 95;
			this.h = 95;
			this.color("#FFFFFF");
			this.bind("Click", function () {
				if (this._mark !== undefined
					|| winner !== undefined)
					return;
				this.mark(Marks.cross);	
				if (Crafty("Mark").length < 9
					&& winner === undefined)
					IA.play();
			});
			this.bind("MouseOver", function () { 
				if (winner !== undefined) return;
				this.color("#E7E7E7"); 
			});
			this.bind("MouseOut", function () {
				if (winner !== undefined) return;
				this.color("#FFFFFF");
			});
		},
		mark: function (type) {
			if (type === undefined) {
				return this._mark;
			} else {				
				Crafty.e("Mark")
					.setCenter(this.center)
					.type(type);
				this._mark = type;
				winner = IA.checkWinner();;
			}
			
		}
	});
	
	Crafty.c("Mark", {
		init: function() {
			this.addComponent("2D, Canvas, Bounds");
			this.w = 90;
			this.h = 90;
		},
		type: function (t) {
			if (t === Marks.cross)
				this.cross();
			else if (t === Marks.circle)
				this.circle();
		},
		circle: function () {
			this.addComponent("Circle_sprite");
			return this;
		},
		cross: function () {
			this.addComponent("Cross_sprite");
			return this;
		}
	});
		
	// Set black background
	Crafty.background("#000000");
		
	// Create board
	board = [];
	for (var r = 0; r < 3; r++) {
		var row = [];
		board.push(row);
		for (var c = 0; c < 3; c++) {
			var cell = Crafty.e("Cell")
				.attr({x: c * 100 + 2.5,
					y: r * 100 + 2.5,
					corner: r !== 1 && c !== 1});
			row.push(cell);
		}
	}
	
	// Create IA
	IA.init(board);
});

